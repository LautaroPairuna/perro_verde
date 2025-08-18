// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import ClientShell from "@/components/ClientShell";

const SITE_URL = "https://www.perroverdepet.shop";

/** Helper mínimo para inyectar JSON-LD */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Perro Verde",
    template: "%s | Perro Verde",
  },
  description:
    "Perro Verde - Tienda de mascotas ubicada en Salta, Argentina. Se encuentra en la Av. los Incas N°6 Local 2.",
  keywords: [
    "tienda de mascotas Salta",
    "accesorios para mascotas",
    "alimento para perros",
    "comida para gatos",
    "Perro Verde",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "es-AR": "/",
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Perro Verde",
    locale: "es_AR",
    title: "Perro Verde — Petshop en Salta",
    description:
      "Alimentos, accesorios y cuidado para mascotas. Envíos y las mejores marcas en Salta.",
    images: [
      {
        url: "/og/home.png", // crea esta imagen o usa /opengraph-image
        width: 1200,
        height: 630,
        alt: "Perro Verde - Petshop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perro Verde — Petshop en Salta",
    description:
      "Alimentos, accesorios y cuidado para mascotas. Envíos y las mejores marcas en Salta.",
    images: ["/og/home.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD LocalBusiness/Organization (solo campos confirmados)
  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "PetStore", // más específico que LocalBusiness
    name: "Perro Verde",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Los Incas N°6 Local 2",
      addressLocality: "Salta",
      addressRegion: "Salta",
      addressCountry: "AR",
    },
  };

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Perro Verde",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
  };

  return (
    <html lang="es-AR">
      <body className="bg-green-50 text-black m-0 w-full max-w-full antialiased">
        {/* JSON-LD a nivel global */}
        <JsonLd data={organizationLd} />
        <JsonLd data={localBusinessLd} />

        {/* Toda la lógica condicional vive en ClientShell */}
        <ClientShell>{children}</ClientShell>

        {/* Notificaciones globales */}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
