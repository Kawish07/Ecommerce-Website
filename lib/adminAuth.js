import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export function verifyAdminToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
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
