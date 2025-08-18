// src/app/carrito/page.tsx
import type { Metadata } from 'next'
import Cart from '@/components/carrito/Cart'

// El carrito no debe cachearse: estado por usuario (cookies/localStorage/session)
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Carrito', // => renderiza "Carrito | Perro Verde" por el template del layout
  description: 'Revisa los productos agregados a tu carrito.',
  alternates: { canonical: '/carrito' },
  // Mejor práctica: no indexar ni seguir enlaces del carrito
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-snippet': -1,
      'max-image-preview': 'none',
      'max-video-preview': -1,
    },
  },
}

export default function CartPage() {
  return <Cart />
}
