// src/app/catalogo/detalle/[slug]/page.tsx
import { redirect } from 'next/navigation'
import Head         from 'next/head'
import Image        from 'next/image'
import slugify      from '@/utils/slugify'
import { getSingleProduct } from '@/utils/fetchData'
import ProductInfo  from '@/components/unProducto/ProductInfo'
import ProductTabs  from '@/components/unProducto/ProductTabs'
import { PhotoSwipeInitializer } from '@/components/unProducto/PhotoSwipeInitializer'
import type { ProductDetail }    from '@/utils/fetchData'
import type { Metadata }         from 'next'

export const dynamic    = 'force-dynamic'
export const revalidate = 60

type Version        = ProductDetail['versiones'][number]
type Especificacion = ProductDetail['especificaciones'][number]
type Foto           = ProductDetail['fotos'][number]

// El host de AdminJS, viene de next.config.js como NEXT_PUBLIC_ADMIN_HOST
const ADMIN_HOST = process.env.NEXT_PUBLIC_ADMIN_HOST!

export async function generateMetadata({ params }: { params: Promise<{ slug?: string }> }): Promise<Metadata> {
  const { slug }     = await params
  const defaultMeta  = { title:'Detalle de Producto', description:'Producto no encontrado' }
  if (!slug) return defaultMeta

  const parts    = slug.split('-')
  const idPart   = parts.at(-1)!
  const productId = Number(idPart)
  if (isNaN(productId)) return defaultMeta

  try {
    const raw = await getSingleProduct(productId)
    return {
      title: `${raw.producto} | Detalle de Producto`,
      description: raw.descripcion?.slice(0,160) || 'Descripción no disponible.',
    }
  } catch {
    return defaultMeta
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug?: string }> }) {
  const { slug } = await params
  if (!slug) throw new Error('Falta el parámetro del producto en la URL.')

  const parts     = slug.split('-')
  const idStr     = parts.at(-1)!
  const productId = Number(idStr)
  if (isNaN(productId)) throw new Error(`ID inválido en URL ("${idStr}").`)

  let raw: ProductDetail
  try {
    raw = await getSingleProduct(productId)
  } catch {
    redirect('/catalogo/not-found')
  }

  const product = {
    ...raw,
    descripcion: raw.descripcion || '',
    foto:        raw.foto || 'placeholder.jpg',
    versiones:   raw.versiones.map(v => ({ ...v, detalle: v.detalle || '' })),
    especificaciones: raw.especificaciones,
  }

  const canonical = `${slugify(product.producto)}-${product.id}`
  if (slug !== canonical) {
    redirect(`/catalogo/detalle/${canonical}`)
  }

  // Construimos lista de imágenes
  const images = [
    {
      src:   `${ADMIN_HOST}/images/productos/${product.foto}`,
      thumb: `${ADMIN_HOST}/images/productos/${product.foto}`,
      alt:   product.producto,
    },
    ...product.fotos.map(f => ({
      src:   `${ADMIN_HOST}/images/productos/fotos/${f.foto}`,
      thumb: `${ADMIN_HOST}/images/productos/fotos/${f.foto}`,
      alt:   product.producto,
    })),
  ]

  return (
    <>
      <Head>
        <title>{`${product.producto} | Detalle de Producto`}</title>
        <meta name="description" content={product.descripcion.slice(0,160)} />
      </Head>
      <main className="p-8 md:p-12 bg-gray-50">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Galería */}
          <section id="gallery" className="space-y-4">
            <a
              href={images[0].src}
              data-pswp-width="1200"
              data-pswp-height="1200"
              data-index={0}
              className="relative w-full aspect-square overflow-hidden hover:scale-105 transition"
            >
              <Image
                src={images[0].thumb}
                alt={images[0].alt}
                fill
                style={{ objectFit:'cover' }}
                priority
              />
            </a>
            <div className={`grid gap-4 ${
                images.length <= 2 ? 'grid-cols-2'
              : images.length <= 3 ? 'grid-cols-3'
              :                       'grid-cols-4'}`}>
              {images.slice(1).map((img, i) => (
                <a
                  key={i}
                  href={img.src}
                  data-pswp-width="1200"
                  data-pswp-height="800"
                  data-index={i + 1}
                  className="relative w-full aspect-square overflow-hidden hover:scale-105 transition"
                >
                  <Image
                    src={img.thumb}
                    alt={img.alt}
                    fill
                    style={{ objectFit:'cover' }}
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </section>

          {/* Info del producto */}
          <section>
            <ProductInfo product={product} />
          </section>
        </div>
      </main>

      {/* Pestañas */}
      <section className="p-8 md:p-16 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <ProductTabs product={product} />
        </div>
      </section>

      <PhotoSwipeInitializer />
    </>
  )
}
