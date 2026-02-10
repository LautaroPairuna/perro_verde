import type { Prisma, PrismaClient } from '@prisma/client'
import type { CreatePedidoDTO, PaymentResponse } from '@/types/payment'
import type { DbClient as AppDbClient } from '@/lib/prisma'

export type DbClient = AppDbClient | Prisma.TransactionClient | PrismaClient

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
