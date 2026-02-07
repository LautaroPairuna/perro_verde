import type { Prisma, PrismaClient } from '../../generated/prisma/client'
import type { CreatePedidoDTO, PaymentResponse } from '@/types/payment'

export type DbClient = PrismaClient | Prisma.TransactionClient

export type PaymentResult = {
  status: string
  responseToClient: PaymentResponse
  mpId?: string | number
  transferenciaRef?: string
  cardLast4?: string
}

export interface PaymentStrategy {
  execute(
    client: DbClient,
    pedido: { id: number; total: number },
    dto: CreatePedidoDTO
  ): Promise<PaymentResult>
}
