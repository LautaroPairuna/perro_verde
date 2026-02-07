import { randomUUID } from 'crypto'
import type { CreatePedidoDTO } from '@/types/payment'
import type { PaymentStrategy, DbClient } from './PaymentStrategy'

export class CardStrategy implements PaymentStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(
    _client: DbClient,
    pedido: { id: number; total: number },
    dto: CreatePedidoDTO
  ) {
    const idempotencyKey = dto.idempotencyKey ?? randomUUID()

    const body = {
      transaction_amount: pedido.total,
      token: dto.cardToken!,
      description: `Pago pedido #${pedido.id}`,
      installments: dto.installments!,
      payment_method_id: dto.payment_method_id!,
      payer: { email: dto.comprador_email },
    }

    const res = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.message || 'Error procesando pago')
    }

    const payment = await res.json()

    return {
      mpId: payment.id,
      status: payment.status,
      cardLast4: payment.card?.last_four_digits,
      responseToClient: {
        orderId: pedido.id,
        status: payment.status,
      },
    }
  }
}
