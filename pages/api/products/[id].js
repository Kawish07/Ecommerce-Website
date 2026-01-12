import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { id } = req.query;

  if (!db) {
    // fallback: search static list
    const products = [
      { id: 1, name: 'Performance Tee', price: 29.99, image: 'https://images.unsplash.com/photo-1520975665373-7a0a4b6b9e5b?w=1200&q=80', description: 'Lightweight performance tee.' },
      { id: 2, name: 'Training Shorts', price: 39.99, image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=1200&q=80', description: 'Breathable training shorts.' },
      { id: 3, name: 'Hooded Jacket', price: 79.99, image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?w=1200&q=80', description: 'Water-resistant hooded jacket.' }
    ];
    const product = products.find((p) => String(p.id) === String(id));
    if (!product) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ product });
  }

  if (req.method === 'GET') {
    // try numeric id first
    let product = null;
    if (!isNaN(Number(id))) {
      product = await db.collection('products').findOne({ id: Number(id) });
    }
    if (!product) {
      try {
        product = await db.collection('products').findOne({ _id: new ObjectId(id) });
      } catch (e) {
        // ignore
      }
    }
    if (!product) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ product });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
