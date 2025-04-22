// app/catalogo/detalle/[slug]/page.tsx
import { redirect } from 'next/navigation';
import Head from 'next/head';
import slugify from '@/utils/slugify';
import { getSingleProduct } from '@/utils/fetchData';
import ProductInfo from '@/components/unProducto/ProductInfo';
import ProductTabs from '@/components/unProducto/ProductTabs';
import { PhotoSwipeInitializer } from '@/components/unProducto/PhotoSwipeInitializer';
import ImageWithFallback from '@/components/ImageWithFallback';
import type { ProductDetail } from '@/utils/fetchData';

interface DetailParams {
  params: { slug?: string };
}

export default async function ProductDetailPage({ params }: DetailParams) {
  // 1) Extraer y validar slug + ID
  const safeParams = await Promise.resolve(params);
  const prodParam = safeParams.slug;
  if (!prodParam) throw new Error('Falta el parámetro del producto en la URL.');

  const parts = prodParam.split('-');
  const productId = Number(parts.at(-1));
  if (isNaN(productId)) throw new Error(`ID inválido en URL ("${parts.at(-1)}").`);

  // 2) Cargar el raw desde Prisma
  const raw = await getSingleProduct(productId);

  // 3) Mapear a los tipos de tus componentes
  const product = {
    ...raw,
    precio:      Number(raw.precio),          // Decimal → number
    descripcion: raw.descripcion ?? '',       // null → ''
    foto:        raw.foto ?? 'placeholder.jpg',
    versiones:   raw.versiones.map(v => ({
      id: v.id,
      producto_id: v.producto_id,
      version: v.version,
      detalle: v.detalle ?? '',               // null → ''
      orden: v.orden,
      activo: v.activo,
    })),
    especificaciones: raw.especificaciones.map(e => ({
      id: e.id,
      producto_id: e.producto_id,
      categoria: e.categoria,
      especificaciones: e.especificaciones,
      orden: e.orden,
      activo: e.activo,
    })),
  } as ProductDetail & {
    precio: number;
    descripcion: string;
    foto: string;
  };

  // 4) Redirigir si el slug no coincide
  const canonical = `${slugify(product.producto)}-${productId}`;
  if (prodParam !== canonical) redirect(`/catalogo/detalle/${canonical}`);

  // 5) Preparar galería
  const mainImage = {
    src: `/images/productos/thumbs/${product.foto}`,
    thumb: `/images/productos/thumbs/${product.foto}`,
    alt: product.producto,
  };
  const imagesRaw = product.fotos.map(f => ({
    src: `/images/productos/thumbs/${f.foto}`,
    thumb: `/images/productos/thumbs/${f.foto}`,
    alt: product.producto,
  }));
  imagesRaw.unshift(mainImage);

  // 6) Render
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

          {/* GALERÍA */}
          <section id="gallery" className="grid grid-cols-1 gap-4">
            {/* Imagen principal */}
            <a
              href={mainImage.src}
              data-pswp-width="1200"
              data-pswp-height="1200"
              data-index={0}
              className="relative w-full aspect-square overflow-hidden block transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src={mainImage.thumb}
                alt={mainImage.alt}
                className="absolute top-0 left-0 w-full h-full object-cover rounded cursor-pointer"
                loading="lazy"
              />
            </a>
            {/* Miniaturas */}
            <div
              className={`grid gap-4 ${
                imagesRaw.length <= 2 ? 'grid-cols-2'
                : imagesRaw.length <= 3 ? 'grid-cols-3'
                : 'grid-cols-4'
              }`}
            >
              {imagesRaw.slice(1).map((img, index) => (
                <a
                  key={index}
                  href={img.src}
                  data-pswp-width="1200"
                  data-pswp-height="800"
                  data-index={index + 1}
                  className="relative w-full aspect-square overflow-hidden block transition-all duration-300 hover:scale-105"
                >
                  <ImageWithFallback
                    src={img.thumb}
                    alt={img.alt}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded cursor-pointer"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </section>

          {/* INFO DEL PRODUCTO */}
          <section>
            <ProductInfo product={product} />
          </section>
        </div>
      </main>

      {/* TABS ADICIONALES */}
      <section className="p-8 md:p-16 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <ProductTabs product={product} />
        </div>
      </section>

      {/* PHOTO SWIPE */}
      <PhotoSwipeInitializer />
    </>
  );
}
