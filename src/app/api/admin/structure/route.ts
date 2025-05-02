import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type PrismaModel = { findMany: (args?: any) => Promise<any[]> }

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const models: Record<string, PrismaModel> = {
  CfgMarcas: prisma.cfgMarcas,
  CfgRubros: prisma.cfgRubros,
  CfgFormasPagos: prisma.cfgFormasPagos,
  CfgMonedas: prisma.cfgMonedas,
  CfgSlider: prisma.cfgSlider,
  Productos: prisma.productos,
  ProductoFotos: prisma.productoFotos,
  ProductoVersiones: prisma.productoVersiones,
  ProductoEspecificaciones: prisma.productoEspecificaciones,
  Pedidos: prisma.pedidos,
}

interface TableStructure {
  tableName: string
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  data: any[]
}

export async function GET(): Promise<Response> {
  try {
    const tableInfo: TableStructure[] = []

    for (const tableName of Object.keys(models)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await models[tableName].findMany()
      tableInfo.push({ tableName, data })
    }

    return new Response(JSON.stringify(tableInfo), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(
      JSON.stringify({ error: 'Error fetching database structure' }),
      { status: 500 },
    )
  }
}
