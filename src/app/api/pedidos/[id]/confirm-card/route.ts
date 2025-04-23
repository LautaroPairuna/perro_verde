// src/app/api/pedidos/[id]/confirm-card/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PedidoService } from '../../../../../services/PedidoService'

export const runtime = 'nodejs'

// 1) Schema Zod para validar el body
const schema = z.object({
  cardToken: z.string().nonempty(),
})

export async function POST(
  request: NextRequest,                         // ← usa NextRequest
  { params }: { params: { id: string } }        // ← contexto de Next, sin Promise
): Promise<NextResponse> {
  const { id } = params
  const orderId = Number(id)

  // 2) Valida el ID
  if (Number.isNaN(orderId)) {
    return NextResponse.json(
      { success: false, message: 'ID de pedido inválido' },
      { status: 400 },
    )
  }

  // 3) Parseo y validación del JSON
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Cuerpo JSON inválido o vacío' },
      { status: 400 },
    )
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten() },
      { status: 422 },
    )
  }
  const { cardToken } = parsed.data

  // 4) Llama al servicio
  try {
    await new PedidoService().confirmCard(orderId, cardToken)
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Error en confirm-card:', err)
    const message = err instanceof Error
      ? err.message
      : 'Error interno desconocido'
    return NextResponse.json(
      { success: false, message },
      { status: 400 },
    )
  }
}
