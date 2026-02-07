// src/services/PedidoService.ts

import prisma from '../lib/prisma';
import type { Prisma } from '../../generated/prisma/client'
import { logAudit } from '../lib/audit';

import { CreatePedidoDTO, PaymentResponse } from '../types/payment';
import { CashStrategy } from '../strategies/CashStrategy';
import { TransferStrategy } from '../strategies/TransferStrategy';
import { CardStrategy } from '../strategies/CardStrategy';
import { PaymentStrategy } from '../strategies/PaymentStrategy';

export class PedidoService {
  private prisma = prisma;

  /**
   * Procesa un nuevo pedido:
   * 1) Crea el pedido en 'pendiente'.
   * 2) Ejecuta la pasarela según método de pago.
   * 3) En éxito, marca 'pagado' y guarda la respuesta en mp_response.
   *    En fallo, marca 'cancelado' y guarda código/mensaje en mp_error_* y mp_response.
   * 4) Devuelve PaymentResponse o lanza un error con mensaje.
   */
  async procesarPedido(dto: CreatePedidoDTO): Promise<PaymentResponse> {
    // 1) Creo el pedido en estado 'pendiente'
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
    });

    // Auditoría de creación
    await logAudit({
      entity: 'Pedidos',
      entityId: pedido.id,
      action: 'CREATE',
      user: dto.comprador_email,
      newValue: `Pedido creado por ${dto.total} (${dto.metodo_pago})`
    }).catch(console.error);

    // 2) Elijo la estrategia de pago adecuada
    const strategy: PaymentStrategy = this.getStrategy(dto.metodo_pago);

    try {
      // 3) Ejecuto la pasarela
      const pago = await strategy.execute(
        this.prisma,
        { id: pedido.id, total: Number(pedido.total) },
        dto
      );

      // Armo dinámicamente los campos a actualizar
      const updateData: Prisma.PedidosUpdateInput = {
        estadoRel:              { connect: { id: pago.status } },
        mp_response:            pago.responseToClient as unknown as Prisma.InputJsonValue,
        transferencia_ref:      pago.transferenciaRef ?? null,
        tarjeta_last4:          pago.cardLast4 ?? null,
        tarjeta_payment_method: pago.cardLast4 ? dto.cardToken! : null,
      };

      // Solo incluyo mp_payment_id si existe
      if (pago.mpId) {
        updateData.mp_payment_id = pago.mpId.toString();
      }

      // 4) Actualizo el pedido con los datos de pago
      await this.prisma.pedidos.update({
        where: { id: pedido.id },
        data: updateData,
      });

      // Auditoría de actualización (Pago)
      await logAudit({
        entity: 'Pedidos',
        entityId: pedido.id,
        action: 'UPDATE',
        field: 'estado',
        oldValue: 'pendiente',
        newValue: String(pago.status),
        user: dto.comprador_email
      }).catch(console.error);

      return pago.responseToClient;
    } catch (err: unknown) {
      // Manejo y registro de errores de la pasarela
      interface MPError {
        cause?: { error?: string; message?: string };
        error?: string;
        name?: string;
        message?: string;
      }
      const e = err as MPError;
      const mpCode    = e.cause?.error   ?? e.error ?? e.name ?? 'unknown_error';
      const mpMessage = e.cause?.message ?? e.message             ?? 'Error desconocido';
      const errorData = { code: mpCode, message: mpMessage };

      await this.prisma.pedidos.update({
        where: { id: pedido.id },
        data: {
          estadoRel:        { connect: { id: 'cancelado' } },
          mp_error_code:    mpCode,
          mp_error_message: mpMessage,
          mp_response:      errorData as unknown as Prisma.InputJsonValue,
        },
      });

      // Auditoría de error
      await logAudit({
        entity: 'Pedidos',
        entityId: pedido.id,
        action: 'UPDATE',
        field: 'estado',
        oldValue: 'pendiente',
        newValue: `cancelado (${mpMessage})`,
        user: dto.comprador_email
      }).catch(console.error);

      throw new Error(mpMessage);
    }
  }

  /** Retorna la estrategia según método de pago. */
  private getStrategy(metodo: CreatePedidoDTO['metodo_pago']): PaymentStrategy {
    switch (metodo) {
      case 'tarjeta':       return new CardStrategy();
      case 'transferencia': return new TransferStrategy();
      default:              return new CashStrategy();
    }
  }

  /** Confirma transferencia manualmente. */
  async confirmTransfer(orderId: number, transferenciaRef: string): Promise<void> {
    const pedido = await this.prisma.pedidos.findUnique({ where: { id: orderId } });
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
        estadoRel:         { connect: { id: 'pagado' } },
      },
    });

    await logAudit({
      entity: 'Pedidos',
      entityId: orderId,
      action: 'UPDATE',
      field: 'estado',
      oldValue: 'iniciado',
      newValue: 'pagado (Transferencia Confirmada)',
      user: 'Admin/System'
    }).catch(console.error);
  }

  /** Confirma pago con tarjeta para un pedido existente. */
  async confirmCard(orderId: number, cardToken: string): Promise<void> {
    const pedido = await this.prisma.pedidos.findUnique({ where: { id: orderId } });
    if (!pedido) {
      throw new Error(`Pedido con id ${orderId} no encontrado`);
    }
    if (pedido.metodo_pago !== 'tarjeta') {
      throw new Error(`El pedido ${orderId} no usa pago con tarjeta`);
    }

    // Reconstruyo el DTO desde lo almacenado
    const dto: CreatePedidoDTO = {
      datos:              pedido.datos as unknown as CreatePedidoDTO['datos'],
      total:              Number(pedido.total),
      metodo_pago:        pedido.metodo_pago,
      comprador_nombre:   pedido.comprador_nombre,
      comprador_email:    pedido.comprador_email,
      comprador_telefono: pedido.comprador_telefono ?? undefined,
      // Aseguro que nunca sea null
      direccion_envio:    pedido.direccion_envio ?? '',
      cardToken,
      payment_method_id:  undefined,
      installments:       undefined,
      transferencia_ref:  undefined,
      idempotencyKey:     undefined,
    };

    const strategy: PaymentStrategy = new CardStrategy();

    try {
      const pago = await strategy.execute(
        this.prisma,
        { id: orderId, total: Number(pedido.total) },
        dto
      );

      const updateData: Prisma.PedidosUpdateInput = {
        estadoRel:              { connect: { id: pago.status } },
        mp_response:            pago.responseToClient as unknown as Prisma.InputJsonValue,
        tarjeta_last4:          pago.cardLast4 ?? null,
        tarjeta_payment_method: pago.cardLast4 ? cardToken : null,
      };

      if (pago.mpId) {
        updateData.mp_payment_id = pago.mpId.toString();
      }

      await this.prisma.pedidos.update({
        where: { id: orderId },
        data: updateData,
      });

      await logAudit({
        entity: 'Pedidos',
        entityId: orderId,
        action: 'UPDATE',
        field: 'estado',
        oldValue: pedido.estado,
        newValue: String(pago.status),
        user: pedido.comprador_email
      }).catch(console.error);

    } catch (err: unknown) {
      interface MPError {
        cause?: { error?: string; message?: string };
        error?: string;
        name?: string;
        message?: string;
      }
      const e = err as MPError;
      const mpCode    = e.cause?.error   ?? e.error ?? e.name ?? 'unknown_error';
      const mpMessage = e.cause?.message ?? e.message             ?? 'Error desconocido';

      await this.prisma.pedidos.update({
        where: { id: orderId },
        data: {
          estadoRel:        { connect: { id: 'cancelado' } },
          mp_error_code:    mpCode,
          mp_error_message: mpMessage,
          mp_response:      { code: mpCode, message: mpMessage } as unknown as Prisma.InputJsonValue,
        },
      });

      await logAudit({
        entity: 'Pedidos',
        entityId: orderId,
        action: 'UPDATE',
        field: 'estado',
        oldValue: pedido.estado,
        newValue: `cancelado (${mpMessage})`,
        user: pedido.comprador_email
      }).catch(console.error);

      throw new Error(mpMessage);
    }
  }
}
