// src/app/api/pedidos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PedidoService } from '../../../services/PedidoService';

export const runtime = 'nodejs';

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
    comprador_telefono:z.string().optional(),
    direccion_envio:   z.string().min(1),
    cardToken:         z.string().optional(),
    payment_method_id: z.string().optional(),
    installments:      z.coerce.number().int().optional(),
    transferencia_ref: z.string().optional(),
    idempotencyKey:    z.string().uuid().optional(),
  })
  .passthrough()  // <-- moved before refine
  .refine(
    (d) =>
      d.metodo_pago !== 'tarjeta' ||
      (d.cardToken && d.payment_method_id && d.installments !== undefined),
    {
      message:
        'Para tarjeta se requieren cardToken, payment_method_id e installments',
      path: ['cardToken'],
    }
  );

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
    // console.log(
    //   // '▶️ [POST /api/pedidos] body recibido:\n',
    //   JSON.stringify(body, null, 2)
    // );
  } catch (err: unknown) {
    // console.error('❌ [POST /api/pedidos] JSON inválido:', err);
    return NextResponse.json(
      { success: false, message: 'JSON inválido o vacío' },
      { status: 400 }
    );
  }

  let dto: z.infer<typeof createPedidoSchema>;
  try {
    dto = createPedidoSchema.parse(body);
    console.log(
      // '✅ [POST /api/pedidos] DTO validado:\n',
      JSON.stringify(dto, null, 2)
    );
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      // console.warn('⚠️ [POST /api/pedidos] errores de validación:\n', err.errors);
      return NextResponse.json(
        { success: false, errors: err.errors },
        { status: 422 }
      );
    }
    // console.error('❌ [POST /api/pedidos] error inesperado validando DTO:', err);
    return NextResponse.json(
      { success: false, message: 'Error de validación desconocido' },
      { status: 500 }
    );
  }

  // if (dto.metodo_pago === 'tarjeta') {
  //   // console.log('🔑 [POST /api/pedidos] cardToken recibido:', dto.cardToken);
  // }

  try {
    // console.log('🔄 [POST /api/pedidos] llamando a PedidoService.procesarPedido');
    const service = new PedidoService();
    const result = await service.procesarPedido(dto);
    // console.log('🎉 [POST /api/pedidos] pedido procesado:', result);

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (err: unknown) {
    // console.error('❌ [POST /api/pedidos] error creando pedido:', err);
    const message = err instanceof Error ? err.message : 'Error interno desconocido';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
