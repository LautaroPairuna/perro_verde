
import { NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'
import { startOfWeek, endOfWeek } from 'date-fns'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const now = new Date()
    // Semana comienza Lunes (1)
    const start = startOfWeek(now, { weekStartsOn: 1 })
    const end = endOfWeek(now, { weekStartsOn: 1 })

    // Obtener estados que NO son de cancelación (consideramos ganancias todo lo que no esté cancelado/rechazado)
    // Ojo: 'pendiente' también suma? Normalmente ganancias = facturado real o proyectado.
    // El usuario dijo: "tome en cuenta los pedidos con ciertos estados".
    // Asumiremos: Approved, Pagado, Enviado, Entregado. 
    // Pendiente NO debería sumar a ganancias reales todavía, pero quizás a "proyección".
    // Voy a filtrar por `es_final: true` AND `es_cancel: false` + 'approved'/'pagado'/'enviado'.
    // Mejor lógica: Traer todos los que NO sean 'pendiente' ni 'cancelado'/'rejected'.
    
    // Vamos a buscar los estados que consideraremos "Venta confirmada".
    // Usaré los que tengan (es_cancel: false) y excluyendo 'pendiente' explícitamente si se desea.
    // Para simplificar, traeré la configuración y decidiré.
    
    // Estrategia segura: Sumar todo lo que no sea 'rejected' ni 'cancelado'.
    // Incluso 'pendiente' es una "orden abierta", pero usualmente "ganancia" implica dinero seguro.
    // Excluiré 'pendiente' también.
    
    const estadosInvalidos = ['pendiente', 'rejected', 'cancelado', 'rechazado']
    
    // Alternativa: Buscar en DB los que tienen es_cancel=true
    const estadosCancelacion = await prisma.cfgEstadoPedido.findMany({
      where: { es_cancel: true },
      select: { id: true }
    })
    const idsCancel = estadosCancelacion.map(e => e.id)
    
    // Filtro final: Ni cancelados, ni pendiente.
    const notIn = [...idsCancel, 'pendiente']

    const result = await prisma.pedidos.aggregate({
      _sum: { total: true },
      _count: { id: true },
      where: {
        createdAt: { gte: start, lte: end },
        estado: { notIn: notIn }
      }
    })

    return NextResponse.json({
      total: result._sum.total ?? 0,
      count: result._count.id ?? 0,
      period: { start, end }
    })
  } catch (error: any) {
    console.error('Error calculating earnings:', error)
    return NextResponse.json({ error: error.message || 'Error al calcular ganancias' }, { status: 500 })
  }
}
