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
        source: '/AdministracionPV',
        destination: `${ADMIN_APP_URL}/AdministracionPV`,  
      },
      // Para todas las subrutas
      {
        source: '/AdministracionPV/:path*',
        destination: `${ADMIN_APP_URL}/AdministracionPV/:path*`,
      },
    ]
  },
}

export default nextConfig
