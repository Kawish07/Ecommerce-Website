import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    try {
      if (!db) {
        return res.status(200).json({ collections: [
          { _id: '1', name: 'Men', slug: 'men', description: 'Men\'s collection', productCount: 24 },
          { _id: '2', name: 'Women', slug: 'women', description: 'Women\'s collection', productCount: 18 },
          { _id: '3', name: 'Accessories', slug: 'accessories', description: 'Accessories', productCount: 6 },
        ]});
      }

      const collections = await db.collection('collections').find({}).toArray();
      return res.status(200).json({ collections });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch collections' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, slug, description, image } = req.body;

      if (!name || !slug) {
        return res.status(400).json({ error: 'Name and slug required' });
      }

      if (!db) {
        return res.status(200).json({ success: true, collection: { _id: Date.now().toString(), ...req.body } });
      }

      const result = await db.collection('collections').insertOne({
        name,
        slug,
        description,
        image,
        createdAt: new Date(),
      });

      return res.status(201).json({ success: true, id: result.insertedId });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create collection' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, name, slug, description, image } = req.body;

      if (!id || !name || !slug) {
        return res.status(400).json({ error: 'ID, name, and slug required' });
      }

      if (!db) {
        return res.status(200).json({ success: true });
      }

      await db.collection('collections').updateOne(
        { _id: id },
        { $set: { name, slug, description, image, updatedAt: new Date() } }
      );

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update collection' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'ID required' });
      }

      if (!db) {
        return res.status(200).json({ success: true });
      }

      await db.collection('collections').deleteOne({ _id: id });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete collection' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
