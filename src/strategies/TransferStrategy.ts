// src/strategies/TransferStrategy.ts
import type { PrismaClient } from '@prisma/client';
import { CreatePedidoDTO, PaymentResponse } from '@/types/payment';
import { PaymentStrategy } from './PaymentStrategy';

export class TransferStrategy implements PaymentStrategy {
  async execute(tx: PrismaClient, pedido: { id: number }, dto: CreatePedidoDTO) {
    return {
      status: 'iniciado',
      transferenciaRef: dto.transferencia_ref,
      responseToClient: {
        orderId: pedido.id,
        status: 'iniciado',
        // opcional: devolver un objeto con instrucciones
      }
    };
  }
}
