import { verifyAdminRequest } from '../../../lib/auth';

export default function handler(req, res) {
  const admin = verifyAdminRequest(req);
  if (!admin) {
    return res.status(200).json({ ok: false });
  }

  return res.status(200).json({
    ok: true,
    user: {
      id: admin.id,
      username: admin.username,
      role: admin.role,
    },
  });
}
