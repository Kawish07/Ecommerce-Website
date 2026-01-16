import { connectToDatabase } from '../../../lib/mongodb';
import { verifyAdminRequest } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const admin = verifyAdminRequest(req);
  if (!admin) {
    console.log('Analytics: Admin verification failed');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('Analytics: Admin verified -', admin.username);

  try {
    const { db } = await connectToDatabase();

    if (!db) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    // Fetch real analytics from database
    const orders = await db.collection('orders').find({}).toArray();
    const products = await db.collection('products').find({}).toArray();

    const totalRevenue = orders.reduce((sum, o) => sum + (o.items?.reduce((s, i) => s + (i.price * i.quantity), 0) || 0), 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;

    // Get sales by day (last 7 days)
    const salesByDay = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const daySales = orders
        .filter(o => o.createdAt && new Date(o.createdAt).toISOString().split('T')[0] === dateStr)
        .reduce((sum, o) => sum + (o.items?.reduce((s, i) => s + (i.price * i.quantity), 0) || 0), 0);
      
      salesByDay.push({ date: dateStr, sales: daySales });
    }

    // Top products by revenue
    const productSales = {};
    orders.forEach(order => {
      order.items?.forEach(item => {
        if (!productSales[item.name]) {
          productSales[item.name] = { sold: 0, revenue: 0 };
        }
        productSales[item.name].sold += item.quantity;
        productSales[item.name].revenue += item.price * item.quantity;
      });
    });

    const topProducts = Object.entries(productSales)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return res.status(200).json({
      totalRevenue,
      totalOrders,
      totalProducts,
      totalCustomers: totalOrders, // Simplified
      recentOrders: orders.slice(-5).reverse(),
      salesByDay,
      topProducts
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ error: 'Failed to fetch analytics' });
  }
}
