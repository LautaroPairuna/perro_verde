import { NextConfig } from 'next'

/**
 * Define aquí, o en el .env, la URL que EasyPanel te asigna
 * para tu app de AdminJS.
 */
const ADMIN_APP_URL = process.env.ADMIN_APP_URL 

const nextConfig: NextConfig = {
  // …otras opciones que ya tengas…
  async rewrites() {
    return [
      {
        source: '/AdministracionPV/:path*',
        destination: `${ADMIN_APP_URL}/:path*`,
      },
    ]
  },
}

export default nextConfig
