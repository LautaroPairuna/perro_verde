import { Prisma } from '@prisma/client';
import { cache } from 'react';
import {prisma} from '@/lib/prisma';

/**
 * Filtro de búsqueda para productos
 */
export interface Filters {
  page: number;
  keywords: string;
  marca_slug: string;
  categoria_slug: string;
  producto_slug: string;
  marca_id?: number;
  categoria_id?: number;
}

/**
 * Campos comunes a incluir en listados de productos
 */
const PRODUCT_INCLUDES = {
  marca:           { select: { id: true, marca: true } },
  rubro:           { select: { id: true, rubro: true } },
  fotos:           true,
  versiones:       true,
  especificaciones:true,
} as const;

/**
 * Tipo resultante de los productos en listados filtrados
 */
export type ProductSummary = Prisma.ProductosGetPayload<{ include: typeof PRODUCT_INCLUDES }>;

/**
 * Estructura de retorno de getFilteredProducts
 */
export interface FilteredProductsResult {
  products: ProductSummary[];
  totalProducts: number;
  totalPages: number;
}

/**
 * Serializa eliminando objetos especiales (como Decimal)
 */
function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

/**
 * Obtiene datos de filtros (marcas y rubros activos)
 * Cacheado por request para evitar doble query en generateMetadata + Page
 */
export const getFiltersData = cache(async (): Promise<{
  marcas: { id: number; marca: string }[];
  rubros: { id: number; rubro: string }[];
}> => {
  const [marcas, rubros] = await Promise.all([
    prisma.cfgMarcas.findMany({
      where: { activo: true },
      select: { id: true, marca: true },
    }),
    prisma.cfgRubros.findMany({
      where: { activo: true },
      select: { id: true, rubro: true },
    }),
  ]);
  return { marcas, rubros };
});

/**
 * Obtiene productos filtrados con paginación
 * Cacheado por request
 */
export const getFilteredProducts = cache(async (
  filters: Filters,
  itemsPerPage: number
): Promise<FilteredProductsResult> => {
  const {
    page = 1,
    keywords = '',
    marca_id,
    categoria_id,
  } = filters;
  const skip = (page - 1) * itemsPerPage;

  const where: Prisma.ProductosWhereInput = { activo: true };

  if (keywords.trim()) {
    where.AND = keywords
      .toLowerCase()
      .split(/\s+/)
      .map(token => ({
        OR: [
          { producto:    { contains: token } },
          { descripcion: { contains: token } },
        ],
      }));
  }

  if (marca_id)     where.marca_id = marca_id;
  if (categoria_id) where.rubro_id = categoria_id;

  const [totalProducts, rows] = await prisma.$transaction([
    prisma.productos.count({ where }),
    prisma.productos.findMany({
      where,
      skip,
      take: itemsPerPage,
      include: PRODUCT_INCLUDES,
    }),
  ]);

  const products = serialize(rows);
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return { products, totalProducts, totalPages };
});

/**
 * Campos a incluir en detalle de producto (extiende PRODUCT_INCLUDES)
 */
const PRODUCT_DETAIL_INCLUDES = {
  ...PRODUCT_INCLUDES,
  moneda: { select: { id: true, moneda: true, moneda_des: true } },
} as const;

/**
 * Tipo de detalle completo de un producto
 */
export type ProductDetail = Prisma.ProductosGetPayload<{ include: typeof PRODUCT_DETAIL_INCLUDES }>;

/**
 * Incrementa contador de visitas (Fire & Forget idealmente)
 */
export async function incrementProductVisits(productId: number) {
  try {
    await prisma.productos.update({
      where: { id: productId },
      data:  { visitas: { increment: 1 } },
    });
  } catch (error) {
    console.error(`Error incrementando visitas para producto ${productId}:`, error);
  }
}

/**
 * Obtiene un único producto (SOLO LECTURA)
 * Cacheado por request
 */
export const getSingleProduct = cache(async (
  productId: number
): Promise<ProductDetail> => {
  const product = await prisma.productos.findUnique({
    where: { id: productId, activo: true },
    include: PRODUCT_DETAIL_INCLUDES,
  });

  if (!product) {
    throw new Error(`Producto con ID ${productId} no encontrado.`);
  }

  return serialize(product);
});
