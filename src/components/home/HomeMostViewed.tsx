import {prisma} from '@/lib/prisma'
import MostViewedProducts from '@/components/home/MostViewedProducts'
import type { ViewedProduct } from '@/components/home/HomeClientComponents'

export default async function HomeMostViewed() {
  const rawMostViewed = await prisma.productos.findMany({
    where: { activo: true },
    orderBy: { visitas: 'desc' },
    take: 4,
    include: {
      rubro: { select: { id: true, rubro: true } },
      marca: { select: { id: true, marca: true } },
    },
  })
  const products = rawMostViewed.map((p: any) => ({
    ...p,
    precio: Number(p.precio),
  })) as ViewedProduct[]
  return <MostViewedProducts products={products} />
}
