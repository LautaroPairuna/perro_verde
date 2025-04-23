'use client';

import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMercadoPago, MpInstance } from '@/hooks/useMercadoPago';

export interface CardData {
  token: string;
}

interface CardPaymentFormProps {
  preferenceId: string;
  onApprove: (cardData: CardData) => void;
}

export function CardPaymentForm({ preferenceId, onApprove }: CardPaymentFormProps) {
  const containerId = `mp-container-${preferenceId}`;
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

    const cfg = {
      initialization: { preferenceId },
      callbacks: {
        onReady: () => toast.success('Form listo'),
        onSubmit: (data: CardData) => onApprove(data),
        onError: () => toast.error('Error en Bricks'),
      },
    };

    mp.bricks().create('wallet', containerId, cfg);

    return () => {
      mp.bricks().unmount('wallet');
    };
  }, [mp, preferenceId, error, onApprove, containerId]);

  return <div id={containerId} style={{ minHeight: 200 }} />;
}
