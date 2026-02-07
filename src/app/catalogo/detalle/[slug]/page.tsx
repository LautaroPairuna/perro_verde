// src/app/catalogo/detalle/[slug]/page.tsx
import { redirect } from 'next/navigation'
import slugify from '@/utils/slugify'
import { getSingleProduct, incrementProductVisits } from '@/utils/fetchData'
import ProductInfo from '@/components/unProducto/ProductInfo'
import ProductTabs from '@/components/unProducto/ProductTabs'
import { PhotoSwipeInitializer } from '@/components/unProducto/PhotoSwipeInitializer'
import ImageWithFallback from '@/components/ImageWithFallback'
import type { ProductDetail } from '@/utils/fetchData'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

// Helper JSON-LD
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const fallback: Metadata = {
    title: 'Detalle de Producto',
    description: 'Producto no encontrado',
    robots: { index: false }, // si no hay producto, no indexar
  }
  if (!slug) return fallback

  const parts = slug.split('-')
  const productId = Number(parts.at(-1))
  if (isNaN(productId)) return fallback

  try {
    const raw = await getSingleProduct(productId)
    const canonicalSlug = `${slugify(raw.producto)}-${raw.id}`
    return {
      title: `${raw.producto} | Detalle de Producto`,
      description: raw.descripcion?.slice(0, 160) || 'Descripción no disponible.',
      alternates: { canonical: `/catalogo/detalle/${canonicalSlug}` },
      openGraph: {
        title: `${raw.producto} | Perro Verde`,
        description: raw.descripcion?.slice(0, 200) || undefined,
        url: `/catalogo/detalle/${canonicalSlug}`,
        images: [
          { url: prodImg(raw.foto), width: 1200, height: 1200, alt: raw.producto },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${raw.producto} | Perro Verde`,
        description: raw.descripcion?.slice(0, 200) || undefined,
        images: [prodImg(raw.foto)],
      },
    }
  } catch {
    return fallback
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug?: string }>
}) {
  const { slug } = await params
  if (!slug) throw new Error('Falta el parámetro del producto en la URL.')

  const parts = slug.split('-')
  const productId = Number(parts.at(-1))
  if (isNaN(productId)) throw new Error(`ID inválido en URL ("${parts.at(-1)}").`)

  let raw: ProductDetail
  try {
    // 1) Obtener datos (cacheado)
    raw = await getSingleProduct(productId)
    
    // 2) Registrar visita (sin bloquear render excesivamente, pero asegurando ejecución)
    // En Next.js 15 podríamos usar after() si estuviera habilitado, por ahora await rápido.
    await incrementProductVisits(productId)
  } catch {
    redirect('/catalogo/not-found')
  }

  const product = {
    ...raw,
    descripcion: raw.descripcion || '',
    foto: raw.foto || '',
    versiones: raw.versiones.map(v => ({ ...v, detalle: v.detalle || '' })),
    especificaciones: raw.especificaciones,
  }

  // Canonical slug
  const canonical = `${slugify(product.producto)}-${product.id}`
  if (slug !== canonical) redirect(`/catalogo/detalle/${canonical}`)

  // Images para galería
  const images = [
    {
      src: `/images/productos/${product.foto}`,
      thumb: `/images/productos/${product.foto}`,
      alt: product.producto,
      width: 1200,
      height: 1200,
    },
    ...product.fotos.map(f => ({
      src: `/images/producto-fotos/${f.foto}`,
      thumb: `/images/producto-fotos/${f.foto}`,
      alt: product.producto,
      width: 1200,
      height: 800,
    })),
  ]

  const FALLBACK = '/images/productos/placeholder.jpg'

  // JSON-LD Product (sin offers)
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.producto,
    description: product.descripcion || undefined,
    image: prodImg(product.foto),
    sku: String(product.id),
    brand: product.marca?.marca ? { '@type': 'Brand', name: product.marca.marca } : undefined,
    category: product.rubro?.rubro,
    url: `/catalogo/detalle/${canonical}`,
  }

  return (
    <>
      {/* JSON-LD */}
      <JsonLd data={productLd} />

      <main className="bg-gray-50 py-12">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
          {/* Galería PhotoSwipe */}
          <div id="gallery">
            {/* Principal */}
            <a
              href={images[0].src}
              data-pswp-width={images[0].width}
              data-pswp-height={images[0].height}
              data-index={0}
              className="block relative w-full aspect-square overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition"
            >
              <ImageWithFallback
                fill
                src={images[0].thumb || FALLBACK}
                alt={images[0].alt}
                fallbackSrc={FALLBACK}
                style={{ objectFit: 'cover' }}
                priority
              />
            </a>

            {/* Miniaturas */}
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-4">
                {images.slice(1).map((img, idx) => (
                  <a
                    key={idx}
                    href={img.src}
                    data-pswp-width={img.width}
                    data-pswp-height={img.height}
                    data-index={idx + 1}
                    className="block relative w-full aspect-square overflow-hidden rounded-lg shadow-sm hover:scale-105 transition"
                  >
                    <ImageWithFallback
                      fill
                      src={img.thumb || FALLBACK}
                      alt={img.alt}
                      fallbackSrc={FALLBACK}
                      style={{ objectFit: 'cover' }}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>
      </main>

      {/* Pestañas */}
      <section className="bg-white py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <ProductTabs product={product} />
        </div>
      </section>

      {/* Inicializa PhotoSwipe */}
      <PhotoSwipeInitializer />
    </>
  )
}
