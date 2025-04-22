// src/app/checkout/success/page.tsx

export const dynamic = 'force-dynamic';
export const revalidate = 60;

import SuccessPageClient from './SuccessPageClient';

export default function SuccessPageWrapper() {
  // Next.js renderizará el cliente en el navegador automáticamente
  return <SuccessPageClient />;
}
