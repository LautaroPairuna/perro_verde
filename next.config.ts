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

  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: '/api/disk-images/:path*',
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '^perroverdepet\\.shop$', // redirige sin www → con www
          },
        ],
        destination: 'https://www.perroverdepet.shop/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
