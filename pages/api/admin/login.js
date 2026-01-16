import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../lib/mongodb';
import { signAdminToken } from '../../../lib/auth';

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
    const isProd = process.env.NODE_ENV === 'production';

    if (!db) {
      if (!isProd && username === DEFAULT_ADMIN.username && password === 'admin123') {
        const token = signAdminToken({ username, role: DEFAULT_ADMIN.role, id: 'dev-default-admin' });
        res.setHeader('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400`);
        return res.status(200).json({ success: true, token, user: { username, role: DEFAULT_ADMIN.role } });
      }
      return res.status(503).json({ error: 'Database not configured' });
    }

    await ensureDefaultAdmin(db);
    const admin = await db.collection('admins').findOne({ username });

    if (admin) {
      const passwordMatch = admin.passwordHash
        ? await bcrypt.compare(password, admin.passwordHash)
        : password === admin.password;

      if (passwordMatch) {
        const token = signAdminToken({
          username: admin.username,
          role: admin.role || 'admin',
          id: admin._id?.toString(),
        });

        const isProd = process.env.NODE_ENV === 'production';
        res.setHeader('Set-Cookie', `admin_token=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400${isProd ? '; Secure' : ''}`);

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
    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
}