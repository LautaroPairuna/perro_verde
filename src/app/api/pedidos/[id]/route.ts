// src/app/api/pedidos/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export const runtime = 'nodejs'

export async function GET(
  _req: Request,
  context: unknown
) {
  // Extraemos solo lo que necesitamos de context
  const { params } = context as { params: { id: string } }
  const pedidoId = Number(params.id)
  if (isNaN(pedidoId)) {
    return NextResponse.json({ error: 'invalid_id' }, { status: 400 })
  }

  try {
    const pedido = await prisma.pedidos.findUnique({
      where: { id: pedidoId },
      select: {
        id: true,
        estado: true,
        metodo_pago: true,
        total: true,
        comprador_nombre: true,
        comprador_email: true,
        transferencia_ref: true,
        mp_payment_id: true,
      },
    })
    if (!pedido) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }
    return NextResponse.json(pedido, { status: 200 })
  } catch (err: unknown) {
    console.error('Error fetching pedido:', err)
    return NextResponse.json({ error: 'internal_error' }, { status: 500 })
  }
}
