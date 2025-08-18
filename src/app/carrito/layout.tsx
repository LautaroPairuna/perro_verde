// src/app/carrito/layout.tsx
export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-green-100 py-12 min-h-[60vh]" role="main" aria-label="Carrito de compras">
      {children}
    </main>
  )
}
