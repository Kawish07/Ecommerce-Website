import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';
import { requireAdmin } from '../../../lib/auth';

const DEFAULT_ADMIN = {
  username: 'admin',
  passwordHash: '$2a$10$rKJ3qY5YvW9Y8pI.Z.xQxuQE9oY.3YIrJwJ5vW9Y8pI.Z.xQxuQE9o', // admin123
  role: 'superadmin',
  name: 'Default Admin',
  email: 'admin@example.com',
};

function sanitizeAdmin(admin) {
  if (!admin) return null;
  const { passwordHash, ...rest } = admin;
  return { ...rest, _id: admin._id?.toString() };
}

async function ensureDefaultAdmin(db) {
  if (!db) return;
  const count = await db.collection('admins').countDocuments();
  if (count === 0) {
    await db.collection('admins').insertOne({
      ...DEFAULT_ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export default async function handler(req, res) {
  const { method } = req;

  const admin = requireAdmin(req, res);
  if (!admin) return;

  try {
    const { db } = await connectToDatabase();

    if (!db) {
      return res.status(503).json({ error: 'Database not configured' });
    }

    if (method === 'GET') {
      await ensureDefaultAdmin(db);
      const admins = await db
        .collection('admins')
        .find({}, { projection: { passwordHash: 0 } })
        .sort({ createdAt: -1 })
        .toArray();

      return res.status(200).json({ admins: admins.map(sanitizeAdmin) });
    }

    if (method === 'POST') {
      const { username, password, role = 'admin', name, email } = req.body;

      if (!username || typeof username !== 'string' || username.length > 128) {
        return res.status(400).json({ error: 'Valid username is required' });
      }
      if (!password || typeof password !== 'string' || password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters' });
      }

      const existing = await db.collection('admins').findOne({ username });
      if (existing) {
        return res.status(409).json({ error: 'Username already exists' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const { insertedId } = await db.collection('admins').insertOne({
        username,
        passwordHash,
        role,
        name,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.status(201).json({ success: true, id: insertedId });
    }

    if (method === 'PUT') {
      const { id, username, password, role, name, email } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Admin ID is required' });
      }

      let adminId;
      try {
        adminId = new ObjectId(id);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid admin ID' });
      }

      if (username) {
        const existing = await db.collection('admins').findOne({ username, _id: { $ne: adminId } });
        if (existing) {
          return res.status(409).json({ error: 'Username already exists' });
        }
      }

      const update = { updatedAt: new Date() };
      if (username) update.username = username;
      if (role) update.role = role;
      if (name !== undefined) update.name = name;
      if (email !== undefined) update.email = email;
      if (password) {
        if (password.length < 8) {
          return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }
        update.passwordHash = await bcrypt.hash(password, 10);
      }

      await db.collection('admins').updateOne({ _id: adminId }, { $set: update });
      return res.status(200).json({ success: true });
    }

    if (method === 'DELETE') {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Admin ID is required' });
      }

      let adminId;
      try {
        adminId = new ObjectId(id);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid admin ID' });
      }

      await db.collection('admins').deleteOne({ _id: adminId });
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Admin CRUD error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
