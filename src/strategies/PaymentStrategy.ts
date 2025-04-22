// src/strategies/PaymentStrategy.ts
import type { Prisma } from '@prisma/client';
import type { CreatePedidoDTO, PaymentResponse } from '@/types/payment';

export interface PaymentStrategy {
  execute(
    tx: Prisma.TransactionClient,               
    pedido: { id: number; total: number },
    dto: CreatePedidoDTO
  ): Promise<{
    mpId?: string;
    status: string;
    cardLast4?: string;
    transferenciaRef?: string;
    responseToClient: PaymentResponse;
  }>;
}
