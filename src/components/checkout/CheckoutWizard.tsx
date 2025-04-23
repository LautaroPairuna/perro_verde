// src/components/checkout/CheckoutWizard.tsx
'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useCart } from '@/context/CartContext';
import { MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { CreatePedidoDTO, MetodoPago } from '@/types/payment';
import { CardPaymentForm, CardData } from './CardPaymentForm';

interface ShippingInfo {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

export default function CheckoutWizard(): React.JSX.Element {
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
  const [shipping, setShipping] = useState<ShippingInfo>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });
  const [payment, setPayment] = useState<{ metodo: MetodoPago }>({
    metodo: 'efectivo',
  });
  const [transferenciaRef, setTransferenciaRef] = useState('');
  const [orderId, setOrderId] = useState<number | null>(null);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const CBU_EMPRESA = process.env.NEXT_PUBLIC_CBU_EMPRESA ?? '';
  const WPP_EMPRESA = process.env.NEXT_PUBLIC_WPP_NUMBER ?? '';

  const validateShipping = () => {
    const { nombre, email, direccion } = shipping;
    if (!nombre || !email || !direccion) {
      toast.error('Completa los datos de envío');
      return false;
    }
    return true;
  };

  const next = () => {
    if (step === 1 && !validateShipping()) return;
    setStep((s) => Math.min(s + 1, steps.length));
  };
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const generarPreference = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/mp/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setPreferenceId(data.preferenceId);
    } catch {
      toast.error('No se pudo crear preferencia de pago');
    } finally {
      setLoading(false);
    }
  };

  const submitOrder = async () => {
    setLoading(true);
    const payload: CreatePedidoDTO = {
      datos: cart.map((i) => ({
        id: Number(i.id),
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      total,
      metodo_pago: payment.metodo,
      comprador_nombre: shipping.nombre,
      comprador_email: shipping.email,
      comprador_telefono: shipping.telefono,
      direccion_envio: shipping.direccion,
      ...(payment.metodo === 'transferencia' && {
        transferencia_ref: transferenciaRef,
      }),
    };
    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error');
      setOrderId(data.orderId);
      if (payment.metodo !== 'tarjeta') {
        setStep(3);
        emptyCart();
      }
      toast.success('Pedido creado. Completa el pago.');
    } catch {
      toast.error('Error al crear pedido');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const endpoint =
        payment.metodo === 'tarjeta'
          ? `/api/pedidos/${orderId}/confirm-card`
          : `/api/pedidos/${orderId}/confirm-transfer`;
      const body =
        payment.metodo === 'tarjeta'
          ? { cardToken: sessionStorage.getItem('checkout-cardToken')! }
          : { transferencia_ref: transferenciaRef };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      emptyCart();
      setStep(4);
      toast.success('Pago confirmado');
    } catch {
      toast.error('No se pudo confirmar pago');
    } finally {
      setLoading(false);
    }
  };

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <>
      <Toaster position="top-center" />
      {/* Carga del SDK de MercadoPago */}
      <Script src="https://sdk.mercadopago.com/js/v2" />

      <div className="bg-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white p-6 space-y-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl text-center font-bold text-green-700">
            Checkout
          </h1>

          {/* Barra de pasos */}
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

          {/* Barra de progreso */}
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-green-600 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Paso 1: Envío */}
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                next();
              }}
              className="space-y-4 animate-fade"
            >
              {(['nombre', 'email', 'telefono', 'direccion'] as const).map(
                (field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-1">
                      {field.toUpperCase()}
                    </label>
                    <input
                      name={field}
                      type={field === 'email' ? 'email' : 'text'}
                      value={(shipping as any)[field]}
                      onChange={(e) =>
                        setShipping({
                          ...shipping,
                          [field]: e.target.value,
                        })
                      }
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                      required={field !== 'telefono'}
                    />
                  </div>
                )
              )}
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

          {/* Paso 2: Pago */}
          {step === 2 && (
            <div className="space-y-4 animate-fade">
              <p className="text-sm font-medium">Método de pago</p>
              <PaymentMethodSelector
                selected={payment.metodo}
                onChange={(m) => {
                  setPayment({ metodo: m as MetodoPago });
                  setPreferenceId(null);
                  setTransferenciaRef('');
                }}
              />

              {/* Pago con Tarjeta */}
              {payment.metodo === 'tarjeta' && (
                <>
                  {!preferenceId ? (
                    <button
                      onClick={generarPreference}
                      disabled={loading}
                      className="px-4 py-2 bg-green-600 text-white rounded-md"
                    >
                      {loading ? 'Cargando...' : 'Pagar con Tarjeta'}
                    </button>
                  ) : (
                    <CardPaymentForm
                      preferenceId={preferenceId}
                      onApprove={async (cardData: CardData) => {
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
                            metodo_pago: 'tarjeta',
                            comprador_nombre: shipping.nombre,
                            comprador_email: shipping.email,
                            comprador_telefono: shipping.telefono,
                            direccion_envio: shipping.direccion,
                            cardToken: cardData.token,
                          };
                          const res = await fetch('/api/pedidos', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(payload),
                          });
                          const data = await res.json();
                          if (!res.ok) throw new Error(data.message || 'Error');
                          setOrderId(data.orderId);
                          emptyCart();
                          setStep(4);
                          toast.success('Pago con tarjeta exitoso');
                        } catch {
                          toast.error('Falló el pago con tarjeta');
                        } finally {
                          setLoading(false);
                        }
                      }}
                    />
                  )}
                </>
              )}

              {/* Pago por Transferencia */}
              {payment.metodo === 'transferencia' && (
                <div className="space-y-2">
                  <p className="text-sm">
                    CBU:{' '}
                    <code className="font-mono bg-gray-100 px-2 py-1">
                      {CBU_EMPRESA}
                    </code>
                  </p>
                  <input
                    type="text"
                    placeholder="Referencia"
                    value={transferenciaRef}
                    onChange={(e) => setTransferenciaRef(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                  />
                  <p className="text-sm">
                    Envía comprobante por{' '}
                    <a
                      href={`https://wa.me/${WPP_EMPRESA}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-green-600"
                    >
                      WhatsApp
                    </a>
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={back}
                  className="px-4 py-2 border rounded-md"
                >
                  Atrás
                </button>
                {payment.metodo !== 'tarjeta' && (
                  <button
                    onClick={submitOrder}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-md"
                  >
                    {loading ? 'Procesando...' : 'Continuar'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Paso 3: Revisión */}
          {step === 3 && (
            <div className="text-center space-y-4 animate-fade">
              <p className="text-sm">
                <strong>Envío:</strong> {shipping.direccion}
              </p>
              <p className="text-sm">
                <strong>Método:</strong> {payment.metodo}
              </p>
              <p className="text-lg font-bold">
                Total: ${total.toFixed(2)}
              </p>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                {loading ? 'Confirmando...' : 'He completado el pago'}
              </button>
            </div>
          )}

          {/* Paso 4: Gracias */}
          {step === 4 && (
            <div className="text-center space-y-4 animate-fade">
              <h2 className="text-xl font-semibold text-green-700">
                ¡Gracias!
              </h2>
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
