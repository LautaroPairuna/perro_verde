// src/components/checkout/CheckoutWizard.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useCart } from '@/context/CartContext';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { CreatePedidoDTO, MetodoPago } from '@/types/payment';

/** Controlador del Brick de tarjeta */
interface CardBrickController {
  createCardToken(): Promise<{ token: string; error?: unknown }>;
}

interface ShippingInfo {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

export default function CheckoutWizard(): React.ReactElement {
  const router = useRouter();
  const { cart, updateCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const steps = [
    { label: 'Envío', icon: <MapPin size={20} /> },
    { label: 'Pago', icon: <CreditCard size={20} /> },
    { label: 'Gracias', icon: <CheckCircle2 size={20} /> },
  ];

  // Estados
  const [step, setStep] = useState<number>(1);
  const [shipping, setShipping] = useState<ShippingInfo>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<MetodoPago>('efectivo');
  const [transferRef, setTransferRef] = useState<string>('');
  const [orderId, setOrderId] = useState<number | null>(null);
  const [mpLoaded, setMpLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cardController, setCardController] = useState<CardBrickController | null>(null);

  // Vaciar carrito (memoizado)
  const emptyCart = useCallback(() => {
    updateCart([]);
  }, [updateCart]);

  const validateShipping = (): boolean => {
    if (!shipping.nombre || !shipping.email || !shipping.direccion) {
      toast.error('Completa los datos de envío');
      return false;
    }
    return true;
  };

  const next = (): void => {
    if (step === 1 && !validateShipping()) return;
    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const back = (): void => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Montar/desmontar Brick de tarjeta, ocultando su botón interno
  useEffect(() => {
    if (step !== 2 || paymentMethod !== 'tarjeta' || !mpLoaded) return;

    const mp = new window.MercadoPago(
      process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string,
      { locale: 'es-AR' }
    );

    const controller = mp.bricks().create(
      'cardPayment',
      'card-brick-container',
      {
        initialization: { amount: total },
        customization: { visual: { hidePaymentButton: true } },
        callbacks: {
          onReady: () => toast.success('Formulario listo'),
          onError: (error) => {
            console.error('MP Brick error:', error);
            toast.error('Error en formulario de tarjeta');
          },
          onSubmit: () => {
            /* ignoramos la llamada interna */
          },
        },
      }
    );

    setCardController(controller);

    return () => {
      try {
        mp.bricks().unmount('cardPayment');
      } catch {}
      setCardController(null);
    };
  }, [step, paymentMethod, mpLoaded, total]);

  // Función que procesa el pedido (tarjeta, transferencia o efectivo)
  const submitOrder = useCallback(
    async (cardToken?: string, idempotencyKey?: string) => {
      setLoading(true);
      try {
        const payload: CreatePedidoDTO = {
          datos: cart.map((item) => ({
            id: Number(item.id),
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total,
          metodo_pago: paymentMethod,
          comprador_nombre: shipping.nombre,
          comprador_email: shipping.email,
          comprador_telefono: shipping.telefono,
          direccion_envio: shipping.direccion,
          ...(paymentMethod === 'transferencia' && { transferencia_ref: transferRef }),
          ...(cardToken && { cardToken }),
          ...(idempotencyKey && { idempotencyKey }),
        };

        const res = await fetch('/api/pedidos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Error creando pedido');

        setOrderId(data.data.orderId);
        emptyCart();
        toast.success(
          paymentMethod === 'tarjeta'
            ? 'Pago con tarjeta registrado'
            : paymentMethod === 'transferencia'
            ? 'Pago por transferencia registrado'
            : 'Pago en efectivo registrado'
        );
        setStep(3);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error procesando pedido';
        console.error('submitOrder error:', err);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [cart, paymentMethod, shipping, transferRef, total, emptyCart]
  );

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <>
      <Toaster position="top-center" />
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => setMpLoaded(true)}
      />

      <div className="bg-green-50 flex justify-center p-4">
        <div className="w-full max-w-xl bg-white p-6 space-y-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-green-700">Checkout</h1>

          {/* Pasos */}
          <ul className="flex justify-between mb-4">
            {steps.map((s, i) => (
              <li key={i} className="flex-1 text-center">
                <div
                  className={`inline-block p-2 border-2 rounded-full ${
                    step > i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s.icon}
                </div>
                <p className={`mt-1 text-xs ${step >= i + 1 ? 'text-green-700' : 'text-gray-500'}`}>
                  {s.label}
                </p>
              </li>
            ))}
          </ul>

          {/* Barra de progreso */}
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-6">
            <motion.div className="h-full bg-green-600 rounded-full" style={{ width: `${progress}%` }} />
          </div>

          {/* Step 1: Datos de envío */}
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                next();
              }}
              className="space-y-4 animate-fadeIn"
            >
              <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  value={shipping.nombre}
                  onChange={(e) => setShipping({ ...shipping, nombre: e.target.value })}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={shipping.email}
                  onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Teléfono</label>
                <input
                  type="text"
                  value={shipping.telefono}
                  onChange={(e) => setShipping({ ...shipping, telefono: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Dirección</label>
                <input
                  type="text"
                  value={shipping.direccion}
                  onChange={(e) => setShipping({ ...shipping, direccion: e.target.value })}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                />
              </div>
              <div className="text-right">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md">
                  Siguiente
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Pago */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <p className="text-sm font-medium">Método de pago</p>
              <PaymentMethodSelector selected={paymentMethod} onChange={(m) => setPaymentMethod(m as MetodoPago)} />

              {/* Tarjeta */}
              {paymentMethod === 'tarjeta' && (
                <div className="space-y-4">
                  <div id="card-brick-container" style={{ minHeight: 200 }} />
                  <button
                    disabled={!cardController || loading}
                    onClick={() => {
                      if (!cardController) return;
                      const key = crypto.randomUUID();
                      setLoading(true);
                      cardController
                        .createCardToken()
                        .then(({ token, error }: { token: string; error?: unknown }) => {
                          if (error || !token) throw error || new Error('No se creó el token');
                          submitOrder(token, key);
                        })
                        .catch((e: unknown) => {
                          console.error('Token Error:', e);
                          toast.error('No se pudo generar token');
                        })
                        .finally(() => setLoading(false));
                    }}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-md"
                  >
                    {loading ? 'Procesando…' : 'Pagar con tarjeta'}
                  </button>
                </div>
              )}

              {/* Transferencia */}
              {paymentMethod === 'transferencia' && (
                <div className="space-y-4">
                  <p className="text-sm">Ingresa tu referencia de transferencia:</p>
                  <input
                    type="text"
                    placeholder="Referencia"
                    value={transferRef}
                    onChange={(e) => setTransferRef(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                  />
                  <button
                    disabled={loading}
                    onClick={() => submitOrder()}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-md"
                  >
                    {loading ? 'Procesando…' : 'Pagar por transferencia'}
                  </button>
                </div>
              )}

              {/* Efectivo */}
              {paymentMethod === 'efectivo' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">Pagarás en efectivo a la entrega.</p>
                  <button
                    disabled={loading}
                    onClick={() => submitOrder()}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-md"
                  >
                    {loading ? 'Procesando…' : 'Confirmar y pagar en efectivo'}
                  </button>
                </div>
              )}

              <div className="flex justify-between">
                <button onClick={back} className="px-4 py-2 border rounded-md">
                  Atrás
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Gracias */}
          {step === 3 && (
            <div className="text-center space-y-4 animate-fadeIn">
              <h2 className="text-xl font-semibold text-green-700">¡Gracias!</h2>
              <p>Tu pedido (ID: {orderId}) ha sido confirmado.</p>
              <button onClick={() => router.push('/')} className="px-4 py-2 bg-green-600 text-white rounded-md">
                Volver al inicio
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Animación */}
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
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
}
