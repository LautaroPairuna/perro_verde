export default function CartLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
        <main className="bg-green-50 min-h-screen py-12">{children}</main>
      </>
    );
  }