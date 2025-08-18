import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Pago pendiente',
  alternates: { canonical: '/checkout/pending' },
}

export default function PendingPage() {
  return (
    <div className="p-6 text-center text-yellow-700">
      <h1 className="text-2xl">⏳ Tu pago está en estado pendiente.</h1>
      <p className="mt-2">En breve actualizaremos el estado automáticamente.</p>
    </div>
  )
}
