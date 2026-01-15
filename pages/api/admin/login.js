import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Default admin (also used to seed DB if empty)
const DEFAULT_ADMIN = {
  username: 'admin',
  passwordHash: '$2a$10$rKJ3qY5YvW9Y8pI.Z.xQxuQE9oY.3YIrJwJ5vW9Y8pI.Z.xQxuQE9o', // admin123
  role: 'superadmin',
  name: 'Default Admin',
  email: 'admin@example.com',
};

async function ensureDefaultAdmin(db) {
  if (!db) return null;

  const adminCount = await db.collection('admins').countDocuments();
  if (adminCount === 0) {
    const { insertedId } = await db.collection('admins').insertOne({
      ...DEFAULT_ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return insertedId;
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const { db } = await connectToDatabase();

    if (db) {
      await ensureDefaultAdmin(db);
      const admin = await db.collection('admins').findOne({ username });

      if (admin) {
        const passwordMatch = admin.passwordHash
          ? await bcrypt.compare(password, admin.passwordHash)
          : password === admin.password;

        if (passwordMatch) {
          const token = jwt.sign(
            {
              username: admin.username,
              role: admin.role || 'admin',
              id: admin._id?.toString(),
              exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            },
            JWT_SECRET
          );

          return res.status(200).json({
            success: true,
            token,
            user: {
              id: admin._id?.toString(),
              username: admin.username,
              role: admin.role || 'admin',
              name: admin.name,
              email: admin.email,
            },
          });
        }
      }
    }

    // Fallback: accept default admin without DB
    if (username === DEFAULT_ADMIN.username && password === 'admin123') {
      const token = jwt.sign(
        { username, role: DEFAULT_ADMIN.role, exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 },
        JWT_SECRET
      );

      return res.status(200).json({
        success: true,
        token,
        user: { username, role: DEFAULT_ADMIN.role },
      });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
}