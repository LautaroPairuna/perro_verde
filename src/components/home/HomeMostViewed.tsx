import {prisma} from '@/lib/prisma'
import MostViewedProducts from '@/components/home/MostViewedProducts'

export default async function HomeMostViewed() {
  const rawMostViewed = await prisma.productos.findMany({
    where: { activo: true },
    orderBy: { visitas: 'desc' },
    take: 4,
    select: {
      id: true, producto: true, descripcion: true,
      precio: true, foto: true, visitas: true,
      rubro: { select: { id: true, rubro: true } },
      marca: { select: { id: true, marca: true } },
    },
  })
  const products = rawMostViewed.map(p => ({
    ...p,
    precio: Number(p.precio),
  }))
  return <MostViewedProducts products={products} />
}
