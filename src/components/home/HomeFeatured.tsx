import {prisma} from '@/lib/prisma'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import type { FeaturedProduct } from '@/components/home/HomeClientComponents'

export default async function HomeFeatured() {
  const rawFeatured = await prisma.productos.findMany({
    where: { destacado: true, activo: true },
    take: 4,
    include: {
      rubro: { select: { id: true, rubro: true } },
      marca: { select: { id: true, marca: true } },
    },
  })
  const products = rawFeatured.map((p: any) => ({
    ...p,
    precio: Number(p.precio),
  })) as FeaturedProduct[]
  return <FeaturedProducts products={products} />
}
