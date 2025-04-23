// src/components/checkout/CheckoutWizard.tsx
'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
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
  const emptyCart = () => updateCart([]);
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const steps = [
    { label: 'Envío', icon: <MapPin size={20} /> },
    { label: 'Pago', icon: <CreditCard size={20} /> },
    { label: 'Gracias', icon: <CheckCircle2 size={20} /> },
  ];

  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState<ShippingInfo>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });
  const [method, setMethod] = useState<MetodoPago>('efectivo');
  const [transferRef, setTransferRef] = useState('');
  const [prefId, setPrefId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateShipping = (): boolean => {
    const { nombre, email, direccion } = shipping;
    if (!nombre || !email || !direccion) {
      toast.error('Completa todos los datos de envío');
      return false;
    }
    return true;
  };

  const next = (): void => {
    if (step === 1 && !validateShipping()) return;
    setStep((s) => Math.min(s + 1, steps.length));
  };
  const back = (): void => setStep((s) => Math.max(s - 1, 1));

  const generatePreference = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch('/api/mp/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo generar preferencia');
      setPrefId(data.preferenceId);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error generando preferencia');
    } finally {
      setLoading(false);
    }
  };

  const submitOrder = async (cardToken?: string): Promise<void> => {
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
        metodo_pago: method,
        comprador_nombre: shipping.nombre,
        comprador_email: shipping.email,
        comprador_telefono: shipping.telefono,
        direccion_envio: shipping.direccion,
        ...(method === 'transferencia' && { transferencia_ref: transferRef }),
        ...(cardToken && { cardToken }),
      };
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error creando pedido');
      emptyCart();
      setStep(3);
      toast.success('Pago procesado con éxito');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error procesando pago');
    } finally {
      setLoading(false);
    }
  };

  const handleCardSubmit = (cardData: CardData) => {
    submitOrder(cardData.token);
  };

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <>
      <Toaster position="top-center" />
      <Script src="https://sdk.mercadopago.com/js/v2" />

      <div className="bg-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white p-6 space-y-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl text-center font-bold text-green-700">Checkout</h1>

          {/* Steps */}
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

          {/* Progress bar */}
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-6">
            <motion.div className="h-full bg-green-600 rounded-full" style={{ width: `${progress}%` }} />
          </div>

          {/* Step 1: Shipping */}
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); next(); }} className="space-y-4 animate-fade">
              <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  value={shipping.nombre}
                  onChange={(e) => setShipping({ ...shipping, nombre: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={shipping.email}
                  onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                  required
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
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                  required
                />
              </div>
              <div className="text-right">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md">
                  Siguiente
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-4 animate-fade">
              <p className="text-sm font-medium">Método de pago</p>
              <PaymentMethodSelector selected={method} onChange={(m) => {
                setMethod(m as MetodoPago);
                setPrefId(null);
                setTransferRef('');
              }} />

              {method === 'tarjeta' && (
                <>
                  {!prefId ? (
                    <button
                      onClick={generatePreference}
                      disabled={loading}
                      className="px-4 py-2 bg-green-600 text-white rounded-md"
                    >
                      {loading ? 'Cargando...' : 'Pagar con Tarjeta'}
                    </button>
                  ) : (
                    <CardPaymentForm preferenceId={prefId} onApprove={handleCardSubmit} />
                  )}
                </>
              )}

              {method === 'transferencia' && (
                <div className="space-y-2">
                  <p className="text-sm">
                    CBU: <code className="font-mono bg-gray-100 px-2 py-1">{process.env.NEXT_PUBLIC_CBU_EMPRESA}</code>
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
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WPP_NUMBER}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline text-green-600"
                    >
                      WhatsApp
                    </a>
                  </p>
                  <div className="flex justify-between">
                    <button onClick={back} className="px-4 py-2 border rounded-md">Atrás</button>
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

          {/* Step 3: Thank You */}
          {step === 3 && (
            <div className="text-center space-y-4 animate-fade">
              <CheckCircle2 size={48} className="text-green-600 mx-auto" />
              <h2 className="text-xl font-semibold">¡Gracias!</h2>
              <p>Tu pago se ha procesado exitosamente.</p>
              <button onClick={() => router.push('/')} className="px-4 py-2 bg-green-600 text-white rounded-md">
                Volver al inicio
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </>
  );
}
