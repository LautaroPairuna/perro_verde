// src/types/payment.ts

/** Representa una forma de pago en la configuración */
export interface FormaPago {
    id: number;
    forma_pago: string;
    descripcion: string;
    permite_cuotas: boolean;
    activo: boolean;
  }
  
  /** Métodos de pago permitidos en el flujo */
  export type MetodoPago = 'efectivo' | 'transferencia' | 'tarjeta';
  
  /** Ítem tal como se envía en el payload del pedido */
  export interface CartItemPayload {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  /** DTO para crear un pedido */
  export interface CreatePedidoDTO {
    datos: CartItemPayload[];
    total: number;
    metodo_pago: MetodoPago;
    comprador_nombre: string;
    comprador_email: string;
    comprador_telefono?: string;
    direccion_envio: string;
    /** Token de tarjeta (PCI‑DSS) */
    cardToken?: string;
    /** Referencia de transferencia (CBU o alias) */
    transferencia_ref?: string;
  }
  
  /** Respuesta genérica tras crear o iniciar un pago */
  export interface PaymentResponse {
    /** ID interno del pedido */
    orderId: number;
    /** URL de checkout para MercadoPago */
    init_point?: string;
    /** Código QR en base64 para pagos QR */
    qr_code_base64?: string;
    /** Estado inicial o final del pago */
    status?: string;
    /** Últimos 4 dígitos de la tarjeta tokenizada */
    cardLast4?: string;
  }
  