import jwt from 'jsonwebtoken';

export function verifyAdminToken(token) {
  try {
    // Decode without bundling server secret; this only checks token shape/expiration.
    const decoded = jwt.decode(token, { complete: false });
    return decoded || null;
  } catch (error) {
    return null;
  }
}

export function checkAdminAuth() {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('adminToken');
  if (!token) return false;
  
  // Simple check - just verify token exists and is not expired
  // Full verification happens on API calls
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      clearAdminToken();
      return false;
    }
    
    return payload.role === 'admin';
  } catch (error) {
    console.error('Token check error:', error);
    clearAdminToken();
    return false;
  }
}

export function getAdminToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
}

export function setAdminToken(token) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('adminToken', token);
}

export function clearAdminToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('adminToken');
}

export async function checkAdminSession() {
  if (typeof window === 'undefined') return false;
  try {
    const res = await fetch('/api/admin/session', { credentials: 'same-origin' });
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data?.ok);
  } catch (error) {
    return false;
  }
}

export async function getAdminSession() {
  if (typeof window === 'undefined') return null;
  try {
    const res = await fetch('/api/admin/session', { credentials: 'same-origin' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user || null;
  } catch (error) {
    return null;
  }
}

export function clearAdminCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = 'admin_token=; Path=/; Max-Age=0';
}
