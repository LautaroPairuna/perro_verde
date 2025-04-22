// src/app/api/pedidos/[id]/confirm-transfer/route.ts

export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { PedidoService } from '@/services/PedidoService';

const schema = z.object({
  transferencia_ref: z.string().nonempty(),
});

export async function POST(
  request: Request,
  context: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = context.params;

  // 1) Parsear JSON del body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Cuerpo JSON inválido o vacío' },
      { status: 400 }
    );
  }

  // 2) Validar contra nuestro esquema Zod
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten() },
      { status: 422 }
    );
  }
  const { transferencia_ref } = parsed.data;

  // 3) Convertir y validar el ID de la URL
  const orderId = Number(id);
  if (Number.isNaN(orderId)) {
    return NextResponse.json(
      { success: false, message: 'ID de pedido inválido' },
      { status: 400 }
    );
  }

  // 4) Ejecutar la lógica de confirmación
  try {
    const svc = new PedidoService();
    await svc.confirmTransfer(orderId, transferencia_ref);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('Error en confirm-transfer:', err);
    const message = err instanceof Error ? err.message : 'Error interno desconocido';
    return NextResponse.json(
      { success: false, message },
      { status: 400 }
    );
  }
}
