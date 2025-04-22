// src/utils/fetchData.ts
import { PrismaClient, Prisma } from '@prisma/client';
import slugify from './slugify';

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

export async function getFilteredProducts(filters: Filters, itemsPerPage: number) {
  const where: Prisma.ProductosWhereInput = {
    activo: true,
  };

  if (filters.keywords) {
    const kw = filters.keywords.trim().toLowerCase();
    if (kw.length > 0) {
      const tokens = kw.split(/\s+/);
      where.AND = tokens.map((token: string) => ({
        OR: [
          { producto: { contains: token } },
          { descripcion: { contains: token } },
        ],
      }));
    }
  }

  if (filters.marca_id) {
    where.marca_id = filters.marca_id;
  }
  if (filters.categoria_id) {
    where.rubro_id = filters.categoria_id;
  }

  console.log('getFilteredProducts - Where:', where);

  const [count, rows] = await Promise.all([
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

  return {
    products: JSON.parse(JSON.stringify(rows)),
    totalProducts: count,
    totalPages: Math.ceil(count / itemsPerPage),
  };
}

export async function getSingleProduct(productId: number) {
  await prisma.productos.update({
    where: { id: productId },
    data: { visitas: { increment: 1 } },
  });

  const product = await prisma.productos.findUnique({
    where: { id: productId, activo: true },
    include: {
      marca: { select: { id: true, marca: true } },
      rubro: { select: { id: true, rubro: true } },
      fotos: true,
      versiones: true,
      especificaciones: true,
      moneda: { select: { id: true, moneda: true, moneda_des: true } },
    },
  });

  if (!product) {
    throw new Error(`Producto con ID ${productId} no encontrado.`);
  }
  return JSON.parse(JSON.stringify(product));
}
