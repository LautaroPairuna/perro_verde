// next.config.ts
import { NextConfig } from 'next'

const ADMIN_URL = 'https://perro-verde-administracion.aslxla.easypanel.host'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // …tus otras opciones…
  async rewrites() {
    return [
      // match exacto /admin
      { source: '/admin',          destination: ADMIN_URL },
      // match /admin/lo-que-sea
      { source: '/admin/:path*',   destination: `${ADMIN_URL}/:path*` },
    ]
  },
}

export default nextConfig
