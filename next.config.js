/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
      unoptimized: true
  },
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig
