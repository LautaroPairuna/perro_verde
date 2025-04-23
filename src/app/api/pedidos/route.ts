// src/app/api/pedidos/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PedidoService } from '../../../services/PedidoService'

const createPedidoSchema = z.object({
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
  comprador_telefono:z.string().optional(),
  direccion_envio:   z.string().min(1),
  cardToken:         z.string().optional(),
  transferencia_ref: z.string().optional(),
})

export async function POST(req: NextRequest) {
  // 1) Leer y loguear el body
  let body: unknown
  try {
    body = await req.json()
    console.log('▶️ [POST /api/pedidos] body recibido:', JSON.stringify(body, null, 2))
  } catch (err: unknown) {
    console.error('❌ [POST /api/pedidos] JSON inválido:', err)
    return NextResponse.json(
      { success: false, message: 'JSON inválido o vacío' },
      { status: 400 }
    )
  }

  // 2) Validación Zod
  let dto: z.infer<typeof createPedidoSchema>
  try {
    dto = createPedidoSchema.parse(body)
    console.log('✅ [POST /api/pedidos] DTO validado:', JSON.stringify(dto, null, 2))
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      console.warn('⚠️ [POST /api/pedidos] Errores de validación:', err.errors)
      return NextResponse.json(
        { success: false, errors: err.errors },
        { status: 422 }
      )
    }
    console.error('❌ [POST /api/pedidos] Error inesperado validando DTO:', err)
    return NextResponse.json(
      { success: false, message: 'Error de validación desconocido' },
      { status: 500 }
    )
  }

  // 3) Llamada al servicio
  try {
    console.log('🔄 [POST /api/pedidos] Llamando a PedidoService.procesarPedido')
    const service = new PedidoService()
    const result = await service.procesarPedido(dto)
    console.log('🎉 [POST /api/pedidos] Pedido procesado:', result)
    return NextResponse.json({ success: true, data: result }, { status: 201 })
  } catch (err: unknown) {
    console.error('❌ [POST /api/pedidos] Error creando pedido:', err)
    if (err instanceof Error) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Error interno desconocido' },
      { status: 500 }
    )
  }
}
