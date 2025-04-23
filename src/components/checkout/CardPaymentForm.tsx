// src/components/checkout/CardPaymentForm.tsx
'use client';

import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMercadoPago } from '@/hooks/useMercadoPago';

export interface CardData {
  token: string;
  last_four_digits?: string;
  payment_method_id?: string;
}

interface CardPaymentFormProps {
  preferenceId: string;
  onApprove: (cardData: CardData) => void;
}

export function CardPaymentForm({ preferenceId, onApprove }: CardPaymentFormProps) {
  const containerId = `mp-wallet-container-${preferenceId}`;
  const { mp, error } = useMercadoPago(
    process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!,
    preferenceId
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }
    if (!mp) return;

    const config = {
      initialization: { preferenceId },
      callbacks: {
        onReady: () => toast.success('Formulario listo'),
        onSubmit: (data: CardData) => onApprove(data),
        onError: () => toast.error('Error en formulario de tarjeta'),
      },
    };

    mp.bricks().create('wallet', containerId, config);

    return () => mp.bricks().unmount('wallet');
  }, [mp, preferenceId, error, onApprove, containerId]);

  return <div id={containerId} style={{ minHeight: 300 }} />;
}
