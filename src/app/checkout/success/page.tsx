import type { Metadata } from 'next'
import SuccessPageClient from './SuccessPageClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Estado del pago',
  description: 'Verificamos el estado de tu pago.',
  alternates: { canonical: '/checkout/success' },
}

export default function SuccessPage() {
  return <SuccessPageClient />
}
