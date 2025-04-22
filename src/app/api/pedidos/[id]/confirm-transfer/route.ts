// src/app/api/pedidos/[id]/confirm-transfer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PedidoService } from '@/services/PedidoService';

const schema = z.object({
  transferencia_ref: z.string().nonempty(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // ————————————————————————————
  // 1) Tratar JSON vacío o inválido
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Cuerpo JSON inválido o vacío' },
      { status: 400 }
    );
  }

  // 2) Validar con Zod
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten() },
      { status: 422 }
    );
  }
  const { transferencia_ref } = parsed.data;

  // 3) Parsear y validar el ID
  const orderId = Number(params.id);
  if (Number.isNaN(orderId)) {
    return NextResponse.json(
      { success: false, message: 'ID de pedido inválido' },
      { status: 400 }
    );
  }

  // 4) Ejecutar la confirmación
  try {
    const svc = new PedidoService();
    await svc.confirmTransfer(orderId, transferencia_ref);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('Error en confirm-transfer:', err);
    const message = err instanceof Error ? err.message : 'Error interno desconocido';
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
