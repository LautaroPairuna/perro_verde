// src/app/api/pedidos/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PedidoService } from '../../../services/PedidoService'

export const runtime = 'nodejs'

// 1) Definimos el esquema base y permitimos extra keys (p.ej. idempotencyKey)
const createPedidoSchema = z
  .object({
    datos: z.array(
      z.object({
        id:       z.coerce.number().int().positive(),
        name:     z.string(),
        price:    z.coerce.number().positive(),
        quantity: z.coerce.number().int().positive(),
      })
    ),
    total:             z.coerce.number().positive(),
    metodo_pago:       z.enum(['efectivo', 'transferencia', 'tarjeta']),
    comprador_nombre:  z.string().min(1),
    comprador_email:   z.string().email(),
    comprador_telefono: z.string().optional(),
    direccion_envio:   z.string().min(1),
    cardToken:         z.string().optional(),
    transferencia_ref: z.string().optional(),
    idempotencyKey:    z.string().uuid().optional(),
  })
  .passthrough() // mantenemos cualquier key extra
  .refine(
    (data) => data.metodo_pago !== 'tarjeta' || !!data.cardToken,
    {
      message: 'cardToken es obligatorio para pagos con tarjeta',
      path: ['cardToken'],
    }
  )

export async function POST(req: NextRequest) {
  // 1) Parseo bruto y log
  let body: unknown
  try {
    body = await req.json()
    console.log('▶️ [POST /api/pedidos] body recibido:\n', JSON.stringify(body, null, 2))
  } catch (err: unknown) {
    console.error('❌ [POST /api/pedidos] JSON inválido:', err)
    return NextResponse.json(
      { success: false, message: 'JSON inválido o vacío' },
      { status: 400 }
    )
  }

  // 2) Validación con Zod
  let dto: z.infer<typeof createPedidoSchema>
  try {
    dto = createPedidoSchema.parse(body)
    console.log('✅ [POST /api/pedidos] DTO validado:\n', JSON.stringify(dto, null, 2))
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      console.warn('⚠️ [POST /api/pedidos] errores de validación:\n', err.errors)
      return NextResponse.json(
        { success: false, errors: err.errors },
        { status: 422 }
      )
    }
    console.error('❌ [POST /api/pedidos] error inesperado validando DTO:', err)
    return NextResponse.json(
      { success: false, message: 'Error de validación desconocido' },
      { status: 500 }
    )
  }

  // 3) Log específico de cardToken cuando corresponde
  if (dto.metodo_pago === 'tarjeta') {
    console.log('🔑 [POST /api/pedidos] cardToken recibido:', dto.cardToken)
  }

  // 4) Llamada al servicio
  try {
    console.log('🔄 [POST /api/pedidos] llamando a PedidoService.procesarPedido')
    const service = new PedidoService()
    const result = await service.procesarPedido(dto)
    console.log('🎉 [POST /api/pedidos] pedido procesado:', result)

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    )
  } catch (err: unknown) {
    console.error('❌ [POST /api/pedidos] error creando pedido:', err)
    const message = err instanceof Error ? err.message : 'Error interno desconocido'
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    )
  }
}
