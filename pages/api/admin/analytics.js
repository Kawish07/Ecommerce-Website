import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();

    if (!db) {
      // Return dummy data if no database
      return res.status(200).json({
        totalRevenue: 2847500,
        totalOrders: 156,
        totalProducts: 48,
        totalCustomers: 89,
        recentOrders: [],
        salesByDay: [
          { date: '2026-01-07', sales: 125000 },
          { date: '2026-01-08', sales: 198000 },
          { date: '2026-01-09', sales: 156000 },
          { date: '2026-01-10', sales: 287000 },
          { date: '2026-01-11', sales: 234000 },
          { date: '2026-01-12', sales: 345000 },
          { date: '2026-01-13', sales: 412000 },
        ],
        topProducts: [
          { name: 'Level Up Hoodie', sold: 34, revenue: 925000 },
          { name: 'Power Joggers', sold: 28, revenue: 644000 },
          { name: 'Seamless Gym Tee', sold: 45, revenue: 202500 },
          { name: 'Flex Pro Shorts', sold: 23, revenue: 87400 },
        ]
      });
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
