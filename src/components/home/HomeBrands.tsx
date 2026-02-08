import {prisma} from '@/lib/prisma'
import BrandMarquee from '@/components/home/BrandMarquee'

export default async function HomeBrands() {
  const brands = await prisma.cfgMarcas.findMany({
    where: { activo: true },
    orderBy: { marca: 'asc' },
    select: { id: true, marca: true, foto: true },
  })
  return <BrandMarquee brands={brands} />
}
