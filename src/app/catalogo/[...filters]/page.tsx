// app/catalogo/[...filters]/page.tsx
import Head from 'next/head';
import AdvancedSearchForm from '@/components/catalogo/AdvancedSearchForm';
import ProductCard from '@/components/catalogo/ProductCard';
import Pagination from '@/components/catalogo/Pagination';
import NoProducts from '@/components/catalogo/NoProducts';
import { getFilteredProducts, getFiltersData } from '@/utils/fetchData';
import { parseUrlSegments } from '@/utils/urlUtils';
import slugify from '@/utils/slugify';

interface PageProps {
  params: { filters?: string[] };
}

// Filtros con ID opcional para marca y categoría
interface Filters {
  page: number;
  keywords: string;
  marca_slug: string;
  categoria_slug: string;
  producto_slug: string;
  marca_id?: number;
  categoria_id?: number;
}

export default async function CatalogListing({ params }: PageProps) {
  // Evitamos el error "Route used params.filters. `params` should be awaited"
  const safeParams = await Promise.resolve(params);
  const slugArray = safeParams.filters || [];

  // Reconstruimos el pathname y parseamos
  const pathname = '/catalogo/' + slugArray.join('/');
  const filtersFromUrl = parseUrlSegments(pathname) as Filters;
  filtersFromUrl.page = filtersFromUrl.page || 1;

  const itemsPerPage = 4;

  // Obtener marcas y rubros
  const { marcas, rubros } = await getFiltersData();

  // Mapeo final
  const mappedFilters: Filters = {
    ...filtersFromUrl,
    marca_id: undefined,
    categoria_id: undefined,
  };

  // Buscar la marca en base al slug
  if (filtersFromUrl.marca_slug) {
    const foundMarca = marcas.find((m) => slugify(m.marca) === filtersFromUrl.marca_slug);
    if (foundMarca) mappedFilters.marca_id = foundMarca.id;
  }

  // Buscar la categoría en base al slug
  if (filtersFromUrl.categoria_slug) {
    const foundRubro = rubros.find((r) => slugify(r.rubro) === filtersFromUrl.categoria_slug);
    if (foundRubro) mappedFilters.categoria_id = foundRubro.id;
  }

  // Filtrar productos con skip/take
  const { products, totalPages } = await getFilteredProducts(mappedFilters, itemsPerPage);

  const pageTitle = 'Catálogo de Productos';
  const pageDescription = 'Explora nuestra amplia gama de productos disponibles para ti.';

  // Para AdvancedSearchForm
  const mappedMarcas = marcas.map((m) => ({
    id: m.id,
    name: m.marca,
    slug: slugify(m.marca),
  }));
  const mappedRubros = rubros.map((r) => ({
    id: r.id,
    name: r.rubro,
    slug: slugify(r.rubro),
  }));

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <section className="p-10 text-center bg-green-50">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800">Catálogo de Productos</h1>

          <AdvancedSearchForm
            marcas={mappedMarcas}
            rubros={mappedRubros}
            marca_slug={filtersFromUrl.marca_slug}
            categoria_slug={filtersFromUrl.categoria_slug}
            keywords={filtersFromUrl.keywords}
          />

          {products.length === 0 ? (
            <NoProducts message="No se encontraron productos que coincidan con los filtros seleccionados." />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={mappedFilters.page}
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
