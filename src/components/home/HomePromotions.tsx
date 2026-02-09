import {prisma} from '@/lib/prisma'
import PromotionsSlider from '@/components/home/PromotionsSlider'

export default async function HomePromotions() {
  const slidersData = await prisma.cfgSlider.findMany({
    where: { activo: true },
    orderBy: { orden: 'asc' },
    select: { foto: true },
  })
  const images = slidersData.map(s => `/images/slider/${s.foto}`)
  return <PromotionsSlider images={images} id="promociones-slider" />
}
