// src/utils/fetchData.ts
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export interface Filters {
  page: number;
  keywords: string;
  marca_slug: string;
  categoria_slug: string;
  producto_slug: string;
  marca_id?: number;
  categoria_id?: number;
}

// 1) Definimos el tipo del producto para el listado (getFilteredProducts)
export type ProductSummary = Prisma.ProductosGetPayload<{
  include: {
    marca: { select: { id: true; marca: true } };
    rubro: { select: { id: true; rubro: true } };
    fotos: true;
    versiones: true;
    especificaciones: true;
  };
}>;

// 2) Tipo de retorno para getFilteredProducts
export interface FilteredProductsResult {
  products: ProductSummary[];
  totalProducts: number;
  totalPages: number;
}

export async function getFiltersData(): Promise<{
  marcas: { id: number; marca: string }[];
  rubros: { id: number; rubro: string }[];
}> {
  const marcas = await prisma.cfgMarcas.findMany({
    where: { activo: true },
    select: { id: true, marca: true },
  });
  const rubros = await prisma.cfgRubros.findMany({
    where: { activo: true },
    select: { id: true, rubro: true },
  });
  return { marcas, rubros };
}

export async function getFilteredProducts(
  filters: Filters,
  itemsPerPage: number
): Promise<FilteredProductsResult> {
  const where: Prisma.ProductosWhereInput = { activo: true };

  if (filters.keywords) {
    const tokens = filters.keywords.trim().toLowerCase().split(/\s+/);
    if (tokens.length) {
      where.AND = tokens.map(token => ({
        OR: [
          { producto: { contains: token } },
          { descripcion: { contains: token } },
        ],
      }));
    }
  }

  if (filters.marca_id) where.marca_id = filters.marca_id;
  if (filters.categoria_id) where.rubro_id = filters.categoria_id;

  const [totalProducts, rows] = await Promise.all([
    prisma.productos.count({ where }),
    prisma.productos.findMany({
      where,
      skip: (filters.page - 1) * itemsPerPage,
      take: itemsPerPage,
      include: {
        marca: { select: { id: true, marca: true } },
        rubro: { select: { id: true, rubro: true } },
        fotos: true,
        versiones: true,
        especificaciones: true,
      },
    }),
  ]);

  // Convertimos a JSON para librarnos de los Decimals al serializar
  const products = JSON.parse(JSON.stringify(rows)) as ProductSummary[];

  return {
    products,
    totalProducts,
    totalPages: Math.ceil(totalProducts / itemsPerPage),
  };
}

// 3) Definimos el tipo para el detalle de producto (getSingleProduct)
export type ProductDetail = Prisma.ProductosGetPayload<{
  include: {
    marca: { select: { id: true; marca: true } };
    rubro: { select: { id: true; rubro: true } };
    moneda: { select: { id: true; moneda: true; moneda_des: true } };
    fotos: true;
    versiones: true;
    especificaciones: true;
  };
}>;

export async function getSingleProduct(
  productId: number
): Promise<ProductDetail> {
  await prisma.productos.update({
    where: { id: productId },
    data: { visitas: { increment: 1 } },
  });

  const product = await prisma.productos.findUnique({
    where: { id: productId, activo: true },
    include: {
      marca: { select: { id: true, marca: true } },
      rubro: { select: { id: true, rubro: true } },
      moneda: { select: { id: true, moneda: true, moneda_des: true } },
      fotos: true,
      versiones: true,
      especificaciones: true,
    },
  });

  if (!product) {
    throw new Error(`Producto con ID ${productId} no encontrado.`);
  }

  return JSON.parse(JSON.stringify(product)) as ProductDetail;
}
