// app/catalogo/detalle/[slug]/page.tsx
import { redirect } from 'next/navigation';
import Head from 'next/head';
import slugify from '@/utils/slugify';
import { getSingleProduct } from '@/utils/fetchData';
import ProductInfo from '@/components/unProducto/ProductInfo';
import ProductTabs from '@/components/unProducto/ProductTabs';
import { PhotoSwipeInitializer } from '@/components/unProducto/PhotoSwipeInitializer';
import ImageWithFallback from '@/components/ImageWithFallback';

interface DetailParams {
  params: { slug?: string };
}

export default async function ProductDetailPage({ params }: DetailParams) {
  // Evitar error "Route used params… should be awaited"
  const safeParams = await Promise.resolve(params);
  const prodParam = safeParams.slug; // Ej: "pedigree-puppy-formula-1"

  if (!prodParam) {
    throw new Error('Falta el parámetro del producto en la URL.');
  }

  // Partir el slug => ["pedigree", "puppy", "formula", "1"]
  const parts = prodParam.split('-');
  const idStr = parts[parts.length - 1]; // "1"
  const productId = Number(idStr);
  if (isNaN(productId)) {
    throw new Error(`La parte final (${idStr}) no es un número válido.`);
  }

  // Obtener el producto
  const product = await getSingleProduct(productId);
  if (!product) {
    throw new Error(`Producto con ID ${productId} no encontrado.`);
  }

  // Generar el slug real
  const generatedSlug = slugify(product.producto);
  const expectedParam = `${generatedSlug}-${productId}`;
  if (prodParam !== expectedParam) {
    // Redirigir a la URL "correcta"
    redirect(`/catalogo/detalle/${expectedParam}`);
  }

  const pageTitle = `${product.producto} | Detalle de Producto`;
  const pageDescription = product.descripcion
    ? product.descripcion.substring(0, 160)
    : 'Descripción del producto no disponible.';

  // Galería
  interface ProductImage {
    src: string;
    thumb: string;
    alt: string;
  }

  const mainImage: ProductImage = {
    src: `/images/productos/thumbs/${product.foto || 'placeholder.jpg'}`,
    thumb: `/images/productos/thumbs/${product.foto || 'placeholder.jpg'}`,
    alt: product.producto || 'Imagen no disponible',
  };

  const imagesRaw: ProductImage[] = (product.fotos || []).map((f: any) => {
    const baseName = f.foto && f.foto.trim() ? f.foto : 'placeholder.jpg';
    return {
      src: `/images/productos/thumbs/${baseName}`,
      thumb: `/images/productos/thumbs/${baseName}`,
      alt: product.producto,
    };
  });
  imagesRaw.unshift(mainImage);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <main className="p-8 md:p-12 bg-gray-50">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <section id="gallery" className="grid grid-cols-1 gap-4">
            <a
              href={mainImage.src}
              data-pswp-width="1200"
              data-pswp-height="1200"
              data-index="0"
              className="relative w-full aspect-square overflow-hidden block transition-all duration-300 hover:scale-105"
            >
              <ImageWithFallback
                src={mainImage.thumb}
                alt={mainImage.alt}
                className="absolute top-0 left-0 w-full h-full object-cover rounded cursor-pointer"
                loading="lazy"
              />
            </a>
            <div
              className={
                `grid gap-4 ${
                  imagesRaw.length <= 2 ? 'grid-cols-2'
                  : imagesRaw.length <= 3 ? 'grid-cols-3'
                  : 'grid-cols-4'
                }`
              }
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

          <section>
            <ProductInfo product={product} />
          </section>
        </div>
      </main>

      <section className="p-8 md:p-16 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <ProductTabs product={product} />
        </div>
      </section>

      <PhotoSwipeInitializer />
    </>
  );
}
