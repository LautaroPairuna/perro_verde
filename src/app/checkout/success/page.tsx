// src/app/checkout/success/page.tsx

export const dynamic = 'force-dynamic'
export const revalidate = 60

import dynamicImport from 'next/dynamic'

// cargamos el componente de cliente sin SSR y con un placeholder
const SuccessPageClient = dynamicImport(
  () => import('./SuccessPageClient'),
  {
    ssr: false,
    loading: () => <p>Loading…</p>,
  }
)

export default function SuccessPageWrapper() {
  return <SuccessPageClient />
}
