// src/app/api/pedidos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PedidoService } from '@/services/PedidoService';

// 1. Defino validación del body

const createPedidoSchema = z.object({
  datos: z.array(z.object({
    id:        z.coerce.number().int().positive(),
    name:      z.string(),
    price:     z.coerce.number().positive(),
    quantity:  z.coerce.number().int().positive(),
  })),
  total:             z.coerce.number().positive(),
  metodo_pago:       z.enum(['efectivo','transferencia','tarjeta']),
  comprador_nombre:  z.string().min(1),
  comprador_email:   z.string().email(),
  comprador_telefono:z.string().optional(),
  direccion_envio:   z.string().min(1),
  cardToken:         z.string().optional(),
  transferencia_ref: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const dto  = createPedidoSchema.parse(json);
    const service = new PedidoService();
    const result  = await service.procesarPedido(dto);
    return NextResponse.json(result, { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 422 });
    }
    console.error(err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
