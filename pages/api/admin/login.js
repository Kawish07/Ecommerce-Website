import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Hardcoded admin credentials (in production, use database)
const ADMIN_USER = {
  username: 'admin',
  // Password: admin123 (hashed)
  passwordHash: '$2a$10$rKJ3qY5YvW9Y8pI.Z.xQxuQE9oY.3YIrJwJ5vW9Y8pI.Z.xQxuQE9o'
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  // For demo purposes, accept "admin/admin123" without bcrypt
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign(
      { username, role: 'admin', exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) },
      JWT_SECRET
    );

    return res.status(200).json({
      success: true,
      token,
      user: { username, role: 'admin' }
    });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}