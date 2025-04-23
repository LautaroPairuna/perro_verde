// src/app/api/pedidos/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PedidoService } from '../../../services/PedidoService';

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
});

export async function POST(req: NextRequest) {
  // 1) Leer y loguear el body crudo
  let body: unknown;
  try {
    body = await req.json();
    console.log('▶️ [POST /api/pedidos] body recibido:', JSON.stringify(body, null, 2));
  } catch (e) {
    console.error('❌ [POST /api/pedidos] Error parseando JSON:', e);
    return NextResponse.json(
      { success: false, message: 'JSON inválido o vacío' },
      { status: 400 }
    );
  }

  // 2) Validación Zod
  let dto;
  try {
    dto = createPedidoSchema.parse(body);
    console.log('✅ [POST /api/pedidos] DTO validado:', JSON.stringify(dto, null, 2));
  } catch (e) {
    console.warn('⚠️ [POST /api/pedidos] Error validando DTO:', (e as z.ZodError).errors);
    return NextResponse.json(
      { success: false, errors: (e as z.ZodError).errors },
      { status: 422 }
    );
  }

  // 3) Llamada al servicio con logging interno
  try {
    console.log('🔄 [POST /api/pedidos] Llamando a PedidoService.procesarPedido');
    const service = new PedidoService();
    const result = await service.procesarPedido(dto);
    console.log('🎉 [POST /api/pedidos] Pedido procesado:', result);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (err: any) {
    // Log completo del error
    console.error('❌ [POST /api/pedidos] Error creando pedido:', err);
    // Si el error viene con mensaje propio, envíalo
    const message = err?.message || 'Error interno desconocido';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
