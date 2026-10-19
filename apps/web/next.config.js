/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { optimizePackageImports: ['lucide-react'] },
  env: {
    NEXT_PUBLIC_API_URL: process.env.API_URL ?? 'http://localhost:4000',
  },
};
module.exports = nextConfig;
