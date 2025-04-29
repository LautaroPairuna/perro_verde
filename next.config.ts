// next.config.ts
import { NextConfig } from 'next'

const ADMIN_HOST = 'perro-verde-administracion.aslxla.easypanel.host'
const ADMIN_URL  = `https://${ADMIN_HOST}/admin`

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: ADMIN_HOST,
        port:     '',
        pathname: '/images/**',
      },
    ],
  },
  async rewrites() {
    return [
      // Sigue proxy-fiando todo /admin al AdminJS
      { source: '/admin/:path*',  destination: `${ADMIN_URL}/:path*` },
      // Y proxy-fia todo /images/* a AdminJS también
      { source: '/images/:path*', destination: `https://${ADMIN_HOST}/images/:path*` },
    ]
  },
}

export default nextConfig
