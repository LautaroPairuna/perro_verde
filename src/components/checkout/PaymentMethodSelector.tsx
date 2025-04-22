// src/components/checkout/PaymentMethodSelector.tsx
'use client';

import React, { ReactNode } from 'react';
import useSWR from 'swr';
import { FormaPago } from '@/types/payment';
import { CreditCard, QrCode, DollarSign, Banknote } from 'lucide-react';

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error('Error al cargar métodos de pago');
    return res.json();
  });

interface Props {
  selected: string;
  onChange: (method: string) => void;
}

const iconMap: Record<string, ReactNode> = {
  efectivo:     <DollarSign size={20} />,
  transferencia:<Banknote size={20} />,
  tarjeta:      <CreditCard size={20} />,
  qr:           <QrCode size={20} />,
};

export function PaymentMethodSelector({ selected, onChange }: Props) {
  const { data, error } = useSWR<FormaPago[]>('/api/formas-pago', fetcher);

  if (error) return <p className="text-red-500">No se pudieron cargar los métodos de pago.</p>;
  if (!data) return <p>Cargando métodos de pago…</p>;

  return (
    <div className="space-y-3">
      {data.map(f => (
        <label key={f.id} className="flex items-center space-x-2">
          <input
            type="radio"
            name="metodo_pago"
            value={f.forma_pago}
            checked={selected === f.forma_pago}
            onChange={() => onChange(f.forma_pago)}
            className="accent-green-600"
          />
          <span className="flex items-center space-x-1">
            {iconMap[f.forma_pago] ?? <DollarSign size={20} />}
            <span className="font-medium">{f.descripcion}</span>
          </span>
        </label>
      ))}
    </div>
  );
}
