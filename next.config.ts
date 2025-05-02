// next.config.ts
import { NextConfig } from 'next'
import dotenv from 'dotenv'

// Carga explícitamente las variables de entorno
dotenv.config()

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port:     '3000',   
        pathname: '/images/**',
      },
    ],
  },
  // Volvemos al comportamiento por defecto: sin proxy de /admin ni de /api
  // Next.js servirá todo desde su propia carpeta public y sus rutas
}

export default nextConfig
