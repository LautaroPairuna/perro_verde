// src/components/checkout/CheckoutWizard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useCart } from '@/context/CartContext';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { CreatePedidoDTO, MetodoPago } from '@/types/payment';

declare global {
  interface Window {
    MercadoPago?: new (
      publicKey: string,
      opts: { locale: string }
    ) => {
      bricks(): {
        create(
          name: 'cardPayment',
          containerId: string,
          options: {
            initialization: { amount: number };
            callbacks: {
              onReady: () => void;
              onSubmit: (data: { token: string }) => void;
              onError: (error: any) => void;
            };
          }
        ): void;
        unmount(name: string): void;
      };
    };
  }
}

export default function CheckoutWizard(): React.ReactElement {
  const router = useRouter();
  const { cart, updateCart } = useCart();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const emptyCart = () => updateCart([]);

  const steps = [
    { label: 'Envío', icon: <MapPin size={20} /> },
    { label: 'Pago', icon: <CreditCard size={20} /> },
    { label: 'Revisión', icon: <CheckCircle2 size={20} /> },
    { label: 'Gracias', icon: <CheckCircle2 size={20} /> },
  ];

  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<MetodoPago>('efectivo');
  const [transferRef, setTransferRef] = useState('');
  const [orderId, setOrderId] = useState<number | null>(null);
  const [mpLoaded, setMpLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const CBU = process.env.NEXT_PUBLIC_CBU_EMPRESA ?? '';
  const WPP = process.env.NEXT_PUBLIC_WPP_NUMBER ?? '';

  const validateShipping = (): boolean => {
    if (!shipping.nombre || !shipping.email || !shipping.direccion) {
      toast.error('Completa los datos de envío');
      return false;
    }
    return true;
  };

  const next = (): void => {
    if (step === 1 && !validateShipping()) return;
    setStep((s) => Math.min(s + 1, steps.length));
  };
  const back = (): void => {
    setStep((s) => Math.max(s - 1, 1));
  };

  // Montar el Brick de tarjeta en el paso 2
  useEffect(() => {
    if (step !== 2 || paymentMethod !== 'tarjeta' || !mpLoaded) return;

    const mp = new window.MercadoPago!(
      process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string,
      { locale: 'es-AR' }
    );
    mp.bricks().create('cardPayment', 'card-brick-container', {
      initialization: { amount: total },
      callbacks: {
        onReady: () => toast.success('Formulario listo'),
        onSubmit: ({ token }) => submitOrder(token),
        onError: (error) => {
          console.error('MP Brick error:', error);
          toast.error('Error en formulario de tarjeta');
        },
      },
    });

    return () => {
      try {
        mp.bricks().unmount('cardPayment');
      } catch {}
    };
  }, [step, paymentMethod, mpLoaded, total]);

  const submitOrder = async (cardToken?: string) => {
    setLoading(true);
    try {
      const payload: CreatePedidoDTO = {
        datos: cart.map((i) => ({
          id: Number(i.id),
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        total,
        metodo_pago: paymentMethod,
        comprador_nombre: shipping.nombre,
        comprador_email: shipping.email,
        comprador_telefono: shipping.telefono,
        direccion_envio: shipping.direccion,
        ...(paymentMethod === 'transferencia' && { transferencia_ref: transferRef }),
        ...(cardToken && { cardToken }),
      };
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error creando pedido');
      setOrderId(data.orderId);
      // Avanzar al paso 3 independientemente del método
      setStep(3);
      emptyCart();
      toast.success(
        paymentMethod === 'tarjeta'
          ? 'Pago con tarjeta registrado'
          : 'Pedido creado. Completa el pago.'
      );
    } catch (err: any) {
      console.error('submitOrder error:', err);
      toast.error(err.message || 'Error procesando pedido');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const endpoint =
        paymentMethod === 'tarjeta'
          ? `/api/pedidos/${orderId}/confirm-card`
          : `/api/pedidos/${orderId}/confirm-transfer`;
      const body =
        paymentMethod === 'tarjeta'
          ? { cardToken: sessionStorage.getItem('checkout-cardToken')! }
          : { transferencia_ref: transferRef };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('No se pudo confirmar pago');
      toast.success('Pago confirmado');
      setStep(4);
    } catch (err) {
      console.error('confirm error:', err);
      toast.error('Error confirmando pago');
    } finally {
      setLoading(false);
    }
  };

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <>
      <Toaster position="top-center" />
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => setMpLoaded(true)}
      />

      <div className="bg-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white p-6 space-y-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-green-700">
            Checkout
          </h1>

          {/* Steps */}
          <ul className="flex justify-between mb-4">
            {steps.map((s, i) => (
              <li key={i} className="flex-1 text-center">
                <div
                  className={`inline-block p-2 border-2 rounded-full ${
                    step > i + 1
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s.icon}
                </div>
                <p
                  className={`mt-1 text-xs ${
                    step >= i + 1 ? 'text-green-700' : 'text-gray-500'
                  }`}
                >
                  {s.label}
                </p>
              </li>
            ))}
          </ul>

          {/* Progress Bar */}
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-green-600 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step 1: Shipping */}
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                next();
              }}
              className="space-y-4 animate-fade"
            >
              <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  value={shipping.nombre}
                  onChange={(e) =>
                    setShipping({ ...shipping, nombre: e.target.value })
                  }
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={shipping.email}
                  onChange={(e) =>
                    setShipping({ ...shipping, email: e.target.value })
                  }
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Teléfono</label>
                <input
                  type="text"
                  value={shipping.telefono}
                  onChange={(e) =>
                    setShipping({ ...shipping, telefono: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Dirección</label>
                <input
                  type="text"
                  value={shipping.direccion}
                  onChange={(e) =>
                    setShipping({ ...shipping, direccion: e.target.value })
                  }
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  Siguiente
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-4 animate-fade">
              <p className="text-sm font-medium">Método de pago</p>
              <PaymentMethodSelector
                selected={paymentMethod}
                onChange={(m) => setPaymentMethod(m as MetodoPago)}
              />

              {paymentMethod === 'tarjeta' && (
                <div
                  id="card-brick-container"
                  style={{ minHeight: 200 }}
                />
              )}

              {paymentMethod === 'transferencia' && (
                <div className="space-y-2">
                  <p className="text-sm">
                    CBU:{' '}
                    <code className="font-mono bg-gray-100 px-2 py-1">
                      {CBU}
                    </code>
                  </p>
                  <input
                    type="text"
                    placeholder="Referencia"
                    value={transferRef}
                    onChange={(e) => setTransferRef(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                  />
                  <p className="text-sm">
                    Envía comprobante por{' '}
                    <a
                      href={`https://wa.me/${WPP}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-green-600"
                    >
                      WhatsApp
                    </a>
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={back}
                      className="px-4 py-2 border rounded-md"
                    >
                      Atrás
                    </button>
                    <button
                      onClick={() => submitOrder()}
                      disabled={loading}
                      className="px-4 py-2 bg-green-600 text-white rounded-md"
                    >
                      {loading ? 'Procesando...' : 'Continuar'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <div className="text-center space-y-4 animate-fade">
              {paymentMethod === 'tarjeta' ? (
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  {loading ? 'Confirmando...' : 'He completado el pago'}
                </button>
              ) : (
                <button
                  onClick={() => router.push('/')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  Finalizar
                </button>
              )}
            </div>
          )}

          {/* Step 4: Thank You */}
          {step === 4 && (
            <div className="text-center space-y-4 animate-fade">
              <h2 className="text-xl font-semibold text-green-700">¡Gracias!</h2>
              <p>Tu pedido está confirmado.</p>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Inicio
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
}
