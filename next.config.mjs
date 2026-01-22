/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure JavaScript is minified in production
  compress: true,
  // Optimize production builds
  productionBrowserSourceMaps: false,
}

export default nextConfig
