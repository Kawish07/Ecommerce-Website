export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const isProd = process.env.NODE_ENV === 'production';
  // Clear the admin session cookie with multiple Set-Cookie headers for cross-browser compatibility
  res.setHeader('Set-Cookie', [
    `admin_token=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT${isProd ? '; Secure' : ''}`,
  ]);

  // Also add cache control to prevent caching
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  
  return res.status(200).json({ ok: true });
}
