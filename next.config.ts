// next.config.ts

import { NextConfig } from 'next'

// URL de tu AdminJS en Easypanel
const ADMIN_URL = 'https://perro-verde-administracion.aslxla.easypanel.host'

const nextConfig: NextConfig = {
  // Configuración habitual de Next...
  reactStrictMode: true,
  // ...

  // Aquí van los rewrites para proxy
  async rewrites() {
    return [
      {
        source:      '/admin/:path*',         // cualquier ruta que empiece con /admin
        destination: `${ADMIN_URL}/:path*`,   // se la reescribe a tu Admin remota
      },
    ]
  },
}

export default nextConfig
