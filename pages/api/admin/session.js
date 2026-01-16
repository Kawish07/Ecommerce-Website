import { verifyAdminRequest } from '../../../lib/auth';

export default function handler(req, res) {
  try {
    const admin = verifyAdminRequest(req);
    
    if (!admin) {
      console.log('Session check: No admin token found');
      return res.status(200).json({ ok: false });
    }

    console.log('Session check: Admin verified -', admin.username);
    return res.status(200).json({
      ok: true,
      user: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Session verification error:', error);
    return res.status(200).json({ ok: false });
  }
}
