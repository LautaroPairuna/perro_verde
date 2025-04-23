'use client';

import React, { useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { mp, error } = useMercadoPago(
    process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!,
    preferenceId
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }
    if (!mp || !containerRef.current) return;

    const config = {
      initialization: { preferenceId },
      callbacks: {
        onReady: () => toast.success('Formulario listo'),
        onSubmit: (cardData: CardData) => onApprove(cardData),
        onError: () => toast.error('Error en formulario de tarjeta'),
      },
    };

    // Monta el brick “wallet”
    mp.bricks().create('wallet', containerRef.current, config);

    return () => {
      // Desmonta el brick
      mp.bricks().unmount('wallet');
    };
  }, [mp, preferenceId, error, onApprove]);

  return <div ref={containerRef} style={{ minHeight: 300 }} />;
}
