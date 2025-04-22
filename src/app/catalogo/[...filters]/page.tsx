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

export default async function CatalogListing({
  params,
}: {
  params: { filters: string[] };
}) {
  const slugArray = params.filters;            // ya es string[]
  const pathname = '/catalogo/' + slugArray.join('/');
  const filtersFromUrl = parseUrlSegments(pathname) as CatalogFilters;
  filtersFromUrl.page ||= 1;

  const itemsPerPage = 4;
  const { marcas, rubros } = await getFiltersData();

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

  const { products: rawProducts, totalPages }: FilteredProductsResult =
    await getFilteredProducts(mappedFilters, itemsPerPage);

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
        <meta name="description" content="Explora nuestra amplia gama de productos disponibles para ti." />
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
