import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Pago no completado',
  alternates: { canonical: '/checkout/failure' },
}

export default function FailurePage() {
  return (
    <div className="p-6 text-center text-red-700">
      <h1 className="text-2xl">❌ El pago no pudo completarse.</h1>
      <p className="mt-2">Por favor, intentá de nuevo o elegí otro método.</p>
    </div>
  )
}
