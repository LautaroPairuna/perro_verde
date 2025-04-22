// app/checkout/page.tsx
import CheckoutWizard from '@/components/checkout/CheckoutWizard';
export const dynamic = 'force-dynamic'
export const revalidate = 60

export default function CheckoutPage() {
  return <CheckoutWizard />;
}
