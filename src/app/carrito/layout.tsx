// src/app/carrito/layout.tsx
export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="bg-green-50 py-12">{children}</main>
    </>
  );
}
