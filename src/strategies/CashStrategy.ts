// src/strategies/CashStrategy.ts
import type { PrismaClient } from '@prisma/client';
import { CreatePedidoDTO, PaymentResponse } from '@/types/payment';
import { PaymentStrategy } from './PaymentStrategy';

export class CashStrategy implements PaymentStrategy {
  async execute(tx: PrismaClient, pedido: { id: number }, dto: CreatePedidoDTO) {
    return {
      status: 'pendiente',
      responseToClient: { orderId: pedido.id, status: 'pendiente' }
    };
  }
}
