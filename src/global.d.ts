// src/global.d.ts
export {};

declare global {
  interface Window {
    MercadoPago: new (publicKey: string, opts: { locale: string }) => MercadoPagoInstance;
  }
}

/** Instancia principal de MercadoPago JS */
interface MercadoPagoInstance {
  bricks(): BrickFactory;
}

/** Fábrica de Bricks */
interface BrickFactory {
  /** Monta el formulario de tarjeta y devuelve el controlador */
  create(
    name: 'cardPayment',
    containerId: string,
    options: CardBrickOptions
  ): CardBrickController;
  /** Desmonta un Brick */
  unmount(name: string): void;
}

/** Opciones al crear el Brick de tarjeta */
interface CardBrickOptions {
  initialization: { amount: number };
  customization?: { visual: { hidePaymentButton: boolean } };
  callbacks?: {
    onReady?: () => void;
    onError?: (error: unknown) => void;
    onSubmit?: (data: { token: string; error?: unknown }) => void;
  };
}

/** Controlador para tokenizar la tarjeta manualmente */
interface CardBrickController {
  createCardToken(): Promise<{ token: string; error?: unknown }>;
}
