// src/strategies/CashStrategy.ts
import type { PrismaClient } from '@prisma/client';
import { CreatePedidoDTO } from '@/types/payment';
import { PaymentStrategy } from './PaymentStrategy';

export class CashStrategy implements PaymentStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(tx: PrismaClient, pedido: { id: number }, _dto: CreatePedidoDTO) {
    return {
      status: 'pendiente',
      responseToClient: { orderId: pedido.id, status: 'pendiente' }
    };
  }
}
