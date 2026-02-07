// src/components/checkout/CheckoutWizard.tsx
'use client';

import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
} from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShoppingCart,
  Loader2,
  ShieldCheck
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import type { CreatePedidoDTO, MetodoPago } from '@/types/payment';
import Image from 'next/image';

// --- Interfaces & Types ---

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

// --- Animations ---

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

// Helper for inputs
const InputField = ({ 
  label, 
  value, 
  onChange, 
  type = "text", 
  required = false,
  placeholder = "" 
}: { 
  label: string, 
  value: string, 
  onChange: (val: string) => void, 
  type?: string, 
  required?: boolean,
  placeholder?: string
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
    />
  </div>
);

// --- Components ---

export default function CheckoutWizard(): React.ReactElement {
  const router = useRouter();
  const { cart, clearCart, getTotalPrice } = useCartStore();
  const total = getTotalPrice();

  // Steps configuration
  const steps = [
    { id: 1, label: 'Envío', icon: <MapPin size={20} /> },
    { id: 2, label: 'Pago', icon: <CreditCard size={20} /> },
    { id: 3, label: 'Listo', icon: <CheckCircle2 size={20} /> },
  ];

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0); // For animation direction
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

  const emptyCart = useCallback(() => clearCart(), [clearCart]);

  // Validation
  const validateShipping = () =>
    shipping.nombre.trim().length > 0 &&
    shipping.email.trim().length > 0 &&
    shipping.direccion.trim().length > 0;

  // Navigation
  const next = () => {
    if (step === 1 && !validateShipping()) {
      toast.error('Por favor completa todos los campos obligatorios (*)');
      return;
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, steps.length));
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  // MercadoPago Brick Integration
  useEffect(() => {
    if (step !== 2 || paymentMethod !== 'tarjeta' || !mpReady) return;

    const mp = new window.MercadoPago(
      process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string,
      { locale: 'es-AR' }
    );
    let activeCtrl: CardBrickController | null = null;

    const renderBrick = async () => {
      try {
        const raw = await mp.bricks().create(
          'cardPayment',
          'card-brick-container',
          {
            initialization: { amount: total },
            customization: { visual: { hidePaymentButton: true } },
            callbacks: {
              onReady: () => {},
              onError: (e: unknown) => {
                console.error(e);
                toast.error('Error cargando el formulario de tarjeta');
              },
            },
          }
        );
        activeCtrl = raw as unknown as CardBrickController;
        setCardCtrl(activeCtrl);
      } catch (e: unknown) {
        console.error(e);
        toast.error('No se pudo cargar el módulo de pago');
      }
    };

    renderBrick();

    return () => {
      activeCtrl?.unmount();
      setCardCtrl(null);
    };
  }, [step, paymentMethod, mpReady, total]);

  // Order Submission
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
        
        const res = await fetch('/api/pedidos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Idempotency-Key': idempotencyKey,
          },
          body: JSON.stringify({ ...payload, idempotencyKey }),
        });

        const json = await res.json();
        const { data, message } = json;

        if (!res.ok) throw new Error(message ?? 'Error creando pedido');

        setOrderId(data.orderId);
        emptyCart();
        toast.success('¡Pedido confirmado con éxito!');
        setDirection(1);
        setStep(3); // Go to Success Step
      } catch (e: unknown) {
        console.error(e);
        toast.error(e instanceof Error ? e.message : 'Error procesando pedido');
      } finally {
        setLoading(false);
      }
    },
    [cart, emptyCart, paymentMethod, shipping, transferRef, total]
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => setMpReady(true)}
      />

      <div className="min-h-screen py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* LEFT COLUMN: WIZARD STEPS */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Steps Indicator */}
              <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full z-0" />
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-green-600 -translate-y-1/2 rounded-full z-0 transition-all duration-500"
                  style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                />
                
                <div className="relative z-10 flex justify-between">
                  {steps.map((s, i) => {
                    const isActive = step >= s.id;
                    const isCurrent = step === s.id;
                    return (
                      <div key={s.id} className="flex flex-col items-center gap-2">
                        <div 
                          className={`
                            w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300
                            ${isActive ? 'bg-green-600 border-green-600 text-white shadow-lg scale-110' : 'bg-white border-gray-300 text-gray-400'}
                          `}
                        >
                          {s.icon}
                        </div>
                        <span className={`text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-green-700' : 'text-gray-400'}`}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form Container with Animation */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 overflow-hidden relative min-h-[400px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  
                  {/* STEP 1: ENVÍO */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="space-y-6"
                    >
                      <div className="border-b pb-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Datos de Envío</h2>
                        <p className="text-sm text-gray-500">Ingresa tus datos para recibir el pedido.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          label="Nombre Completo"
                          value={shipping.nombre}
                          onChange={(v) => setShipping(s => ({ ...s, nombre: v }))}
                          required
                          placeholder="Juan Pérez"
                        />
                        <InputField
                          label="Email"
                          type="email"
                          value={shipping.email}
                          onChange={(v) => setShipping(s => ({ ...s, email: v }))}
                          required
                          placeholder="juan@email.com"
                        />
                        <InputField
                          label="Teléfono"
                          type="tel"
                          value={shipping.telefono}
                          onChange={(v) => setShipping(s => ({ ...s, telefono: v }))}
                          placeholder="11 1234 5678"
                        />
                        <InputField
                          label="Dirección de Envío"
                          value={shipping.direccion}
                          onChange={(v) => setShipping(s => ({ ...s, direccion: v }))}
                          required
                          placeholder="Av. Siempre Viva 123"
                        />
                      </div>

                      <div className="flex justify-end pt-6">
                        <button
                          onClick={next}
                          className="group flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                          Continuar al Pago
                          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: PAGO */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="space-y-6"
                    >
                      <div className="border-b pb-4 mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Método de Pago</h2>
                        <p className="text-sm text-gray-500">Selecciona cómo deseas abonar tu pedido.</p>
                      </div>

                      <PaymentMethodSelector
                        selected={paymentMethod}
                        onChange={(m) => setPaymentMethod(m as MetodoPago)}
                      />

                      <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                        {paymentMethod === 'tarjeta' && (
                          <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                              <CreditCard size={18} /> Tarjeta de Crédito/Débito
                            </h3>
                            <div id="card-brick-container" className="min-h-[200px]" />
                            <button
                              disabled={!cardCtrl || loading}
                              onClick={async () => {
                                if (!cardCtrl) return;
                                try {
                                  setLoading(true);
                                  const formData = await cardCtrl.getFormData();
                                  await submitOrder({
                                    cardToken: formData.token,
                                    payment_method_id: formData.payment_method_id,
                                    installments: formData.installments,
                                  });
                                } catch (e) {
                                  console.error(e);
                                  toast.error('Verifica los datos de la tarjeta');
                                  setLoading(false);
                                }
                              }}
                              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                            >
                              {loading ? <Loader2 className="animate-spin" /> : 'Pagar Ahora'}
                            </button>
                          </div>
                        )}

                        {paymentMethod === 'transferencia' && (
                          <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                              <ShieldCheck size={18} /> Transferencia Bancaria
                            </h3>
                            <p className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-100">
                              Realiza la transferencia a la cuenta que te enviaremos por email y adjunta el comprobante o referencia aquí.
                            </p>
                            <InputField
                              label="Número de Comprobante / Referencia"
                              value={transferRef}
                              onChange={setTransferRef}
                              placeholder="Ej: 12345678"
                            />
                            <button
                              disabled={loading}
                              onClick={() => submitOrder()}
                              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-bold transition-all disabled:opacity-50 shadow-md"
                            >
                              {loading ? <Loader2 className="animate-spin" /> : 'Confirmar Pedido'}
                            </button>
                          </div>
                        )}

                        {paymentMethod === 'efectivo' && (
                          <div className="space-y-4">
                             <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                              <CheckCircle2 size={18} /> Pago en Efectivo
                            </h3>
                            <p className="text-sm text-gray-600 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                              Abonarás al momento de la entrega o retiro.
                            </p>
                            <button
                              disabled={loading}
                              onClick={() => submitOrder()}
                              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-bold transition-all disabled:opacity-50 shadow-md"
                            >
                              {loading ? <Loader2 className="animate-spin" /> : 'Confirmar Pedido'}
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-start pt-4">
                         <button
                          onClick={back}
                          className="text-gray-500 hover:text-gray-800 flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <ChevronLeft size={16} /> Volver a Envío
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: GRACIAS */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", duration: 0.8 }}
                      className="flex flex-col items-center justify-center text-center py-12 space-y-6"
                    >
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                        <CheckCircle2 size={48} />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Gracias por tu compra!</h2>
                        <p className="text-gray-500 text-lg">Tu pedido <span className="font-mono font-bold text-gray-800">#{orderId}</span> ha sido confirmado.</p>
                      </div>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Te enviamos un email con los detalles. Nos pondremos en contacto contigo pronto para coordinar el envío.
                      </p>
                      <button
                        onClick={() => router.push('/')}
                        className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl mt-8"
                      >
                        Volver a la Tienda
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY (Sticky) */}
            <div className="lg:col-span-4">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6 pb-4 border-b">
                    <ShoppingCart size={20} className="text-green-600" />
                    Resumen del Pedido
                  </h3>

                  {cart.length === 0 && step < 3 ? (
                    <p className="text-gray-500 text-sm text-center py-4">Tu carrito está vacío.</p>
                  ) : (
                    <div className="space-y-4">
                      <ul className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {cart.map((item) => (
                          <li key={item.id} className="flex gap-4">
                             <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                               <Image 
                                 src={item.thumbnail.startsWith('http') ? item.thumbnail : `/images/productos/${item.thumbnail}`}
                                 alt={item.name}
                                 fill
                                 className="object-cover"
                                 sizes="64px"
                                 onError={(e) => {
                                   // fallback logic handled by next/image or parent component usually
                                 }}
                               />
                             </div>
                             <div className="flex-1 min-w-0">
                               <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                               <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                               <p className="text-sm font-semibold text-green-700 mt-1">
                                 ${(item.price * item.quantity).toFixed(2)}
                               </p>
                             </div>
                          </li>
                        ))}
                      </ul>

                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Envío</span>
                          <span className="text-green-600 font-medium">A convenir</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t mt-2">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {step < 3 && (
                     <div className="mt-6 pt-4 border-t text-center">
                        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                          <ShieldCheck size={14} /> Compra 100% Segura
                        </p>
                     </div>
                  )}
               </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
