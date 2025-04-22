// src/app/catalogo/layout.tsx
export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="bg-green-50 h-auto">
        {children}
      </main>
    </>
  );
}
