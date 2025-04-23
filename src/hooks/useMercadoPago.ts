// src/hooks/useMercadoPago.ts
'use client';

import { useState, useEffect } from 'react';

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export function useMercadoPago(publicKey: string, preferenceId: string | null) {
  const [mp, setMp] = useState<any>(null);
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
    } catch (err: any) {
      console.error(err);
      setError('Error inicializando MercadoPago');
    }
  }, [publicKey, preferenceId]);

  return { mp, error };
}
