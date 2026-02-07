// next.config.ts
import { NextConfig } from 'next'
import dotenv from 'dotenv'

dotenv.config()

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port:     '3000',
        pathname: '/images/**',
      },
    ],
  },

  output: "standalone",

  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: '/api/disk-images/:path*',
      },
    ]
  }
}

export default nextConfig
