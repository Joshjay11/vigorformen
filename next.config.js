/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io', 'placehold.co'], // Allow images from Sanity.io and placeholder images
    unoptimized: true, // Required for static export
  },
  output: 'export', // Generate static HTML files for Firebase Hosting
}

module.exports = nextConfig
