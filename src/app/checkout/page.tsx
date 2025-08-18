import type { Metadata } from 'next'
import CheckoutWizard from '@/components/checkout/CheckoutWizard'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Paso a paso',
  description: 'Completá tus datos y finalizá tu compra.',
  alternates: { canonical: '/checkout' },
}

export default function CheckoutPage() {
  return <CheckoutWizard />
}
