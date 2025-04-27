import { NextConfig } from 'next'

const ADMIN_APP_URL = process.env.ADMIN_APP_URL 
  || 'https://perro-verde-administracion.aslxla.easypanel.host'

if (!ADMIN_APP_URL.startsWith('http')) {
  throw new Error('La variable ADMIN_APP_URL debe empezar por http:// o https://')
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Para la ruta base /AdministracionPV
      {
        source: '/admin',
        destination: `${ADMIN_APP_URL}`,  
      },
      // Para todas las subrutas
      {
        source: '/admin/:path*',
        destination: `${ADMIN_APP_URL}/:path*`,
      },
    ]
  },
}

export default nextConfig
