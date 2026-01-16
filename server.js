require('dotenv').config(); // load env vars like MONGODB_URI
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.set('trust proxy', 1); // allow proxy headers for HTTPS redirect and rate limit
  server.use(express.json({ limit: '1mb' }));
  server.use(compression());
  server.use(helmet({
    contentSecurityPolicy: false, // CSP handled in next.config headers
    crossOriginEmbedderPolicy: false,
  }));

  if (!dev) {
    // Redirect HTTP to HTTPS when behind a proxy (e.g., Vercel/Heroku/Nginx)
    server.use((req, res, nextFn) => {
      const proto = req.get('x-forwarded-proto');
      if (proto && proto !== 'https') {
        return res.redirect(301, `https://${req.hostname}${req.originalUrl}`);
      }
      return nextFn();
    });
  }

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again later.',
  });
  server.use('/api', apiLimiter);

  // Example backend endpoint (dummy)
  server.get('/api/external-products', (req, res) => {
    res.json({ ok: true, message: 'External products endpoint (dummy)' });
  });

  // Fallback to Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
