// src/app/api/pedidos/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import type { PaymentResponse } from '@/types/payment'

/**
 * MPResponse: la forma esperada de mp_response almacenado en la BD,
 * extendida con campos opcionales de error.
 */
type MPResponse = PaymentResponse & {
  mp_error_code?: string
  mp_error_message?: string
}

export const runtime = 'nodejs'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const pedidoId = Number(params.id)
  if (isNaN(pedidoId)) {
    return NextResponse.json(
      { error: 'invalid_id' },
      { status: 400 }
    )
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
        mp_response: true,
        mp_error_code: true,
        mp_error_message: true,
      },
    })

    if (!pedido) {
      return NextResponse.json(
        { error: 'not_found' },
        { status: 404 }
      )
    }

    // Parseamos mp_response de la base y lo casteamos a MPResponse
    let paymentData: MPResponse | null = null
    if (pedido.mp_response) {
      const raw = pedido.mp_response
      const parsed = typeof raw === 'string'
        ? JSON.parse(raw)
        : raw

      paymentData = parsed as unknown as MPResponse

      if (pedido.mp_error_code) {
        paymentData.mp_error_code = pedido.mp_error_code
      }
      if (pedido.mp_error_message) {
        paymentData.mp_error_message = pedido.mp_error_message
      }
    }

    return NextResponse.json(
      {
        id: pedido.id,
        estado: pedido.estado,
        metodo_pago: pedido.metodo_pago,
        total: pedido.total,
        comprador_nombre: pedido.comprador_nombre,
        comprador_email: pedido.comprador_email,
        transferencia_ref: pedido.transferencia_ref,
        mp_payment_id: pedido.mp_payment_id,
        paymentData,
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('Error fetching pedido:', err)
    return NextResponse.json(
      { error: 'internal_error' },
      { status: 500 }
    )
  }
}
