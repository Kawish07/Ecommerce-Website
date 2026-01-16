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

      let collectionId;
      try {
        collectionId = new ObjectId(id);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid collection ID' });
      }

      await db.collection('collections').updateOne(
        { _id: collectionId },
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

      let collectionId;
      try {
        collectionId = new ObjectId(id);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid collection ID' });
      }

      await db.collection('collections').deleteOne({ _id: collectionId });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete collection' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
