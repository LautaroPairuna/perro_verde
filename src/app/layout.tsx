// src/app/layout.tsx
import './globals.css';
import { Metadata } from 'next';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Perro Verde',
  description: 'Descripción por defecto.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Perro Verde',
    description: 'Descripción por defecto.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Perro Verde',
    description: 'Descripción por defecto.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className="bg-green-50"
        style={{
          maxWidth: '100%!important',
          color: '#000',
          padding: '90px 0 0 0!important',
          margin: '0!important',
          width: '100%',
        }}
      >
        <CartProvider>
          {/* Header */}
          <Header />
          {/* Contenido principal */}
          {children}
          {/* Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
