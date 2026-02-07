import prisma from '@/lib/prisma'
import FeaturedProducts from '@/components/home/FeaturedProducts'

export default async function HomeFeatured() {
  const rawFeatured = await prisma.productos.findMany({
    where: { destacado: true, activo: true },
    take: 4,
    select: {
      id: true, producto: true, descripcion: true,
      precio: true, foto: true,
      rubro: { select: { id: true, rubro: true } },
      marca: { select: { id: true, marca: true } },
    },
  })
  const products = rawFeatured.map(p => ({
    ...p,
    precio: Number(p.precio),
  }))
  return <FeaturedProducts products={products} />
}
