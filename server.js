require('dotenv').config(); // load env vars like MONGODB_URI
const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(express.json());

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
