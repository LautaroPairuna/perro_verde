// src/components/checkout/PaymentMethodSelector.tsx
'use client';

import React, { ReactNode } from 'react';
import useSWR from 'swr';
import { FormaPago } from '@/types/payment';
import { CreditCard, QrCode, DollarSign, Banknote, Loader2 } from 'lucide-react';
import clsx from 'clsx';

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
  efectivo:     <DollarSign size={24} />,
  transferencia:<Banknote size={24} />,
  tarjeta:      <CreditCard size={24} />,
  qr:           <QrCode size={24} />,
};

export function PaymentMethodSelector({ selected, onChange }: Props) {
  const { data, error, isLoading } = useSWR<FormaPago[]>('/api/formas-pago', fetcher);

  if (error) return <div className="text-red-500 bg-red-50 p-4 rounded-lg">No se pudieron cargar los métodos de pago.</div>;
  if (isLoading || !data) return <div className="flex items-center gap-2 text-gray-500"><Loader2 className="animate-spin" size={20} /> Cargando métodos de pago...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.map(f => {
        const isSelected = selected === f.forma_pago;
        return (
          <label 
            key={f.id} 
            className={clsx(
              "cursor-pointer relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200",
              isSelected 
                ? "border-green-600 bg-green-50 shadow-sm" 
                : "border-gray-200 bg-white hover:border-green-200 hover:bg-gray-50"
            )}
          >
            <input
              type="radio"
              name="metodo_pago"
              value={f.forma_pago}
              checked={isSelected}
              onChange={() => onChange(f.forma_pago)}
              className="sr-only"
            />
            
            <div className={clsx(
              "p-2 rounded-full",
              isSelected ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"
            )}>
              {iconMap[f.forma_pago] ?? <DollarSign size={24} />}
            </div>
            
            <div className="flex-1">
              <span className={clsx(
                "block font-bold text-base",
                isSelected ? "text-green-900" : "text-gray-700"
              )}>
                {f.descripcion}
              </span>
              {f.permite_cuotas && (
                <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full inline-block mt-1">
                  Cuotas disponibles
                </span>
              )}
            </div>

            {isSelected && (
              <div className="absolute top-4 right-4 w-3 h-3 bg-green-600 rounded-full animate-pulse" />
            )}
          </label>
        );
      })}
    </div>
  );
}
