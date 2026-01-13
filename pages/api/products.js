import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { category, subcategory } = req.query;
  
  if (!db) {
    // Fallback to static data when DB not configured
    const products = [
      { id: 1, name: 'Performance Tee', price: 29.99, category: 'men', subcategory: 't-shirts', image: 'https://images.unsplash.com/photo-1520975665373-7a0a4b6b9e5b?w=1200&q=80', description: 'Lightweight performance tee.' },
      { id: 2, name: 'Training Shorts', price: 39.99, category: 'men', subcategory: 'shorts', image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=1200&q=80', description: 'Breathable training shorts.' },
      { id: 3, name: 'Hooded Jacket', price: 79.99, category: 'men', subcategory: 'hoodies-jackets', image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?w=1200&q=80', description: 'Water-resistant hooded jacket.' }
    ];
    
    let filteredProducts = products;
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (subcategory) {
      filteredProducts = filteredProducts.filter(p => p.subcategory === subcategory);
    }
    
    return res.status(200).json({ products: filteredProducts });
  }

  if (req.method === 'GET') {
    // Build query based on parameters
    const query = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    
    const products = await db.collection('products').find(query).toArray();
    return res.status(200).json({ products });
  }

  if (req.method === 'POST') {
    const data = req.body;
    const result = await db.collection('products').insertOne(data);
    return res.status(201).json({ insertedId: result.insertedId });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
