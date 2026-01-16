import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';
import { requireAdmin } from '../../../lib/auth';

export default async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  const { db } = await connectToDatabase();
  if (!db) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  if (req.method === 'GET') {
    try {
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

      let id;
      try {
        id = new ObjectId(orderId);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid order ID' });
      }

      await db.collection('orders').updateOne(
        { _id: id },
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
