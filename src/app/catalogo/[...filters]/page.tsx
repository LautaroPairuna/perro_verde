// src/app/catalogo/[...filters]/page.tsx

import AdvancedSearchForm from '@/components/catalogo/AdvancedSearchForm'
import ProductCard, { Product as ProductCardType } from '@/components/catalogo/ProductCard'
import Pagination from '@/components/catalogo/Pagination'
import NoProducts from '@/components/catalogo/NoProducts'
import { getFilteredProducts, getFiltersData } from '@/utils/fetchData'
import { parseUrlSegments } from '@/utils/urlUtils'
import slugify from '@/utils/slugify'
import type { Filters as CatalogFilters, FilteredProductsResult } from '@/utils/fetchData'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 60  // Regenera cada 60s (ISR)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ filters?: string[] }>
}): Promise<Metadata> {
  const { filters = [] } = await params
  const title =
    filters.length > 0
      ? `Catálogo: ${filters.map(s => decodeURIComponent(s)).join(' / ')}`
      : 'Catálogo de Productos'
  return {
    title,
    description: 'Explora nuestra amplia gama de productos disponibles para ti.',
  }
}

export default async function CatalogListing({
  params,
}: {
  params: Promise<{ filters?: string[] }>
}) {
  // 1) Await de params (Next.js 15: viene como Promise)
  const { filters = [] } = await params
  const slugArray = Array.isArray(filters) ? filters : []

  // 2) Reconstruir ruta para parsear segmentos
  const pathname =
    slugArray.length > 0 ? `/catalogo/${slugArray.join('/')}` : '/catalogo'

  // 3) Extraer y normalizar filtros
  const filtersFromUrl = parseUrlSegments(pathname) as CatalogFilters
  const pageNum = Number(filtersFromUrl.page)
  filtersFromUrl.page =
    Number.isInteger(pageNum) && pageNum > 0 ? pageNum : 1

  // 4) Cargar datos de filtros (marcas y rubros)
  let marcas, rubros
  try {
    ;({ marcas, rubros } = await getFiltersData())
  } catch (err: unknown) {
    console.error('Error cargando filtros:', err)
    return (
      <section className="py-20 text-center">
        <p className="text-red-600">
          Error cargando filtros. Intenta nuevamente más tarde.
        </p>
      </section>
    )
  }

  // 5) Mapear slugs a IDs
  const mappedFilters: CatalogFilters = {
    ...filtersFromUrl,
    marca_id: undefined,
    categoria_id: undefined,
  }
  if (filtersFromUrl.marca_slug) {
    const m = marcas.find((m) => slugify(m.marca) === filtersFromUrl.marca_slug)
    if (m) mappedFilters.marca_id = m.id
  }
  if (filtersFromUrl.categoria_slug) {
    const r = rubros.find(
      (r) => slugify(r.rubro) === filtersFromUrl.categoria_slug
    )
    if (r) mappedFilters.categoria_id = r.id
  }

  // 6) Cargar productos filtrados
  const itemsPerPage = 4
  let rawProducts: NonNullable<FilteredProductsResult['products']>, totalPages: number
  try {
    const result: FilteredProductsResult = await getFilteredProducts(
      mappedFilters,
      itemsPerPage
    )
    rawProducts = result.products
    totalPages = result.totalPages
  } catch (err: unknown) {
    console.error('Error cargando productos:', err)
    return (
      <section className="py-20 text-center">
        <p className="text-red-600">
          Error cargando productos. Intenta nuevamente más tarde.
        </p>
      </section>
    )
  }

  // 7) Adaptar al tipo de ProductCard
  const products: ProductCardType[] = rawProducts.map((p) => ({
    id: p.id,
    producto: p.producto,
    descripcion: p.descripcion ?? undefined,
    precio: Number(p.precio),
    foto: p.foto ?? undefined,
    visitas: p.visitas,
    rubro: p.rubro,
  }))

  // 8) Renderizado con diseño mejorado
  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Título */}
        <h1 className="text-4xl font-extrabold text-green-800 text-center">
          Catálogo de Productos
        </h1>

        {/* Buscador Avanzado */}
        <div className="flex justify-center align-center text-center">
          <AdvancedSearchForm
            marcas={marcas.map((m) => ({
              id: m.id,
              name: m.marca,
              slug: slugify(m.marca),
            }))}
            rubros={rubros.map((r) => ({
              id: r.id,
              name: r.rubro,
              slug: slugify(r.rubro),
            }))}
            marca_slug={filtersFromUrl.marca_slug}
            categoria_slug={filtersFromUrl.categoria_slug}
            keywords={filtersFromUrl.keywords}
          />
        </div>

        {/* Lista de Productos */}
        {products.length === 0 ? (
          <NoProducts message="No se encontraron productos que coincidan con los filtros seleccionados." />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-10">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Paginación */}
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
