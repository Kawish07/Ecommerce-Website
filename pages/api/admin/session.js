import { verifyAdminRequest } from '../../../lib/auth';

function parseCookies(req) {
  const cookies = {};
  const cookieHeader = req.headers.cookie || '';
  cookieHeader.split(';').forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });
  return cookies;
}

export default function handler(req, res) {
  // Parse cookies manually
  req.cookies = parseCookies(req);
  
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
