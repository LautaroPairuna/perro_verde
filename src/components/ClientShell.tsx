'use client'
import { usePathname } from 'next/navigation'
import { useEffect }    from 'react'
import Header       from '@/components/header/Header'
import Footer       from '@/components/footer/Footer'
import WhatsappLink from '@/components/WhatsappLink'
import { CartProvider } from '@/context/CartContext'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname   = usePathname() ?? ''
  const inAdmin    = pathname.startsWith('/admin')

  /* ----- alternamos la clase en <body> ----- */
  useEffect(() => {
    document.body.classList.toggle('admin-mode', inAdmin)
  }, [inAdmin])

  /* ------- /admin: sin header/footer -------- */
  if (inAdmin) return <>{children}</>

  /* ------- sitio público -------------------- */
  return (
    <CartProvider>
      <Header />
      {children}
      <WhatsappLink />
      <Footer />
    </CartProvider>
  )
}
