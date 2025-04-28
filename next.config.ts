// next.config.ts
import { NextConfig } from 'next'

const ADMIN_HOST = 'https://perro-verde-administracion.aslxla.easypanel.host'
const ADMIN_URL  = `${ADMIN_HOST}/admin`

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // Le dices a Next que puede optimizar cualquier imagen que venga de tu AdminJS
    domains: ['perro-verde-administracion.aslxla.easypanel.host'],
    // NO toques el `path`, que por defecto es "/_next/image"
  },

  async rewrites() {
    return [
      // Proxy para todo lo de /admin
      { source: '/admin/:path*', destination: `${ADMIN_URL}/:path*` },

      // Proxy para servir las imágenes estáticas de AdminJS
      { source: '/images/:path*', destination: `${ADMIN_HOST}/images/:path*` },
    ]
  },
}

export default nextConfig
