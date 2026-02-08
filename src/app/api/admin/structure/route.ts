/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'

type PrismaModel = { findMany: (args?: any) => Promise<any[]> }

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
  data: any[]
}

export async function GET() {
  try {
    const tableInfo: TableStructure[] = []

    for (const tableName of Object.keys(models)) {
      const data = await models[tableName].findMany()
      tableInfo.push({ tableName, data })
    }

    return NextResponse.json(tableInfo)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Error fetching database structure' },
      { status: 500 }
    )
  }
}
