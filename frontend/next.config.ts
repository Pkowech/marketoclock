/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '', // Leave empty for default
        pathname: '/**', // Allow all paths under this domain
      },
    ],
  },
  // Add experimental flag for Turbopack if needed
  experimental: {
    turbopack: true,
  },
};

module.exports = nextConfig;