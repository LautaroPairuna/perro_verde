// src/utils/urlUtils.ts

/**
 * Interfaz para definir la forma de los filtros utilizados en las URLs.
 */
export interface Filters {
  page: number;
  keywords: string;
  marca_slug: string;
  categoria_slug: string;
  producto_slug: string;
}

/**
 * Parsea los segmentos de la URL y extrae los filtros.
 * Se ignoran segmentos relacionados a "estado".
 */
export function parseUrlSegments(pathname: string): Filters {
  const filters: Filters = {
    page: 1,
    keywords: '',
    marca_slug: '',
    categoria_slug: '',
    producto_slug: '',
  };

  // Eliminar "/catalogo/" inicial y split
  const pathSegments = pathname.replace(/^\/catalogo\/?/, '').split('/').filter(Boolean);

  pathSegments.forEach(segment => {
    if (!segment) return; // si algo es undefined
    const [key, ...rest] = segment.split('-');
    if (!key) return; // nada que hacer
    const slug = rest.join('-'); // "royal-canin", "alimentos-para-perros", etc.

    switch (key) {
      case 'pagina': {
        const num = parseInt(slug, 10);
        if (!isNaN(num) && num > 0) filters.page = num;
        break;
      }
      case 'keys': {
        // keys-samsung-a10 => "samsung-a10"
        filters.keywords = decodeURIComponent(slug).replace(/-/g, ' ');
        break;
      }
      case 'marca': {
        filters.marca_slug = decodeURIComponent(slug);
        break;
      }
      case 'categoria': {
        filters.categoria_slug = decodeURIComponent(slug);
        break;
      }
      case 'producto': {
        filters.producto_slug = decodeURIComponent(slug);
        break;
      }
      default:
        console.warn(`Segmento desconocido: ${segment}`);
    }
  });

  return filters;
}

/**
 * Construye una URL de paginación basada en los filtros activos y la página deseada.
 */
export function buildCatalogPath(filters: Filters, pageOverride?: number): string {
  let href = '/catalogo';

  if (filters.keywords) {
    href += `/keys-${encodeURIComponent(filters.keywords.trim().replace(/\s+/g, '-'))}`;
  }
  if (filters.marca_slug) {
    href += `/marca-${encodeURIComponent(filters.marca_slug)}`;
  }
  if (filters.categoria_slug) {
    href += `/categoria-${encodeURIComponent(filters.categoria_slug)}`;
  }
  if (filters.producto_slug) {
    href += `/producto-${encodeURIComponent(filters.producto_slug)}`;
  }

  const raw = typeof pageOverride === 'number' ? pageOverride : filters.page;
  const page = Number.isFinite(raw) ? Number(raw) : 1;

  if (page > 1) {
    href += `/pagina-${page}`;
  }

  return href;
}

/** (Opcional pero recomendado) reutilizar la misma lógica en la paginación */
export function buildPaginationUrl(filters: Filters, page: number): string {
  if (page < 1) {
    console.error('El número de página debe ser un entero positivo. Recibido:', page);
    page = 1;
  }
  return buildCatalogPath(filters, page); // omite /pagina-1
}
