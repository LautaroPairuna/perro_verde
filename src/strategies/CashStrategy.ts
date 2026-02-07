import type { CreatePedidoDTO } from '@/types/payment'
import type { PaymentStrategy, DbClient } from './PaymentStrategy'

export class CashStrategy implements PaymentStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_client: DbClient, pedido: { id: number; total: number }, _dto: CreatePedidoDTO) {
    return {
      status: 'pendiente',
      responseToClient: { orderId: pedido.id, status: 'pendiente' },
    }
  }
}
