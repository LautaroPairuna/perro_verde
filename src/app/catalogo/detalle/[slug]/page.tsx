// src/app/catalogo/detalle/[slug]/page.tsx
import { redirect } from 'next/navigation'
import Head         from 'next/head'
import slugify      from '@/utils/slugify'
import { getSingleProduct } from '@/utils/fetchData'
import ProductInfo  from '@/components/unProducto/ProductInfo'
import ProductTabs  from '@/components/unProducto/ProductTabs'
import { PhotoSwipeInitializer } from '@/components/unProducto/PhotoSwipeInitializer'
import ImageWithFallback         from '@/components/ImageWithFallback'
import type { ProductDetail }    from '@/utils/fetchData'
import type { Metadata }         from 'next'

export const dynamic    = 'force-dynamic'
export const revalidate = 60

// Extraemos tipos de los arrays
type Version        = ProductDetail['versiones'][number]
type Especificacion = ProductDetail['especificaciones'][number]
type Foto           = ProductDetail['fotos'][number]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>
}): Promise<Metadata> {
  const { slug }       = await params
  const defaultTitle   = 'Detalle de Producto'
  if (!slug) {
    return { title: defaultTitle, description: 'Producto no encontrado' }
  }
  const parts    = slug.split('-')
  const idPart   = parts.at(-1) ?? ''
  const productId = Number(idPart)
  if (isNaN(productId)) {
    return { title: defaultTitle, description: 'ID de producto inválido' }
  }
  try {
    const raw = await getSingleProduct(productId)
    return {
      title: `${raw.producto} | Detalle de Producto`,
      description: raw.descripcion?.substring(0, 160) || 'Descripción no disponible.',
    }
  } catch {
    return { title: defaultTitle, description: 'Error al cargar detalles del producto' }
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug?: string }>
}) {
  // 1) Validar slug e ID
  const { slug } = await params
  if (!slug) throw new Error('Falta el parámetro del producto en la URL.')
  const parts     = slug.split('-')
  const idStr     = parts.at(-1) ?? ''
  const productId = Number(idStr)
  if (isNaN(productId)) throw new Error(`ID inválido en URL ("${idStr}").`)

  // 2) Cargar datos
  let raw: ProductDetail
  try {
    raw = await getSingleProduct(productId)
  } catch (err) {
    console.error('Error cargando producto:', err)
    redirect('/catalogo/not-found')
  }

  // 3) Mapear y normalizar
  const product: ProductDetail & { foto: string; descripcion: string } = {
    ...raw,
    descripcion: raw.descripcion ?? '',
    foto:        raw.foto ?? 'placeholder.jpg',

    versiones: raw.versiones.map((v: Version) => ({
      ...v,
      detalle: v.detalle ?? '',
    })),

    especificaciones: raw.especificaciones.map((e: Especificacion) => ({
      ...e,
    })),
  }

  // 4) Redirigir al slug canónico si difiere
  const canonical = `${slugify(product.producto)}-${product.id}`
  if (slug !== canonical) {
    redirect(`/catalogo/detalle/${canonical}`)
  }

  // 5) Construir galería
  const mainImage = {
    src:   `/images/productos/${product.foto}`,
    thumb: `/images/productos/${product.foto}`,
    alt:   product.producto,
  }
  const images = [
    mainImage,
    ...product.fotos.map((f: Foto) => ({
      src:   `/images/productos/fotos/${f.foto}`,
      thumb: `/images/productos/fotos/${f.foto}`,
      alt:   product.producto,
    })),
  ]

  // 6) Renderizado
  return (
    <>
      <Head>
        <title>{`${product.producto} | Detalle de Producto`}</title>
        <meta
          name="description"
          content={product.descripcion.substring(0, 160) || 'Descripción no disponible.'}
        />
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
              <ImageWithFallback
                src={images[0].thumb}
                alt={images[0].alt}
                className="w-full h-full object-cover rounded"
                loading="lazy"
              />
            </a>

            <div
              className={`grid gap-4 ${
                images.length <= 2 ? 'grid-cols-2'
                : images.length <= 3 ? 'grid-cols-3'
                :                    'grid-cols-4'
              }`}
            >
              {images.slice(1).map((img, i) => (
                <a
                  key={i}
                  href={img.src}
                  data-pswp-width="1200"
                  data-pswp-height="800"
                  data-index={i + 1}
                  className="relative w-full aspect-square overflow-hidden hover:scale-105 transition"
                >
                  <ImageWithFallback
                    src={img.thumb}
                    alt={img.alt}
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </section>

          {/* Información del producto */}
          <section>
            <ProductInfo product={product} />
          </section>
        </div>
      </main>

      {/* Pestañas adicionales */}
      <section className="p-8 md:p-16 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <ProductTabs product={product} />
        </div>
      </section>

      {/* PhotoSwipe */}
      <PhotoSwipeInitializer />
    </>
  )
}
