import './globals.css'
import { Metadata } from 'next'
import { Toaster }  from 'react-hot-toast'
import ClientShell  from '@/components/ClientShell'   

export const metadataBase = new URL('https://www.perroverdepet.shop')

export const metadata: Metadata = {
  title: 'Perro Verde',
  description: 'Perro Verde - Tienda de mascotas ubicada en Salta, Argentina. Se encuentra en la Av. los Incas N°6 Local 2 ',
  icons: {
    icon: '/favicon.ico',       
    apple: '/favicon.ico',      
    shortcut: '/favicon.ico'    
  },
  keywords: [
    'tienda de mascotas Salta',
    'accesorios para mascotas',
    'alimento para perros',
    'comida para gatos',
    'Perro Verde'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className="bg-green-50"
        style={{
          maxWidth: '100%!important',
          color: '#000',
          margin: '0!important',
          width: '100%',
        }}
      >
        {/* Toda la lógica condicional vive en ClientShell */}
        <ClientShell>{children}</ClientShell>

        {/* Notificaciones globales siguen vivas en ambos contextos */}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
