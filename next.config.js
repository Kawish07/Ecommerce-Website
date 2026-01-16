/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  images: {
    domains: [
      "images.unsplash.com",
      "i.imgur.com",
      "res.cloudinary.com",
      "images.pexels.com",
      "cdn.pixabay.com",
      "media.istockphoto.com",
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  headers: async () => {
    const isProd = process.env.NODE_ENV === 'production';
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self'" + (isProd ? '' : " 'unsafe-eval'"),
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
      "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
      "font-src 'self' data: https:",
      "img-src 'self' data: https:",
      "media-src 'self' https: data:",
      "connect-src 'self' https:" + (isProd ? '' : ' http://localhost:3000 ws://localhost:3000 ws://127.0.0.1:3000'),
      "frame-ancestors 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      'upgrade-insecure-requests',
    ].join('; ');

    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=10, s-maxage=60' },
          { key: 'Content-Security-Policy', value: cspDirectives },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Content-Security-Policy', value: cspDirectives },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'lucide-react'],
  },
};
module.exports = nextConfig;
