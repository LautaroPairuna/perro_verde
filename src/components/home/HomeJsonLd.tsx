import {prisma} from '@/lib/prisma'

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

const prodImg = (file?: string | null) =>
  file ? `/images/productos/${file}` : '/images/placeholder-producto.jpg'

export default async function HomeJsonLd() {
  const [rawFeatured, rawMostViewed] = await Promise.all([
    prisma.productos.findMany({
      where: { destacado: true, activo: true },
      take: 4,
      select: {
        id: true, producto: true, descripcion: true,
        precio: true, foto: true,
        rubro: { select: { id: true, rubro: true } },
        marca: { select: { id: true, marca: true } },
      },
    }),
    prisma.productos.findMany({
      where: { activo: true },
      orderBy: { visitas: 'desc' },
      take: 4,
      select: {
        id: true, producto: true, descripcion: true,
        precio: true, foto: true, visitas: true,
        rubro: { select: { id: true, rubro: true } },
        marca: { select: { id: true, marca: true } },
      },
    }),
  ])

  const featuredProducts = rawFeatured.map(p => ({
    ...p,
    precio: Number(p.precio),
  }))

  const mostViewed = rawMostViewed.map(p => ({
    ...p,
    precio: Number(p.precio),
  }))

  const toProductLd = (p: {
    id: number;
    producto: string;
    descripcion: string | null;
    foto: string | null;
    precio: number;
  }) => ({
    '@type': 'Product',
    name: p.producto,
    description: p.descripcion ?? undefined,
    image: prodImg(p.foto),
    sku: String(p.id),
    offers: {
      '@type': 'Offer',
      price: p.precio,
      priceCurrency: 'ARS',
      availability: 'https://schema.org/InStock',
    },
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      ...featuredProducts.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: toProductLd(p),
      })),
      ...mostViewed.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1 + featuredProducts.length,
        item: toProductLd(p),
      })),
    ],
  }

  return <JsonLd data={jsonLd} />
}
