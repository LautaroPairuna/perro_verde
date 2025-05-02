// src/app/catalogo/detalle/[slug]/page.tsx
import { redirect } from 'next/navigation'
import Head from 'next/head'
import slugify from '@/utils/slugify'
import { getSingleProduct } from '@/utils/fetchData'
import ProductInfo from '@/components/unProducto/ProductInfo'
import ProductTabs from '@/components/unProducto/ProductTabs'
import { PhotoSwipeInitializer } from '@/components/unProducto/PhotoSwipeInitializer'
import ImageWithFallback from '@/components/ImageWithFallback'
import type { ProductDetail } from '@/utils/fetchData'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const defaultMeta = {
    title: 'Detalle de Producto',
    description: 'Producto no encontrado',
  }
  if (!slug) return defaultMeta

  const parts = slug.split('-')
  const productId = Number(parts.at(-1))
  if (isNaN(productId)) return defaultMeta

  try {
    const raw = await getSingleProduct(productId)
    return {
      title: `${raw.producto} | Detalle de Producto`,
      description: raw.descripcion?.slice(0, 160) || 'Descripción no disponible.',
    }
  } catch {
    return defaultMeta
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
    raw = await getSingleProduct(productId)
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

  // Build images array
  const images = [
    {
      src: `/images/productos/${product.foto}`,
      thumb: `/images/productos/${product.foto}`,
      alt: product.producto,
      width: 1200,
      height: 1200,
    },
    ...product.fotos.map(f => ({
      src: `/images/productos/fotos/${f.foto}`,
      thumb: `/images/productos/fotos/${f.foto}`,
      alt: product.producto,
      width: 1200,
      height: 800,
    })),
  ]

  // Unified fallback
  const FALLBACK = '/images/productos/placeholder.jpg'

  return (
    <>
      <Head>
        <title>{`${product.producto} | Detalle de Producto`}</title>
        <meta name="description" content={product.descripcion.slice(0, 160)} />
      </Head>

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
