// next.config.ts
import { NextConfig } from 'next'

const ADMIN_HOST = 'perro-verde-administracion.aslxla.easypanel.host'
const WEB_HOST   = 'perro-verde-web.aslxla.easypanel.host'
const ADMIN_URL  = `https://${ADMIN_HOST}/admin`

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // Permitimos optimizar imágenes de AdminJS y también de nuestra propia web
    domains: [
      ADMIN_HOST,
      WEB_HOST,
    ],
    // path queda /_next/image por defecto
  },

  async rewrites() {
    return [
      // Proxy todo /admin al AdminJS real
      { source: '/admin/:path*',  destination: `${ADMIN_URL}/:path*` },
      // Proxy /images/* a AdminJS
      { source: '/images/:path*', destination: `https://${ADMIN_HOST}/images/:path*` },
    ]
  },
}

export default nextConfig
