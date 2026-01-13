import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    try {
      if (!db) {
        // Return dummy data if no database
        return res.status(200).json({
          orders: [
            {
              _id: '1',
              shippingAddress: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                phone: '+92 300 1234567',
                address: '123 Main St',
                city: 'Karachi',
                country: 'Pakistan',
                postalCode: '75500'
              },
              items: [
                { name: 'Level Up Hoodie', price: 27200, quantity: 1, image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg' }
              ],
              paymentMethod: 'Cash on Delivery',
              status: 'pending',
              createdAt: new Date()
            }
          ]
        });
      }

      const orders = await db.collection('orders').find({}).sort({ createdAt: -1 }).toArray();
      return res.status(200).json({ orders });
    } catch (error) {
      console.error('Orders fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { orderId, status } = req.body;

      if (!orderId || !status) {
        return res.status(400).json({ error: 'Order ID and status required' });
      }

      if (!db) {
        return res.status(200).json({ success: true });
      }

      await db.collection('orders').updateOne(
        { _id: orderId },
        { $set: { status, updatedAt: new Date() } }
      );

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Order update error:', error);
      return res.status(500).json({ error: 'Failed to update order' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
