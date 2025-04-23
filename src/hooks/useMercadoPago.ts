// src/hooks/useMercadoPago.ts
'use client';

import { useState, useEffect } from 'react';

export interface MpInstance {
  bricks(): {
    create(
      name: string,
      container: string,                // ahora acepta string
      options: {
        initialization: { preferenceId: string };
        callbacks: {
          onReady: () => void;
          onSubmit: (data: { token: string }) => void;
          onError: () => void;
        };
      }
    ): void;
    unmount(brick: string): void;
  };
}

declare global {
  interface Window {
    MercadoPago?: new (key: string, opts: { locale: string }) => MpInstance;
  }
}

export function useMercadoPago(
  publicKey: string,
  preferenceId: string | null
): { mp: MpInstance | null; error: string | null } {
  const [mp, setMp] = useState<MpInstance | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!preferenceId || typeof window === 'undefined') return;
    if (!window.MercadoPago) {
      setError('SDK de MercadoPago no cargado');
      return;
    }
    try {
      const instance = new window.MercadoPago(publicKey, { locale: 'es-AR' });
      setMp(instance);
    } catch (err: unknown) {
      const message = err instanceof Error
        ? err.message
        : 'Error inicializando MercadoPago';
      console.error(err);
      setError(message);
    }
  }, [publicKey, preferenceId]);

  return { mp, error };
}
