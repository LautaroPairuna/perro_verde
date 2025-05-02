// src/app/layout.tsx  (SIN 'use client')
import './globals.css'
import { Metadata } from 'next'
import { Toaster }  from 'react-hot-toast'
import ClientShell  from '@/components/ClientShell'   // 👈 nuevo

export const metadata: Metadata = {
  title: 'Perro Verde',
  description: 'Descripción por defecto.',
  // …
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
