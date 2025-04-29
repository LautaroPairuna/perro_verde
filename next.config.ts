// next.config.ts
import { NextConfig } from 'next'

const ADMIN_HOST = 'perro-verde-administracion.aslxla.easypanel.host'
const ADMIN_URL  = `https://${ADMIN_HOST}/admin`

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // Solo lo necesitas si en algún <Image> usas src absoluto apuntando al AdminJS
    // Para rutas relativas (/images/...), Next las toma como local y las sirve directo.
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
      // Proxy únicamente /admin → AdminJS
      {
        source:      '/admin/:path*',
        destination: `${ADMIN_URL}/:path*`,
      },
    ]
  },
}

export default nextConfig
