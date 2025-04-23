// src/app/api/pedidos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export const runtime = 'nodejs';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const pedidoId = Number(params.id);
  if (isNaN(pedidoId)) {
    return NextResponse.json({ error: 'invalid_id' }, { status: 400 });
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
        mp_response: true,       // <-- incluir el JSON completo
        mp_error_code: true,
        mp_error_message: true,
      },
    });
    if (!pedido) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }

    // Opcional: parsear mp_response si lo quieres tipar bien
    let paymentData: any = null;
    if (pedido.mp_response) {
      paymentData = typeof pedido.mp_response === 'string'
        ? JSON.parse(pedido.mp_response)
        : pedido.mp_response;
    }

    return NextResponse.json({
      ...pedido,
      paymentData,           // aquí tendrás .init_point, .status, etc.
    }, { status: 200 });
  } catch (err) {
    console.error('Error fetching pedido:', err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
