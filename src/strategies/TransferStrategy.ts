import type { CreatePedidoDTO } from '@/types/payment'
import type { PaymentStrategy, DbClient } from './PaymentStrategy'

export class TransferStrategy implements PaymentStrategy {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_client: DbClient, pedido: { id: number; total: number }, dto: CreatePedidoDTO) {
    return {
      status: 'iniciado',
      transferenciaRef: dto.transferencia_ref,
      responseToClient: {
        orderId: pedido.id,
        status: 'iniciado',
      },
    }
  }
}
