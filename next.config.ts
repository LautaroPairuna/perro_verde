// next.config.ts
import { NextConfig } from 'next'

const ADMIN_HOST = 'perro-verde-administracion.aslxla.easypanel.host'
const WEB_HOST   = 'perro-verde-web.aslxla.easypanel.host'
const ADMIN_URL  = `https://${ADMIN_HOST}/admin`

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // En lugar de domains, definimos patrones remotos
    remotePatterns: [
      {
        protocol: 'https',
        hostname: ADMIN_HOST,
        port:     '',
        // Cualquier /images/*
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: WEB_HOST,
        port:     '',
        pathname: '/_next/image',  // si también quieres permitir optimización de tu propio host
      },
    ],
  },

  async rewrites() {
    return [
      // Proxy de /admin
      { source: '/admin/:path*',  destination: `${ADMIN_URL}/:path*` },
      // Proxy de /images hacia AdminJS
      { source: '/images/:path*', destination: `https://${ADMIN_HOST}/images/:path*` },
    ]
  },
}

export default nextConfig
