// next.config.ts
import { NextConfig } from 'next'
import dotenv from 'dotenv'

// Carga explícitamente las variables de entorno
dotenv.config()

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Si sigues usando <Image> con URLs absolutas, conserva tu remotePatterns.
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

  // Redirige /images/* al handler dinámico en src/app/api/disk-images/[...filePath]/route.ts
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: '/api/disk-images/:path*',
      },
    ]
  },
}

export default nextConfig
