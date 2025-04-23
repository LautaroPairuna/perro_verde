// src/services/PedidoService.ts

import { PrismaClient, Prisma } from '@prisma/client'
import { CreatePedidoDTO, PaymentResponse } from '../types/payment'
import { CashStrategy } from '../strategies/CashStrategy'
import { TransferStrategy } from '../strategies/TransferStrategy'
import { CardStrategy } from '../strategies/CardStrategy'
import { PaymentStrategy } from '../strategies/PaymentStrategy'

export class PedidoService {
  private prisma = new PrismaClient()

  /**
   * Procesa un nuevo pedido:
   * 1) Crea el pedido en 'pendiente'.
   * 2) Ejecuta la pasarela según método de pago.
   * 3) En éxito, marca 'pagado' y guarda la respuesta en mp_response.
   *    En fallo, marca 'cancelado' y guarda código/mensaje en mp_error_* y mp_response.
   * 4) Devuelve PaymentResponse o lanza un error con mensaje.
   */
  async procesarPedido(dto: CreatePedidoDTO): Promise<PaymentResponse> {
    const pedido = await this.prisma.pedidos.create({
      data: {
        datos:              dto.datos as unknown as Prisma.InputJsonValue,
        total:              dto.total,
        metodo_pago:        dto.metodo_pago,
        comprador_nombre:   dto.comprador_nombre,
        comprador_email:    dto.comprador_email,
        comprador_telefono: dto.comprador_telefono ?? null,
        direccion_envio:    dto.direccion_envio,
        estado:             'pendiente',
      },
    })

    const strategy: PaymentStrategy = this.getStrategy(dto.metodo_pago)
    try {
      const pago = await strategy.execute(
        this.prisma,
        { id: pedido.id, total: Number(pedido.total) },
        dto
      )

      await this.prisma.pedidos.update({
        where: { id: pedido.id },
        data: {
          mp_payment_id:          pago.mpId!.toString(),               // ← aseguramos que mpId no es undefined
          transferencia_ref:      pago.transferenciaRef ?? null,
          tarjeta_last4:          pago.cardLast4 ?? null,
          tarjeta_payment_method: pago.cardLast4 ? dto.cardToken! : null,
          estado:                 pago.status,
          mp_response:            pago.responseToClient as unknown as Prisma.InputJsonValue,
        },
      })

      return pago.responseToClient
    } catch (err: unknown) {
      interface MPError {
        cause?: { error?: string; message?: string }
        error?: string
        name?: string
        message?: string
      }
      const e = err as MPError
      const mpCode    = e.cause?.error   ?? e.error ?? e.name ?? 'unknown_error'
      const mpMessage = e.cause?.message ?? e.message             ?? 'Error desconocido'
      const errorData = { code: mpCode, message: mpMessage }

      await this.prisma.pedidos.update({
        where: { id: pedido.id },
        data: {
          estado:           'cancelado',
          mp_error_code:    mpCode,
          mp_error_message: mpMessage,
          mp_response:      errorData as unknown as Prisma.InputJsonValue,
        },
      })

      throw new Error(mpMessage)
    }
  }

  /** Retorna la estrategia según método de pago. */
  private getStrategy(metodo: CreatePedidoDTO['metodo_pago']): PaymentStrategy {
    switch (metodo) {
      case 'tarjeta':       return new CardStrategy()
      case 'transferencia': return new TransferStrategy()
      default:              return new CashStrategy()
    }
  }

  /** Confirma transferencia manualmente. */
  async confirmTransfer(orderId: number, transferenciaRef: string): Promise<void> {
    const pedido = await this.prisma.pedidos.findUnique({ where: { id: orderId } })
    if (!pedido) {
      throw new Error(`Pedido con id ${orderId} no encontrado`)
    }
    if (pedido.metodo_pago !== 'transferencia') {
      throw new Error(`El pedido ${orderId} no usa transferencia bancaria`)
    }
    await this.prisma.pedidos.update({
      where: { id: orderId },
      data: {
        transferencia_ref: transferenciaRef,
        estado:            'pagado',
      },
    })
  }

  /** Confirma pago con tarjeta para un pedido existente. */
  async confirmCard(orderId: number, cardToken: string): Promise<void> {
    const pedido = await this.prisma.pedidos.findUnique({ where: { id: orderId } })
    if (!pedido) {
      throw new Error(`Pedido con id ${orderId} no encontrado`)
    }
    if (pedido.metodo_pago !== 'tarjeta') {
      throw new Error(`El pedido ${orderId} no usa pago con tarjeta`)
    }

    // Reconstruimos el DTO desde lo almacenado
    const dto: CreatePedidoDTO = {
      datos:              pedido.datos as unknown as CreatePedidoDTO['datos'],
      total:              Number(pedido.total),
      metodo_pago:        pedido.metodo_pago,
      comprador_nombre:   pedido.comprador_nombre,
      comprador_email:    pedido.comprador_email,
      comprador_telefono: pedido.comprador_telefono ?? undefined,
      direccion_envio:    pedido.direccion_envio ?? '',            // ← nos aseguramos string
      cardToken,
      payment_method_id:  undefined,
      installments:       undefined,
      transferencia_ref:  undefined,
      idempotencyKey:     undefined,
    }

    const strategy: PaymentStrategy = new CardStrategy()
    try {
      const pago = await strategy.execute(
        this.prisma,
        { id: orderId, total: Number(pedido.total) },
        dto
      )

      await this.prisma.pedidos.update({
        where: { id: orderId },
        data: {
          mp_payment_id:          pago.mpId!.toString(),            // ← no más Int
          tarjeta_last4:          pago.cardLast4 ?? null,
          tarjeta_payment_method: pago.cardLast4 ? cardToken : null,
          estado:                 pago.status,
          mp_response:            pago.responseToClient as unknown as Prisma.InputJsonValue,
        },
      })
    } catch (err: unknown) {
      interface MPError {
        cause?: { error?: string; message?: string }
        error?: string
        name?: string
        message?: string
      }
      const e = err as MPError
      const mpCode    = e.cause?.error   ?? e.error ?? e.name ?? 'unknown_error'
      const mpMessage = e.cause?.message ?? e.message             ?? 'Error desconocido'

      await this.prisma.pedidos.update({
        where: { id: orderId },
        data: {
          estado:           'cancelado',
          mp_error_code:    mpCode,
          mp_error_message: mpMessage,
          mp_response:      { code: mpCode, message: mpMessage } as unknown as Prisma.InputJsonValue,
        },
      })

      throw new Error(mpMessage)
    }
  }
}
