// src/app/catalogo/[...filters]/page.tsx

import Head from 'next/head';
import AdvancedSearchForm from '@/components/catalogo/AdvancedSearchForm';
import ProductCard, { Product as ProductCardType } from '@/components/catalogo/ProductCard';
import Pagination from '@/components/catalogo/Pagination';
import NoProducts from '@/components/catalogo/NoProducts';
import { getFilteredProducts, getFiltersData } from '@/utils/fetchData';
import { parseUrlSegments } from '@/utils/urlUtils';
import slugify from '@/utils/slugify';
import type { Filters as CatalogFilters, FilteredProductsResult } from '@/utils/fetchData';

export const revalidate = 60; // ISR cada 60s

export default async function CatalogListing(props: any) {
  // Next.js App Router puede tipar `props.params` como Promise<...>
  const { filters } = (await props.params) as { filters?: string[] };

  // 1. Garantizar array de segmentos
  const slugArray: string[] = Array.isArray(filters) ? filters : [];

  // 2. Reconstruir la ruta para parseo
  const pathname = slugArray.length > 0
    ? `/catalogo/${slugArray.join('/')}`
    : '/catalogo';

  // 3. Extraer filtros y normalizar página
  const filtersFromUrl = parseUrlSegments(pathname) as CatalogFilters;
  const pageNum = Number(filtersFromUrl.page);
  filtersFromUrl.page = Number.isInteger(pageNum) && pageNum > 0 ? pageNum : 1;

  // 4. Cargar datos de filtros (marcas/rubros)
  let marcas, rubros;
  try {
    ({ marcas, rubros } = await getFiltersData());
  } catch (err: unknown) {
    console.error('Error cargando filtros:', err);
    return (
      <section className="p-10 text-center">
        <p className="text-red-600">Error cargando filtros. Intenta nuevamente más tarde.</p>
      </section>
    );
  }

  // 5. Mapear slugs a IDs
  const mappedFilters: CatalogFilters = {
    ...filtersFromUrl,
    marca_id: undefined,
    categoria_id: undefined,
  };
  if (filtersFromUrl.marca_slug) {
    const m = marcas.find(m => slugify(m.marca) === filtersFromUrl.marca_slug);
    if (m) mappedFilters.marca_id = m.id;
  }
  if (filtersFromUrl.categoria_slug) {
    const r = rubros.find(r => slugify(r.rubro) === filtersFromUrl.categoria_slug);
    if (r) mappedFilters.categoria_id = r.id;
  }

  // 6. Cargar productos filtrados
  const itemsPerPage = 4;
  let rawProducts, totalPages;
  try {
    const result: FilteredProductsResult = await getFilteredProducts(mappedFilters, itemsPerPage);
    rawProducts = result.products;
    totalPages = result.totalPages;
  } catch (err: unknown) {
    console.error('Error cargando productos:', err);
    return (
      <section className="p-10 text-center">
        <p className="text-red-600">Error cargando productos. Intenta nuevamente más tarde.</p>
      </section>
    );
  }

  // 7. Adaptar al tipo de ProductCard
  const products: ProductCardType[] = rawProducts.map(p => ({
    id: p.id,
    producto: p.producto,
    descripcion: p.descripcion ?? undefined,
    precio: Number(p.precio),
    foto: p.foto ?? undefined,
    visitas: p.visitas,
    rubro: p.rubro,
  }));

  return (
    <>
      <Head>
        <title>Catálogo de Productos</title>
        <meta
          name="description"
          content="Explora nuestra amplia gama de productos disponibles para ti."
        />
      </Head>

      <section className="p-10 text-center bg-green-50">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800">Catálogo de Productos</h1>

          <AdvancedSearchForm
            marcas={marcas.map(m => ({ id: m.id, name: m.marca, slug: slugify(m.marca) }))}
            rubros={rubros.map(r => ({ id: r.id, name: r.rubro, slug: slugify(r.rubro) }))}
            marca_slug={filtersFromUrl.marca_slug}
            categoria_slug={filtersFromUrl.categoria_slug}
            keywords={filtersFromUrl.keywords}
          />

          {products.length === 0 ? (
            <NoProducts message="No se encontraron productos que coincidan con los filtros seleccionados." />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={filtersFromUrl.page}
                  filters={mappedFilters}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
