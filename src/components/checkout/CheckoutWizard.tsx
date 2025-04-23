// src/components/checkout/CheckoutWizard.tsx
'use client';

import React, { useReducer, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useCart } from '@/context/CartContext';
import { MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';
import { MetodoPago, CreatePedidoDTO } from '@/types/payment';

// --- Zod Schemas ---
const shippingSchema = z.object({
  nombre: z.string().nonempty('Nombre es obligatorio'),
  email: z.string().email('Email inválido'),
  telefono: z.string().optional(),
  direccion: z.string().nonempty('Dirección es obligatoria'),
});
type ShippingData = z.infer<typeof shippingSchema>;

// --- MercadoPago Types ---
interface MercadoPagoConstructor {
  new (key: string, opts: { locale: string }): any;
}
declare global {
  interface Window { MercadoPago: MercadoPagoConstructor; }
}

// --- Estado y Acciones ---
type State = {
  step: number;
  shipping: ShippingData;
  paymentMethod: MetodoPago;
  cardToken: string;
  transferenciaRef: string;
  loading: boolean;
};
const initialState: State = {
  step: 1,
  shipping: { nombre:'', email:'', telefono:'', direccion:'' },
  paymentMethod: 'efectivo',
  cardToken: '',
  transferenciaRef: '',
  loading: false,
};

type Action =
  | { type: 'SET_SHIPPING'; payload: Partial<ShippingData> }
  | { type: 'SET_PAYMENT'; payload: MetodoPago }
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'SET_REF'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'LOAD_SHIPPING'; payload: ShippingData };

function reducer(state: State, action: Action): State {
  switch(action.type) {
    case 'SET_SHIPPING':
      return { ...state, shipping: { ...state.shipping, ...action.payload } };
    case 'LOAD_SHIPPING':
      return { ...state, shipping: action.payload };
    case 'SET_PAYMENT':
      return { ...state, paymentMethod: action.payload, cardToken:'', transferenciaRef:'' };
    case 'SET_TOKEN':
      return { ...state, cardToken: action.payload };
    case 'SET_REF':
      return { ...state, transferenciaRef: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step+1, 4) };
    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step-1, 1) };
    default:
      return state;
  }
}

// --- Stepper Component ---
function Stepper({ step }: { step: number }) {
  const labels = ['Envío','Pago','Revisión','Gracias'];
  const icons = [<MapPin size={20}/>,<CreditCard size={20}/>,<CheckCircle2 size={20}/>,<CheckCircle2 size={20}/>];
  const progress = ((step-1)/(labels.length-1))*100;

  return (
    <div className="mb-6">
      <ul className="flex justify-between mb-2">
        {labels.map((label,i) => {
          const idx = i+1;
          const done = step>idx;
          const active = step===idx;
          return (
            <li key={i} className="flex-1 text-center">
              <span className={`
                inline-block p-2 rounded-full border-2
                ${done?'bg-green-600 border-green-600 text-white':''}
                ${active?'bg-green-500 border-green-500 text-white':''}
                ${!done&&!active?'bg-gray-200 border-gray-300 text-gray-500':''}
              `}>
                {icons[i]}
              </span>
              <div className={`mt-1 text-xs ${done||active?'text-green-700':'text-gray-500'}`}>
                {label}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="relative h-1 bg-gray-200 rounded-full">
        <motion.div
          className="absolute top-0 left-0 h-1 bg-green-600 rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ type:'spring', stiffness:120 }}
        />
      </div>
    </div>
  );
}

// --- Componente Principal ---
export default function CheckoutWizard() {
  const router = useRouter();
  const { cart, updateCart } = useCart();
  const total = cart.reduce((s,i) => s + i.price * i.quantity, 0);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, shipping, paymentMethod, cardToken, transferenciaRef, loading } = state;

  // Cargar shipping desde localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem('checkout-shipping');
    if (saved) {
      dispatch({ type:'LOAD_SHIPPING', payload: JSON.parse(saved) });
    }
  }, []);

  // Persistir shipping en cada cambio
  useEffect(() => {
    localStorage.setItem('checkout-shipping', JSON.stringify(shipping));
  }, [shipping]);

  // Validar shipping y avanzar
  const handleNextShipping = () => {
    const result = shippingSchema.safeParse(shipping);
    if (!result.success) {
      const msg = Object.values(result.error.flatten().fieldErrors).flat()[0];
      toast.error(msg);
      return;
    }
    dispatch({ type:'NEXT_STEP' });
  };

  // Envío de pedido
  const submitOrder = async () => {
    if (step === 1) {
      handleNextShipping();
      return;
    }

    dispatch({ type:'SET_LOADING', payload:true });

    if (paymentMethod === 'tarjeta' && !cardToken) {
      toast.error('Completa los datos de la tarjeta');
      dispatch({ type:'SET_LOADING', payload:false });
      return;
    }
    if (paymentMethod === 'transferencia' && !transferenciaRef.trim()) {
      toast.error('Ingresa la referencia de transferencia');
      dispatch({ type:'SET_LOADING', payload:false });
      return;
    }

    const payload: CreatePedidoDTO & {
      last4?: string;
      payment_method_id?: string;
    } = {
      datos: cart.map(i => ({
        id: Number(i.id), name: i.name, price: i.price, quantity: i.quantity
      })),
      total,
      metodo_pago: paymentMethod,
      comprador_nombre: shipping.nombre,
      comprador_email: shipping.email,
      comprador_telefono: shipping.telefono,
      direccion_envio: shipping.direccion,
      ...(paymentMethod==='tarjeta' && { cardToken, last4: cardToken.slice(-4) /* ejemplo */, payment_method_id:'mp' }),
      ...(paymentMethod==='transferencia' && { transferencia_ref: transferenciaRef }),
    };

    try {
      const res = await fetch('/api/pedidos', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message||res.statusText);
      dispatch({ type:'NEXT_STEP' });
      if (paymentMethod==='tarjeta' && data.init_point) {
        window.open(data.init_point,'_blank');
      }
      if (paymentMethod !== 'tarjeta') {
        updateCart([]); // vaciar carrito
      }
    } catch (err) {
      console.error(err);
      toast.error('Error procesando el pedido');
    } finally {
      dispatch({ type:'SET_LOADING', payload:false });
    }
  };

  // Confirmar transferencia
  const handleConfirmTransfer = async () => {
    // aquí iría tu lógica de confirm-transfer...
    dispatch({ type:'NEXT_STEP' });
    updateCart([]);
  };

  return (
    <>
      <Toaster position="top-center" />
      <Script src="https://sdk.mercadopago.com/js/v2" />

      <div className="bg-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-green-700">Checkout</h1>

          <Stepper step={step} />

          {/* Paso 1: Envío */}
          {step === 1 && (
            <div className="space-y-4">
              {(['nombre','email','telefono','direccion'] as (keyof ShippingData)[]).map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1">
                    {field.charAt(0).toUpperCase()+field.slice(1)}
                  </label>
                  <input
                    name={field}
                    value={shipping[field]}
                    onChange={e => dispatch({
                      type:'SET_SHIPPING',
                      payload: { [field]: e.target.value }
                    })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                    type={field==='email'?'email':'text'}
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  onClick={handleNextShipping}
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* Paso 2: Pago */}
          {step === 2 && (
            <div className="space-y-4">
              <span className="block text-sm font-medium mb-2">Método de pago</span>
              <div className="flex space-x-4">
                {(['efectivo','transferencia','tarjeta'] as MetodoPago[]).map(m => (
                  <button
                    key={m}
                    onClick={() => dispatch({ type:'SET_PAYMENT', payload:m })}
                    className={`px-3 py-1 border rounded-md ${
                      paymentMethod === m ? 'bg-green-600 text-white' : ''
                    }`}
                  >
                    {m.charAt(0).toUpperCase()+m.slice(1)}
                  </button>
                ))}
              </div>

              {/* Contenido pago */}
              {paymentMethod === 'tarjeta' && (
                <div className="space-y-3">
                  <div id="card-brick-container" style={{ minHeight:200 }} />
                  <button
                    onClick={submitOrder}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center justify-center"
                  >
                    {loading
                      ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white rounded-full border-t-transparent"></span>
                      : 'Pagar con Tarjeta'
                    }
                  </button>
                </div>
              )}

              {paymentMethod === 'transferencia' && (
                <div className="space-y-4">
                  <p>CBU: <code>{process.env.NEXT_PUBLIC_CBU_EMPRESA}</code></p>
                  <input
                    placeholder="Ref. transferencia"
                    value={transferenciaRef}
                    onChange={e => dispatch({ type:'SET_REF', payload:e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300"
                  />
                  <button
                    onClick={submitOrder}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center justify-center"
                  >
                    {loading
                      ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white rounded-full border-t-transparent"></span>
                      : 'Continuar'
                    }
                  </button>
                </div>
              )}

              {paymentMethod === 'efectivo' && (
                <button
                  onClick={submitOrder}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center justify-center"
                >
                  {loading
                    ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white rounded-full border-t-transparent"></span>
                    : 'Pagar en Efectivo'
                  }
                </button>
              )}
            </div>
          )}

          {/* Paso 3: Revisión */}
          {step === 3 && (
            <div className="space-y-4 text-center">
              <p><strong>Envío:</strong> {shipping.direccion}</p>
              <p><strong>Método:</strong> {paymentMethod}</p>
              <p className="text-lg font-bold"><strong>Total:</strong> ${total.toFixed(2)}</p>
              <button
                onClick={handleConfirmTransfer}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Confirmar
              </button>
            </div>
          )}

          {/* Paso 4: Gracias */}
          {step === 4 && (
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold text-green-700">¡Gracias por tu compra!</h2>
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
    </>
  );
}
