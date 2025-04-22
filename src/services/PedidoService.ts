// src/services/PedidoService.ts
import { PrismaClient, Prisma } from '@prisma/client';
import { CreatePedidoDTO, PaymentResponse } from '@/types/payment';
import { CashStrategy } from '@/strategies/CashStrategy';
import { TransferStrategy } from '@/strategies/TransferStrategy';
import { CardStrategy } from '@/strategies/CardStrategy';
import { PaymentStrategy } from '@/strategies/PaymentStrategy';

export class PedidoService {
  private prisma = new PrismaClient();

  /**
   * Procesa un nuevo pedido:
   * 1) Crea el registro en la tabla pedidos.
   * 2) Ejecuta la estrategia de pago (efectivo, transferencia o tarjeta).
   * 3) Actualiza los datos de pago (mp_payment_id, transferencia_ref, tarjeta_last4, estado).
   * 4) Devuelve al cliente la respuesta generada por la pasarela.
   */
  async procesarPedido(dto: CreatePedidoDTO): Promise<PaymentResponse> {
    return await this.prisma.$transaction(async (tx) => {
      // 1) Crear el pedido
      const pedido = await tx.pedidos.create({
        data: {
          datos: dto.datos as unknown as Prisma.InputJsonValue,
          total: dto.total,
          metodo_pago: dto.metodo_pago,
          comprador_nombre: dto.comprador_nombre,
          comprador_email: dto.comprador_email,
          comprador_telefono: dto.comprador_telefono,
          direccion_envio: dto.direccion_envio,
        },
      });

      // 2) Seleccionar y ejecutar la estrategia de pago
      const strategy: PaymentStrategy = this.getStrategy(dto.metodo_pago);
      const pago = await strategy.execute(
        tx,
        { id: pedido.id, total: Number(pedido.total) },
        dto
      );

      // 3) Actualizar campos de pago en la base de datos
      await tx.pedidos.update({
        where: { id: pedido.id },
        data: {
          mp_payment_id:          pago.mpId,
          transferencia_ref:      pago.transferenciaRef,
          tarjeta_last4:          pago.cardLast4,
          tarjeta_payment_method: pago.cardLast4 ? dto.cardToken : undefined,
          estado:                 pago.status,
        },
      });

      // 4) Devolver la respuesta al cliente
      return pago.responseToClient;
    });
  }

  /**
   * Devuelve la estrategia de pago correspondiente.
   */
  private getStrategy(m: CreatePedidoDTO['metodo_pago']): PaymentStrategy {
    switch (m) {
      case 'tarjeta':
        return new CardStrategy();
      case 'transferencia':
        return new TransferStrategy();
      default:
        return new CashStrategy();
    }
  }

  /**
   * Confirma manualmente una transferencia bancaria:
   * - Verifica existencia del pedido.
   * - Comprueba que el método de pago sea 'transferencia'.
   * - Actualiza transferencia_ref y marca como 'pagado'.
   */
  async confirmTransfer(orderId: number, transferenciaRef: string): Promise<void> {
    const pedido = await this.prisma.pedidos.findUnique({
      where: { id: orderId }
    });

    if (!pedido) {
      throw new Error(`Pedido con id ${orderId} no encontrado`);
    }
    if (pedido.metodo_pago !== 'transferencia') {
      throw new Error(`El pedido ${orderId} no usa transferencia bancaria`);
    }

    await this.prisma.pedidos.update({
      where: { id: orderId },
      data: {
        transferencia_ref: transferenciaRef,
        estado: 'pagado',
      },
    });
  }
}
