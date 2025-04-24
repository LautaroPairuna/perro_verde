// src/components/checkout/CheckoutWizard.tsx
'use client';

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  ChangeEvent,
} from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  MapPin,
  ClipboardCheck,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import type { CreatePedidoDTO, MetodoPago } from '@/types/payment';

interface CardBrickController {
  getFormData(): Promise<{
    token: string;
    payment_method_id: string;
    installments: number;
    issuer_id?: string;
    transaction_amount?: number;
    payer?: unknown;
  }>;
  unmount(): void;
}

interface ShippingInfo {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

type CardData = {
  cardToken: string;
  payment_method_id: string;
  installments: number;
};

export default function CheckoutWizard(): React.ReactElement {
  const router = useRouter();
  const { cart, updateCart } = useCart();

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const steps = [
    { label: 'Envío', icon: <MapPin size={20} /> },
    { label: 'Revisión', icon: <ClipboardCheck size={20} /> },
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
  const [paymentMethod, setPaymentMethod] = useState<MetodoPago>('efectivo');
  const [transferRef, setTransferRef] = useState('');
  const [orderId, setOrderId] = useState<number | null>(null);

  const [mpReady, setMpReady] = useState(false);
  const [cardCtrl, setCardCtrl] = useState<CardBrickController | null>(null);
  const [loading, setLoading] = useState(false);

  const emptyCart = useCallback(() => updateCart([]), [updateCart]);
  const validateShipping = () =>
    !!shipping.nombre && !!shipping.email && !!shipping.direccion;
  const next = () => {
    if (step === 1 && !validateShipping()) {
      toast.error('Completa los datos de envío');
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length));
  };
  const back = () => setStep((s) => Math.max(s - 1, 1));

  useEffect(() => {
    if (step !== 3 || paymentMethod !== 'tarjeta' || !mpReady) return;

    const mp = new window.MercadoPago(
      process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string,
      { locale: 'es-AR' }
    );
    let activeCtrl: CardBrickController | null = null;

    (async () => {
      try {
        const raw = await mp.bricks().create(
          'cardPayment',
          'card-brick-container',
          {
            initialization: { amount: total },
            customization: { visual: { hidePaymentButton: true } },
            callbacks: {
              onReady: () => toast.success('Formulario listo'),
              onError: (e: unknown) => {
                console.error(e);
                toast.error('Error en el formulario');
              },
            },
          }
        );
        activeCtrl = raw as unknown as CardBrickController;
        setCardCtrl(activeCtrl);
      } catch (e: unknown) {
        console.error(e);
        toast.error('No se pudo cargar el Brick');
      }
    })();

    return () => {
      activeCtrl?.unmount();
      setCardCtrl(null);
    };
  }, [step, paymentMethod, mpReady, total]);

  const submitOrder = useCallback(
    async (cardData?: CardData) => {
      setLoading(true);
      try {
        const payload: CreatePedidoDTO = {
          datos: cart.map(({ id, name, price, quantity }) => ({
            id: Number(id),
            name,
            price,
            quantity,
          })),
          total,
          metodo_pago: paymentMethod,
          comprador_nombre: shipping.nombre,
          comprador_email: shipping.email,
          comprador_telefono: shipping.telefono,
          direccion_envio: shipping.direccion,
          ...(paymentMethod === 'transferencia' && {
            transferencia_ref: transferRef,
          }),
          ...(paymentMethod === 'tarjeta' && cardData && {
            cardToken:          cardData.cardToken,
            payment_method_id:  cardData.payment_method_id,
            installments:       cardData.installments,
          }),
        };

        const idempotencyKey = crypto.randomUUID();
        console.log('➡️ Payload /api/pedidos:', { payload, idempotencyKey });

        const res = await fetch('/api/pedidos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Idempotency-Key': idempotencyKey,
          },
          body: JSON.stringify({ ...payload, idempotencyKey }),
        });

        const json = await res.json();
        console.log('⬅️ /api/pedidos response:', json);

        const { data, message } = json;
        if (!res.ok) throw new Error(message ?? 'Error creando pedido');

        setOrderId(data.orderId);
        emptyCart();
        toast.success('Pedido confirmado');
        setStep(4);
      } catch (e: unknown) {
        console.error(e);
        toast.error(e instanceof Error ? e.message : 'Error procesando pedido');
      } finally {
        setLoading(false);
      }
    },
    [cart, emptyCart, paymentMethod, shipping, transferRef, total]
  );

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <>
      <Toaster position="top-center" />
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => setMpReady(true)}
      />

      <div className="bg-green-50 flex justify-center p-4">
        <div className="w-full max-w-xl bg-white p-6 space-y-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-green-700">
            Checkout
          </h1>

          <ul className="flex justify-between mb-4">
            {steps.map((s, i) => (
              <li key={s.label} className="flex-1 text-center">
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

          <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-green-600 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* STEP 1: ENVÍO */}
          {step === 1 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                next();
              }}
              className="space-y-4 animate-fadeIn"
            >
              {(['nombre', 'email', 'telefono', 'direccion'] as const).map(
                (field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium capitalize">
                      {field}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={shipping[field]}
                      onChange={(
                        e: ChangeEvent<HTMLInputElement>
                      ) =>
                        setShipping((s) => ({
                          ...s,
                          [field]: e.target.value,
                        }))
                      }
                      required={field !== 'telefono'}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                    />
                  </div>
                )
              )}
              <div className="text-right">
                <button className="px-4 py-2 bg-green-600 text-white rounded-md">
                  Siguiente
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: REVISIÓN */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-lg font-semibold">Revisa tu pedido</h2>
              <ul className="divide-y">
                {cart.map((p) => (
                  <li
                    key={p.id}
                    className="flex justify-between py-2 text-sm"
                  >
                    <span>
                      {p.name} x{p.quantity}
                    </span>
                    <span>${(p.price * p.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right font-semibold">
                Total: ${total.toFixed(2)}
              </div>
              <button
                onClick={next}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-md"
              >
                Continuar al pago
              </button>
              <button
                onClick={back}
                className="w-full px-4 py-2 border mt-2 rounded-md"
              >
                Atrás
              </button>
            </div>
          )}

          {/* STEP 3: PAGO */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <PaymentMethodSelector
                selected={paymentMethod}
                onChange={(m) => setPaymentMethod(m as MetodoPago)}
              />

              {paymentMethod === 'tarjeta' && (
                <div className="space-y-4">
                  <div
                    id="card-brick-container"
                    style={{ minHeight: 200 }}
                  />
                  <button
                    disabled={!cardCtrl || loading}
                    onClick={async () => {
                      if (!cardCtrl) return;
                      try {
                        setLoading(true);
                        const formData = await cardCtrl.getFormData();
                        console.log('🔥 Bricks.getFormData →', formData);
                        await submitOrder({
                          cardToken:        formData.token,
                          payment_method_id: formData.payment_method_id,
                          installments:     formData.installments,
                        });
                      } catch (e) {
                        console.error(e);
                        toast.error('No se pudo generar el token');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-md"
                  >
                    {loading ? 'Procesando…' : 'Pagar con tarjeta'}
                  </button>
                </div>
              )}

              {paymentMethod === 'transferencia' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Referencia de transferencia"
                    value={transferRef}
                    onChange={(
                      e: ChangeEvent<HTMLInputElement>
                    ) => setTransferRef(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                  />
                  <button
                    disabled={loading}
                    onClick={() => submitOrder()}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-md"
                  >
                    {loading ? 'Procesando…' : 'Registrar pago'}
                  </button>
                </div>
              )}

              {paymentMethod === 'efectivo' && (
                <button
                  disabled={loading}
                  onClick={() => submitOrder()}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-md"
                >
                  {loading ? 'Procesando…' : 'Confirmar pago en efectivo'}
                </button>
              )}

              <button onClick={back} className="px-4 py-2 border rounded-md">
                Atrás
              </button>
            </div>
          )}

          {/* STEP 4: GRACIAS */}
          {step === 4 && (
            <div className="text-center space-y-4 animate-fadeIn">
              <h2 className="text-xl font-semibold text-green-700">
                ¡Gracias!
              </h2>
              <p>Tu pedido (ID: {orderId}) ha sido confirmado.</p>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Volver al inicio
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
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
}
