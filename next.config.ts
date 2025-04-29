// next.config.ts
import { NextConfig } from 'next'

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL ?? 'http://localhost:3001'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Permitimos que Next cargue imágenes de /images
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port:     '3000',   // Next corre en 3000
        pathname: '/images/**',
      },
    ],
  },
  async rewrites() {
    return [
      // TODO: Proxy sólo admin y API, pero dejamos /images bajo Next
      { source: '/admin/:path*', destination: `${ADMIN_URL}/admin/:path*` },
      { source: '/api/:path*',   destination: `${ADMIN_URL}/api/:path*` },
      // ¡OJO! Eliminamos el rewrite de /images para que Next sirva public/images
    ]
  },
}

export default nextConfig
