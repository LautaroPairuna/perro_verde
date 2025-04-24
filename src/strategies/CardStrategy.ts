// src/strategies/CardStrategy.ts
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import type { CreatePedidoDTO } from '@/types/payment';
import { PaymentStrategy } from './PaymentStrategy';

export class CardStrategy implements PaymentStrategy {
  async execute(
    prisma: PrismaClient,
    pedido: { id: number; total: number },
    dto: CreatePedidoDTO
  ) {
    const idempotencyKey = dto.idempotencyKey ?? randomUUID();
    const body = {
      transaction_amount: pedido.total,
      token:               dto.cardToken!,
      description:        `Pago pedido #${pedido.id}`,
      installments:       dto.installments!,
      payment_method_id:  dto.payment_method_id!,
      payer: { email: dto.comprador_email },
    };

    console.log(
      '💳 [CardStrategy] MP body →',
      JSON.stringify(body, null, 2),
      'idempotencyKey →',
      idempotencyKey
    );

    const res = await fetch(
      'https://api.mercadopago.com/v1/payments',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          'X-Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Error procesando pago');
    }

    const payment = await res.json();
    return {
      mpId:         payment.id,
      status:       payment.status,
      cardLast4:    payment.card?.last_four_digits,
      responseToClient: {
        orderId: pedido.id,
        status:  payment.status,
      },
    };
  }
}
