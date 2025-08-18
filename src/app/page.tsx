// src/app/page.tsx
import type { Metadata } from 'next'
import HomeClientComponents from '@/components/home/HomeClientComponents'
import prisma from '@/lib/prisma'

// ✅ Cache ISR (sirve versión cacheada y regenera cada X minutos)
export const revalidate = 300 // 5 min (ajusta a 60 si querés más fresco)

// Metadatos SOLO de la home (el layout ya define el template global)
export const metadata: Metadata = {
  title: 'Perro Verde - Petshop en Salta',
  description:
    'Tienda online de alimentos, accesorios y cuidados para tu mascota en Salta. Envíos rápidos y las mejores marcas.',
  alternates: { canonical: '/' },
}

// Helper mínimo para inyectar JSON-LD sin hydration warnings
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Paths de imagen (ajusta a tus rutas reales si difieren)
const prodImg = (file?: string | null) =>
  file ? `/images/productos/${file}` : '/images/placeholder-producto.jpg'

export default async function HomePage() {
  // 1) Sliders
  const sliders = await prisma.cfgSlider.findMany({
    where:   { activo: true },
    orderBy: { orden: 'asc' },
    select:  { foto: true },
  })
  const promotionImages = sliders.map(s => `/images/slider/${s.foto}`)

  // 2) Productos destacados
  const rawFeatured = await prisma.productos.findMany({
    where:   { destacado: true, activo: true },
    take:    4,
    select: {
      id: true, producto: true, descripcion: true,
      precio: true, foto: true,
      rubro: { select: { id: true, rubro: true } },
      marca: { select: { id: true, marca: true } },
    },
  })
  const featuredProducts = rawFeatured.map(p => ({
    ...p,
    precio: Number(p.precio), // Prisma Decimal → number
  }))

  // 3) Marcas
  const brands = await prisma.cfgMarcas.findMany({
    where:   { activo: true },
    orderBy: { marca: 'asc' },
    select:  { id: true, marca: true, foto: true },
  })

  // 4) Más vistos
  const rawMostViewed = await prisma.productos.findMany({
    where:   { activo: true },
    orderBy: { visitas: 'desc' },
    take:    4,
    select: {
      id: true, producto: true, descripcion: true,
      precio: true, foto: true, visitas: true,
      rubro: { select: { id: true, rubro: true } },
      marca: { select: { id: true, marca: true } },
    },
  })
  const mostViewed = rawMostViewed.map(p => ({
    ...p,
    precio: Number(p.precio),
  }))

  // 5) Rubros
  const rubros = await prisma.cfgRubros.findMany({
    where:   { activo: true },
    select:  { id: true, rubro: true, foto: true },
    orderBy: { rubro: 'asc' },
  })

  // ─────────────────────────────────────────
  // JSON-LD: ItemList (Destacados + Más Vistos)
  // (Organization/PetStore ya los podés dejar en el layout)
  // ─────────────────────────────────────────
  const toProductLd = (p: typeof featuredProducts[number]) => ({
    '@type': 'Product',
    name: p.producto,
    description: p.descripcion ?? undefined,
    image: prodImg(p.foto),
    sku: String(p.id),
    brand: p.marca?.marca ? { '@type': 'Brand', name: p.marca.marca } : undefined,
    category: p.rubro?.rubro,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ARS',
      price: p.precio.toFixed(2),
      availability: 'https://schema.org/InStock',
      url: `/detalle/${p.id}`, // ⚠️ ajusta si usás slug: `/detalle/${slug}`
    },
  })

  const featuredItemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Productos Destacados',
    itemListElement: featuredProducts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `/detalle/${p.id}`, // ⚠️ ajusta si usás slug
      item: toProductLd(p),
    })),
  }

  const mostViewedItemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Productos Más Vistos',
    itemListElement: mostViewed.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `/detalle/${p.id}`, // ⚠️ ajusta si usás slug
      item: toProductLd(p),
    })),
  }

  return (
    <>
      {/* JSON-LD sólo de esta página */}
      <JsonLd data={featuredItemListLd} />
      <JsonLd data={mostViewedItemListLd} />

      <HomeClientComponents
        promotionImages={promotionImages}
        featuredProducts={featuredProducts}
        brands={brands}
        mostViewed={mostViewed}
        rubros={rubros}
      />
    </>
  )
}
