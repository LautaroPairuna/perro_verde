import {prisma} from '@/lib/prisma'
import RubrosGrid from '@/components/home/RubrosGrid'

export default async function HomeRubros() {
  const rubros = await prisma.cfgRubros.findMany({
    where: { activo: true },
    select: { id: true, rubro: true, foto: true },
    orderBy: { rubro: 'asc' },
  })
  return <RubrosGrid rubros={rubros} />
}
