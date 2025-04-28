// next.config.ts
import { NextConfig } from 'next'

const ADMIN_HOST = 'https://perro-verde-administracion.aslxla.easypanel.host'
const ADMIN_URL  = `${ADMIN_HOST}/admin`

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Si utilizas <Image /> de Next.js, añade también el dominio:
  images: {
    domains: ['perro-verde-administracion.aslxla.easypanel.host'],
    path: '/images'
  },

  async rewrites() {
    return [
      // Proxy de todo lo de /admin
      { source: '/admin',        destination: ADMIN_URL },
      { source: '/admin/:path*', destination: `${ADMIN_URL}/:path*` },

      // **NUEVO**: Proxy de las imágenes
      { source: '/images/:path*', destination: `${ADMIN_HOST}/images/:path*` },
    ]
  },
}

export default nextConfig
