// src/components/checkout/CheckoutWizard.tsx
'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { CreatePedidoDTO, MetodoPago } from '@/types/payment';

declare global {
  interface Window { MercadoPago: any; }
}

interface CardData {
  token: string;
  // otros campos que MercadoPago devuelva…
}

type ShippingInfo = {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
};

const fadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export default function CheckoutWizard() {
  const router = useRouter();
  const { cart, updateCart } = useCart();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const emptyCart = () => updateCart([]);

  const steps = [
    { label: 'Envío',    icon: <MapPin size={20} /> },
    { label: 'Pago',     icon: <CreditCard size={20} /> },
    { label: 'Revisión', icon: <CheckCircle2 size={20} /> },
    { label: 'Gracias',  icon: <CheckCircle2 size={20} /> },
  ];

  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState<ShippingInfo>({
    nombre: '', email: '', telefono: '', direccion: ''
  });
  const [payment, setPayment] = useState<{ metodo: MetodoPago }>({ metodo: 'efectivo' });
  const [transferenciaRef, setTransferenciaRef] = useState('');
  const [cardToken, setCardToken] = useState('');
  const [orderId, setOrderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [mpLoaded, setMpLoaded] = useState(false);

  const CBU_EMPRESA = process.env.NEXT_PUBLIC_CBU_EMPRESA || '';
  const WPP_EMPRESA = process.env.NEXT_PUBLIC_WPP_NUMBER || '';

  // Tipamos callback y contenedor
  useEffect(() => {
    if (payment.metodo !== 'tarjeta' || !mpLoaded) return;
    setTimeout(() => {
      const container = document.getElementById('card-brick-container');
      if (!container) return;
      const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, { locale: 'es-AR' });
      mp.bricks().create('cardPayment', 'card-brick-container', {
        initialization: { amount: total },
        callbacks: {
          onSubmit: (cardData: { token: string }) => setCardToken(cardData.token),
          onError: console.error,
          onReady: () => console.log('MercadoPago Brick ready'),
        },
      });
    }, 0);
  }, [payment.metodo, total, mpLoaded]);

  const validateShipping = () => {
    const { nombre, email, direccion } = shipping;
    if (!nombre || !email || !direccion) {
      alert('Completa todos los datos de envío.');
      return false;
    }
    return true;
  };

  const next = () => {
    if (step === 1 && !validateShipping()) return;
    setStep(s => Math.min(s + 1, steps.length));
  };
  const back = () => setStep(s => Math.max(s - 1, 1));

  const handleShipping = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
  };

  const submitOrder = async () => {
    setLoading(true);
    if (payment.metodo === 'tarjeta' && !cardToken) { alert('Completa los datos de la tarjeta.'); setLoading(false); return; }
    if (payment.metodo === 'transferencia' && !transferenciaRef) { alert('Completa la referencia de transferencia.'); setLoading(false); return; }

    const payload: CreatePedidoDTO = {
      datos: cart.map(i => ({
        id:       Number(i.id),
        name:     i.name,
        price:    i.price,
        quantity: i.quantity,
      })),
      total,
      metodo_pago:        payment.metodo,
      comprador_nombre:   shipping.nombre,
      comprador_email:    shipping.email,
      comprador_telefono: shipping.telefono,
      direccion_envio:    shipping.direccion,
      ...(payment.metodo === 'tarjeta'      && { cardToken }),
      ...(payment.metodo === 'transferencia' && { transferencia_ref: transferenciaRef }),
    };

    try {
      const res  = await fetch('/api/pedidos', {
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setOrderId(data.orderId);
      if (payment.metodo === 'tarjeta' && data.init_point) {
        window.open(data.init_point, '_blank');
        router.push(`/checkout/success?order=${data.orderId}`);
      } else {
        setStep(3);
      }
    } catch {
      alert('Error procesando pedido.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmTransfer = async (): Promise<void> => {
    if (!orderId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/pedidos/${orderId}/confirm-transfer`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ transferencia_ref: transferenciaRef }),
      });
      if (!res.ok) throw new Error('Error confirmando transferencia');
      emptyCart();
      setStep(4);
    } catch {
      alert('No se pudo confirmar la transferencia.');
    } finally {
      setLoading(false);
    }
  };

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <>
      {/* Carga el SDK de MercadoPago y marca mpLoaded=true cuando esté listo */}
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => setMpLoaded(true)}
      />

      <div className="bg-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-green-700">Checkout</h1>

          {/* Pasos e íconos */}
          <ul className="flex justify-between items-center mb-4">
            {steps.map((s, i) => {
              const idx    = i + 1;
              const done   = step > idx;
              const active = step === idx;
              return (
                <li key={i} className="flex-1 flex flex-col items-center">
                  <span className={`
                    p-2 rounded-full border-2
                    ${done   ? 'bg-green-600 border-green-600 text-white' : ''}
                    ${active ? 'bg-green-500 border-green-500 text-white' : ''}
                    ${!done && !active ? 'bg-gray-200 border-gray-300 text-gray-500' : ''}
                  `}>{s.icon}</span>
                  <span className={`mt-1 text-xs ${done || active ? 'text-green-700' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* Barra de progreso */}
          <div className="relative mb-4 h-1 bg-gray-200 rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-1 bg-green-600 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 120 }}
            />
          </div>

          {/* Paso 1: Envío */}
          {step === 1 && (
            <form onSubmit={e => { e.preventDefault(); next(); }} className="space-y-4 animate-fade">
              {(['nombre','email','telefono','direccion'] as const).map(f => (
                <div key={f}>
                  <label className="block text-sm font-medium mb-1">
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </label>
                  <input
                    name={f}
                    type={f === 'email' ? 'email' : 'text'}
                    value={(shipping as any)[f] || ''}
                    onChange={handleShipping}
                    required={f !== 'telefono'}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md">
                  Siguiente
                </button>
              </div>
            </form>
          )}

          {/* Paso 2: Pago */}
          {step === 2 && (
            <div className="space-y-4 animate-fade">
              <span className="block text-sm font-medium mb-2">Método de pago</span>
              <PaymentMethodSelector
                selected={payment.metodo}
                onChange={method => {
                  setPayment({ metodo: method as MetodoPago });
                  setCardToken('');
                  setTransferenciaRef('');
                }}
              />

              {/* Tarjeta */}
              {payment.metodo === 'tarjeta' && (
                <div className="space-y-3">
                  <div id="card-brick-container" style={{ minHeight: 200 }} />
                  <div className="flex justify-between">
                    <button onClick={back} className="px-4 py-2 border rounded-md">Atrás</button>
                    <button onClick={submitOrder} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded-md">
                      {loading ? 'Procesando...' : 'Pagar con Tarjeta'}
                    </button>
                  </div>
                </div>
              )}

              {/* Transferencia */}
              {payment.metodo === 'transferencia' && (
                <div className="space-y-4">
                  <p className="text-sm">
                    Por favor realiza tu transferencia al CBU/Alias:<br/>
                    <code className="font-mono bg-gray-100 px-2 py-1 rounded">{CBU_EMPRESA}</code>
                  </p>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tu referencia de transferencia</label>
                    <input
                      type="text"
                      placeholder="Por ejemplo: PEDIDO1234"
                      value={transferenciaRef}
                      onChange={e => setTransferenciaRef(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                    />
                  </div>
                  <p className="text-sm text-red-600">
                    <strong>Importante:</strong> en el concepto de tu transferencia<br/>
                    escribe <em>exactamente</em> la misma referencia para vincular el pago.
                  </p>
                  <p className="text-sm">
                    Envía tu comprobante por WhatsApp al&nbsp;
                    <a
                      href={`https://wa.me/${WPP_EMPRESA}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline"
                    >
                      +{WPP_EMPRESA}
                    </a>
                  </p>
                  <div className="flex justify-between">
                    <button onClick={back} className="px-4 py-2 border rounded-md">Atrás</button>
                    <button onClick={submitOrder} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded-md">
                      {loading ? 'Procesando...' : 'Continuar'}
                    </button>
                  </div>
                </div>
              )}

              {/* Efectivo */}
              {payment.metodo === 'efectivo' && (
                <div className="space-y-4 text-center">
                  <p>Elige efectivo y paga en nuestra tienda.</p>
                  <div className="flex justify-between">
                    <button onClick={back} className="px-4 py-2 border rounded-md">Atrás</button>
                    <button onClick={submitOrder} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded-md">
                      {loading ? 'Procesando...' : 'Continuar'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Paso 3: Revisión */}
          {step === 3 && (
            <div className="space-y-4 text-center animate-fade">
              <p><strong>Envío:</strong> {shipping.direccion}</p>
              <p><strong>Método:</strong> {payment.metodo}</p>
              <p className="text-lg font-bold"><strong>Total:</strong> ${total.toFixed(2)}</p>
              {payment.metodo === 'transferencia' ? (
                <button
                  onClick={handleConfirmTransfer}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  {loading ? 'Confirmando...' : 'He realizado la transferencia'}
                </button>
              ) : (
                <button
                  onClick={() => { emptyCart(); setStep(4); }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  Confirmar
                </button>
              )}
            </div>
          )}

          {/* Paso 4: Gracias */}
          {step === 4 && (
            <div className="text-center space-y-4 animate-fade">
              <h2 className="text-xl font-semibold text-green-700">¡Gracias por tu compra!</h2>
              <p>Tu pedido está en proceso.</p>
              <button onClick={() => router.push('/')} className="px-4 py-2 bg-green-600 text-white rounded-md">
                Volver al inicio
              </button>
            </div>
          )}
        </div>
        <style jsx>{fadeIn}</style>
      </div>
    </>
  );
}
