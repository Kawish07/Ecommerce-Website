export default function handler(req, res) {
  if (req.method === 'POST') {
    const { items, shippingAddress, paymentMethod } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'At least one item is required' });
    }

    const sanitizedItems = [];
    for (const item of items) {
      if (!item?.name || typeof item.name !== 'string') {
        return res.status(400).json({ error: 'Item name required' });
      }
      if (typeof item.price !== 'number' || item.price <= 0) {
        return res.status(400).json({ error: 'Item price must be positive' });
      }
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        return res.status(400).json({ error: 'Item quantity must be positive' });
      }
      sanitizedItems.push({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      });
    }

    if (!shippingAddress || typeof shippingAddress !== 'object') {
      return res.status(400).json({ error: 'Shipping address required' });
    }

    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'country'];
    for (const field of requiredFields) {
      if (!shippingAddress[field] || typeof shippingAddress[field] !== 'string') {
        return res.status(400).json({ error: `Shipping field ${field} is required` });
      }
    }

    const order = {
      items: sanitizedItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'unknown',
      status: 'pending',
      createdAt: new Date(),
    };

    (async () => {
      try {
        const { connectToDatabase } = require('../../lib/mongodb');
        const { db } = await connectToDatabase();
        if (db) {
          await db.collection('orders').insertOne(order);
        }
      } catch (e) {
        // ignore db errors here but keep response
      }
    })();

    return res.status(200).json({ ok: true, message: 'Checkout received', orderSummary: { totalItems: sanitizedItems.length } });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
