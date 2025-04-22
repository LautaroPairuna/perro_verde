// src/app/api/pedidos/[id]/confirm-transfer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PedidoService } from '@/services/PedidoService';

export const runtime = 'nodejs';

const schema = z.object({
  transferencia_ref: z.string().nonempty(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }  // solo aquí desestructuramos
) {
  const orderId = Number(params.id);
  if (Number.isNaN(orderId)) {
    return NextResponse.json(
      { success: false, message: 'ID de pedido inválido' },
      { status: 400 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Cuerpo JSON inválido o vacío' },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten() },
      { status: 422 }
    );
  }
  const { transferencia_ref } = parsed.data;

  try {
    await new PedidoService().confirmTransfer(orderId, transferencia_ref);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error interno desconocido';
    return NextResponse.json(
      { success: false, message },
      { status: 400 }
    );
  }
}
