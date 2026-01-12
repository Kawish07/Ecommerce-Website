export default function handler(req, res) {
  if (req.method === 'POST') {
    // Dummy checkout response. Replace with real payment integration.
    // Optionally persist order to DB if available.
    (async () => {
      try {
        const { connectToDatabase } = require('../../lib/mongodb');
        const { db } = await connectToDatabase();
        if (db) {
          const order = req.body;
          order.createdAt = new Date();
          await db.collection('orders').insertOne(order);
        }
      } catch (e) {
        // ignore db errors here
      }
    })();
    return res.status(200).json({ ok: true, message: 'Checkout session created (dummy)' });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
