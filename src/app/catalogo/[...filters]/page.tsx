// src/app/catalogo/[...filters]/page.tsx
import AdvancedSearchForm from '@/components/catalogo/AdvancedSearchForm'
import ProductCard, { Product as ProductCardType } from '@/components/catalogo/ProductCard'
import Pagination from '@/components/catalogo/Pagination'
import NoProducts from '@/components/catalogo/NoProducts'
import { getFilteredProducts, getFiltersData } from '@/utils/fetchData'
import { parseUrlSegments, buildCatalogPath } from '@/utils/urlUtils'
import slugify from '@/utils/slugify'
import type { Filters as CatalogFilters, FilteredProductsResult } from '@/utils/fetchData'
import type { Metadata } from 'next'

// ✅ Cache ISR por path de filtros
export const revalidate = 300 // 5 min

// Helper JSON-LD inline
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

const prodUrl = (id: number | string) => `/catalogo/detalle/${id}` // ⚠️ cambia si tu URL real usa slug
const prodImg = (file?: string | null) =>
  file ? `/images/productos/${file}` : '/images/placeholder-producto.jpg'


export async function generateMetadata({
  params,
}: {
  params: Promise<{ filters?: string[] }>
}): Promise<Metadata> {
  const { filters = [] } = await params;

  const pathname = filters.length ? `/catalogo/${filters.join('/')}` : '/catalogo';
  const f = parseUrlSegments(pathname) as CatalogFilters;

  // Page #
  const n = Number(f.page);
  const page = Number.isInteger(n) && n > 1 ? n : undefined;

  // Resolver nombres legibles
  let brandName: string | undefined;
  let categoryName: string | undefined;
  try {
    const { marcas, rubros } = await getFiltersData();
    if (f.marca_slug) {
      const m = marcas.find(x => slugify(x.marca) === f.marca_slug);
      brandName = m?.marca;
    }
    if (f.categoria_slug) {
      const r = rubros.find(x => slugify(x.rubro) === f.categoria_slug);
      categoryName = r?.rubro;
    }
  } catch {/* opcional */}

  const kw = f.keywords?.trim();

  // Title legible
  const parts = [categoryName, brandName, kw ? `“${kw}”` : undefined].filter(Boolean) as string[];
  let base = parts.length ? parts.join(' · ') : 'Catálogo de Productos';
  if (page) base += ` — Página ${page}`;
  const title = base.length > 60 ? base.slice(0, 59).trimEnd() + '…' : base;

  // Canonical sin page/1
  const canonical = buildCatalogPath(f, page ?? 1);

  // Description contextual
  const descParts = [
    categoryName ? `Productos de ${categoryName}` : 'Explorá nuestro catálogo',
    brandName ? `de ${brandName}` : undefined,
    kw ? `para “${kw}”` : undefined,
    'en Salta.',
  ].filter(Boolean);
  const description = (descParts.join(' ') || 'Explorá nuestro catálogo de productos para tu mascota en Salta.').slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical },
  };
}

export default async function CatalogListing({
  params,
}: {
  params: Promise<{ filters?: string[] }>
}) {
  // 1) Params
  const { filters = [] } = await params
  const slugArray = Array.isArray(filters) ? filters : []

  // 2) Pathname para parsear segmentos
  const pathname = slugArray.length > 0 ? `/catalogo/${slugArray.join('/')}` : '/catalogo'

  // 3) Extraer filtros
  const filtersFromUrl = parseUrlSegments(pathname) as CatalogFilters
  const pageNum = Number(filtersFromUrl.page)
  filtersFromUrl.page = Number.isInteger(pageNum) && pageNum > 0 ? pageNum : 1

  // 4) Cargar data de filtros
  let marcas, rubros
  try {
    ;({ marcas, rubros } = await getFiltersData())
  } catch (err: unknown) {
    console.error('Error cargando filtros:', err)
    return (
      <section className="py-20 text-center">
        <p className="text-red-600">Error cargando filtros. Intenta nuevamente más tarde.</p>
      </section>
    )
  }

  // 5) Mapear slugs → IDs
  const mappedFilters: CatalogFilters = {
    ...filtersFromUrl,
    marca_id: undefined,
    categoria_id: undefined,
  }
  if (filtersFromUrl.marca_slug) {
    const m = marcas.find(m => slugify(m.marca) === filtersFromUrl.marca_slug)
    if (m) mappedFilters.marca_id = m.id
  }
  if (filtersFromUrl.categoria_slug) {
    const r = rubros.find(r => slugify(r.rubro) === filtersFromUrl.categoria_slug)
    if (r) mappedFilters.categoria_id = r.id
  }

  // 6) Productos filtrados
  const itemsPerPage = 12
  let rawProducts: NonNullable<FilteredProductsResult['products']>, totalPages: number
  try {
    const result: FilteredProductsResult = await getFilteredProducts(mappedFilters, itemsPerPage)
    rawProducts = result.products
    totalPages = result.totalPages
  } catch (err: unknown) {
    console.error('Error cargando productos:', err)
    return (
      <section className="py-20 text-center">
        <p className="text-red-600">Error cargando productos. Intenta nuevamente más tarde.</p>
      </section>
    )
  }

  // 7) Adaptar al tipo de Card
  const products: ProductCardType[] = rawProducts.map(p => ({
    id: p.id,
    producto: p.producto,
    descripcion: p.descripcion ?? undefined,
    precio: Number(p.precio),
    foto: p.foto ?? undefined,
    visitas: p.visitas,
    rubro: p.rubro,
  }))

  // 8) JSON-LD ItemList (listado)
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Catálogo de Productos',
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: prodUrl(p.id),
      item: {
        '@type': 'Product',
        name: p.producto,
        description: p.descripcion,
        image: prodImg(p.foto),
        sku: String(p.id),
        category: p.rubro?.rubro,
        // Sin offers por ahora
      },
    })),
  }

  // 9) Render
  return (
    <section className="bg-green-100 py-12">
      {/* JSON-LD */}
      <JsonLd data={itemListLd} />

      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-green-800 text-center mb-8">
          Catálogo de Productos
        </h1>

        <div className="flex justify-center mb-10">
          <AdvancedSearchForm
            marcas={marcas.map(m => ({ id: m.id, name: m.marca, slug: slugify(m.marca) }))}
            rubros={rubros.map(r => ({ id: r.id, name: r.rubro, slug: slugify(r.rubro) }))}
            marca_slug={filtersFromUrl.marca_slug}
            categoria_slug={filtersFromUrl.categoria_slug}
            keywords={filtersFromUrl.keywords}
          />
        </div>

        {products.length === 0 ? (
          <NoProducts message="No se encontraron productos que coincidan con los filtros seleccionados." />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-10">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  totalPages={totalPages}
                  currentPage={filtersFromUrl.page}
                  filters={mappedFilters}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
