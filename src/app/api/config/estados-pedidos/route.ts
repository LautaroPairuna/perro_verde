
import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const estados = await prisma.cfgEstadoPedido.findMany({
      where: { activo: true },
      orderBy: { orden: 'asc' }
    })
    return NextResponse.json(estados)
  } catch (error) {
    console.error('Error fetching estados pedidos:', error)
    return NextResponse.json({ error: 'Error al obtener estados' }, { status: 500 })
  }
}
