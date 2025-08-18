import type { Metadata } from 'next'

export const dynamic = 'force-dynamic' // evita cachear todo el segmento
export const revalidate = 0

export const metadata: Metadata = {
  title: { default: 'Checkout', template: '%s | Checkout' },
  description: 'Procesá tu compra de forma segura.',
  // Importante: NOINDEX a todo /checkout (success/pending/failure incluidas)
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
  // canonical genérico (las páginas hijas pueden sobrescribir si hiciera falta)
  alternates: { canonical: '/checkout' },
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-green-50 min-h-screen py-12" role="main" aria-label="Flujo de checkout">
      {children}
    </main>
  )
}
