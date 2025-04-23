// src/components/checkout/CheckoutWizard.tsx
'use client';

import React, { useState, useEffect } from 'react';
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
  telefono?: string;
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
  const [shipping, setShipping] = useState<ShippingInfo>({ nombre:'', email:'', telefono:'', direccion:'' });
  const [method, setMethod] = useState<MetodoPago>('efectivo');
  const [transferRef, setTransferRef] = useState('');
  const [prefId, setPrefId] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  // 1) Validar datos envío
  const validateShipping = (): boolean => {
    if (!shipping.nombre || !shipping.email || !shipping.direccion) {
      toast.error('Completa todos los datos de envío');
      return false;
    }
    return true;
  };

  const next = (): void => {
    if (step === 1 && !validateShipping()) return;
    setStep((s) => Math.min(s+1, steps.length));
  };
  const back = (): void => setStep((s) => Math.max(s-1,1));

  // 2) Generar preferencia
  const generatePreference = async (): Promise<void> => {
    console.debug('🔄 Generando preferencia MP…');
    setLoading(true);
    try {
      const res = await fetch('/api/mp/preferences',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ amount: total }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error en /api/mp/preferences');
      console.debug('📄 preferenceId:', data.preferenceId);
      setPrefId(data.preferenceId);
    } catch (err: unknown) {
      console.error('❌ generatePreference:', err);
      toast.error(err instanceof Error ? err.message : 'Error generando preferencia');
    } finally {
      setLoading(false);
    }
  };

  // 3) Al llegar al paso 2 + tarjeta, auto generar pref
  useEffect(() => {
    if (step === 2 && method === 'tarjeta' && !prefId && !loading) {
      generatePreference();
    }
  }, [step, method]);

  // 4) Envío del pedido (incluyendo cardToken)
  const submitOrder = async (cardToken?: string): Promise<void> => {
    setLoading(true);
    try {
      const dto: CreatePedidoDTO = {
        datos: cart.map(i=>({ id: Number(i.id), name: i.name, price: i.price, quantity: i.quantity })),
        total,
        metodo_pago: method,
        comprador_nombre: shipping.nombre,
        comprador_email: shipping.email,
        comprador_telefono: shipping.telefono,
        direccion_envio: shipping.direccion,
        ...(method === 'transferencia' && { transferencia_ref: transferRef }),
        ...(cardToken && { cardToken }),
      };
      const res = await fetch('/api/pedidos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(dto)});
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error creando pedido');
      emptyCart();
      setStep(3);
      toast.success('✅ Pago procesado');
    } catch (err: unknown) {
      console.error('❌ submitOrder:', err);
      toast.error(err instanceof Error ? err.message : 'Error procesando pago');
    } finally {
      setLoading(false);
    }
  };

  // 5) Callback del CardPaymentForm
  const handleCardSubmit = (cardData: CardData) => {
    console.debug('💳 cardData recibido:', cardData);
    submitOrder(cardData.token);
  };

  const progress = ((step-1)/(steps.length-1))*100;

  return (
    <>
      <Toaster position="top-center" />
      <Script src="https://sdk.mercadopago.com/js/v2" />

      <div className="bg-green-50 flex justify-center p-4">
        <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg space-y-6">
          <h1 className="text-2xl font-bold text-center text-green-700">Checkout</h1>

          {/* Steps */}
          <ul className="flex justify-between">
            {steps.map((s,i)=>
              <li key={i} className="flex-1 text-center">
                <div className={`w-8 h-8 mx-auto rounded-full border-2 ${step>i+1?'bg-green-600 text-white':'bg-gray-200 text-gray-500'} flex items-center justify-center`}>
                  {i+1}
                </div>
                <span className={`block mt-1 text-xs ${step>=i+1?'text-green-700':'text-gray-500'}`}>{s.label}</span>
              </li>
            )}
          </ul>

          {/* Progress */}
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div className="h-full bg-green-600" style={{width:`${progress}%`}} />
          </div>

          {/* Step 1: Envío */}
          {step===1 && (
            <form onSubmit={e=>{e.preventDefault(); next();}} className="space-y-4">
              <Field label="Nombre" value={shipping.nombre} onChange={v=>setShipping({...shipping,nombre:v})} required/>
              <Field label="Email" type="email" value={shipping.email} onChange={v=>setShipping({...shipping,email:v})} required/>
              <Field label="Teléfono" value={shipping.telefono||''} onChange={v=>setShipping({...shipping,telefono:v})}/>
              <Field label="Dirección" value={shipping.direccion} onChange={v=>setShipping({...shipping,direccion:v})} required/>
              <div className="text-right"><Button> Siguiente </Button></div>
            </form>
          )}

          {/* Step 2: Pago */}
          {step===2 && (
            <div className="space-y-4">
              <p className="font-medium">Método de pago</p>
              <PaymentMethodSelector selected={method} onChange={m=>{setMethod(m as MetodoPago); setPrefId(null);}}/>

              {method==='tarjeta' && prefId && (
                <CardPaymentForm preferenceId={prefId} onApprove={handleCardSubmit}/>
              )}

              {method==='transferencia' && (
                <div className="space-y-2">
                  <Field label="Referencia" value={transferRef} onChange={v=>setTransferRef(v)} required/>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={back}>Atrás</Button>
                    <Button onClick={()=>submitOrder()}>Continuar</Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Gracias */}
          {step===3 && (
            <div className="text-center space-y-4">
              <CheckCircle2 size={48} className="text-green-600 mx-auto"/>
              <h2 className="text-xl font-semibold">¡Gracias!</h2>
              <p>Tu transacción se ha completado.</p>
              <Button onClick={()=>router.push('/')}>Volver al inicio</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Componentes auxiliares
function Field({ label, type='text', value, onChange, required=false }: {
  label:string; type?:string; value:string; onChange:(v:string)=>void; required?:boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e=>onChange(e.target.value)}
        required={required}
        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-300"
      />
    </div>
  );
}
function Button({ children, variant, onClick }: {
  children: React.ReactNode; variant?: 'outline'; onClick?:()=>void;
}) {
  const base = 'px-4 py-2 rounded font-medium';
  const style = variant==='outline'
    ? 'border text-gray-700'
    : 'bg-green-600 text-white';
  return (
    <button onClick={onClick} className={`${base} ${style}`}>{children}</button>
  );
}
