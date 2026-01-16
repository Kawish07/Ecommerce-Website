import jwt from 'jsonwebtoken';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET || (process.env.NODE_ENV === 'development' ? 'dev-secret-change-me' : '');
  if (!secret) {
    throw new Error('JWT_SECRET is not configured. Set it in your environment for production.');
  }
  return secret;
}

function parseCookies(cookieString = '') {
  const cookies = {};
  if (!cookieString) return cookies;
  cookieString.split(';').forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });
  return cookies;
}

export function extractToken(req) {
  // Parse cookies from the cookie header if not already parsed
  if (!req.cookies) {
    req.cookies = parseCookies(req.headers?.cookie);
  }
  
  const authHeader = req.headers?.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  const cookieToken = req.cookies?.admin_token;
  if (cookieToken) return cookieToken;
  return null;
}

export function verifyAdminRequest(req) {
  const token = extractToken(req);
  if (!token) return null;

  try {
    const payload = jwt.verify(token, getJwtSecret());
    if (payload?.role !== 'admin' && payload?.role !== 'superadmin') {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
}

export function requireAdmin(req, res) {
  const admin = verifyAdminRequest(req);
  if (!admin) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }
  return admin;
}

export function signAdminToken(payload) {
  const secret = getJwtSecret();
  const exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24h
  return jwt.sign({ ...payload, exp }, secret);
}
