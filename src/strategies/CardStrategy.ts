// src/strategies/CardStrategy.ts
import type { PrismaClient } from '@prisma/client';
import { CreatePedidoDTO, PaymentResponse } from '@/types/payment';
import { PaymentStrategy } from './PaymentStrategy';

export class CardStrategy implements PaymentStrategy {
  async execute(tx: PrismaClient, pedido: { id: number; total: number }, dto: CreatePedidoDTO) {
    // Llamada a MercadoPago
    const res = await fetch(
      'https://api.mercadopago.com/checkout/preferences',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{ id: pedido.id, title: 'Pedido', quantity: 1, unit_price: pedido.total }],
          payer: { email: dto.comprador_email },
          binary_mode: false,
          card_token: dto.cardToken,
        })
      }
    );
    const pref = await res.json();
    return {
      mpId: pref.id,
      status: pref.status || 'in_process',
      cardLast4: pref.card?.last_four_digits,
      responseToClient: {
        orderId: pedido.id,
        init_point: pref.init_point,
        status: pref.status,
      }
    };
  }
}
