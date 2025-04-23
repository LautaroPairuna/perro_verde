// src/components/checkout/CheckoutWizard.tsx
'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useCart } from '@/context/CartContext';
import { MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { CreatePedidoDTO, MetodoPago } from '@/types/payment';

interface CardData {
  token: string;
  last_four_digits?: string;
  payment_method_id?: string;
}

interface ShippingInfo {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

declare global {
  interface Window {
    MercadoPago: {
      new (key: string, opts: { locale: string }): {
        bricks(): {
          create(
            name: 'cardPayment',
            containerId: string,
            options: {
              initialization: { amount: number };
              callbacks: {
                onSubmit: (data: CardData) => void;
                onError: () => void;
                onReady: () => void;
              };
            }
          ): void;
        };
      };
    };
  }
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
  const [shipping, setShipping] = useState<ShippingInfo>({ nombre: '', email: '', telefono: '', direccion: '' });
  const [payment, setPayment] = useState<{ metodo: MetodoPago }>({ metodo: 'efectivo' });
  const [transferenciaRef, setTransferenciaRef] = useState('');
  const [cardToken, setCardToken] = useState('');
  const [orderId, setOrderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [mpLoaded, setMpLoaded] = useState(false);

  const CBU_EMPRESA = process.env.NEXT_PUBLIC_CBU_EMPRESA ?? '';
  const WPP_EMPRESA = process.env.NEXT_PUBLIC_WPP_NUMBER ?? '';

  // Inicializar Brick
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (payment.metodo !== 'tarjeta' || !mpLoaded) return;
    const timer = setTimeout(() => {
      const container = document.getElementById('card-brick-container');
      if (!container || typeof window.MercadoPago !== 'function') return;
      const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string, { locale: 'es-AR' });
      mp.bricks().create('cardPayment', 'card-brick-container', {
        initialization: { amount: total },
        callbacks: {
          onSubmit: data => {
            // Guardar token en sesión para persistencia
            sessionStorage.setItem('checkout-cardToken', data.token);
            setCardToken(data.token);
            // Avanzar a revisión como pendiente
            setStep(3);
          },
          onError: () => toast.error('Error MercadoPago'),
          onReady: () => toast.success('Formulario listo'),
        },
      });
    }, 0);
    return () => clearTimeout(timer);
  }, [payment.metodo, total, mpLoaded]);

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
    setStep(s => Math.min(s + 1, steps.length));
  };

  const back = () => setStep(s => Math.max(s - 1, 1));

  const submitOrder = async () => {
    setLoading(true);
    const payload: CreatePedidoDTO = (() => {
      const base: CreatePedidoDTO = {
        datos: cart.map(i => ({ id: Number(i.id), name: i.name, price: i.price, quantity: i.quantity })),
        total,
        metodo_pago: payment.metodo,
        comprador_nombre: shipping.nombre,
        comprador_email: shipping.email,
        comprador_telefono: shipping.telefono,
        direccion_envio: shipping.direccion,
      };
      if (payment.metodo === 'tarjeta') {
        const storedToken = sessionStorage.getItem('checkout-cardToken');
        if (storedToken) {
          return { ...base, cardToken: storedToken };
        }
      }
      if (payment.metodo === 'transferencia') {
        return { ...base, transferencia_ref: transferenciaRef };
      }
      return base;
    })();
    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || res.statusText);
      setOrderId(data.orderId);
      // Mantener pendiente hasta verificación post-pago
      if (payment.metodo !== 'tarjeta') {
        setStep(3); emptyCart();
      }
      toast.success('Pedido creado. Completa el pago.');
    } catch {
      toast.error('Error al crear pedido');
    } finally {
      setLoading(false);
    }
  };

  // Confirmar pago manual (tarjeta o transferencia)
  const handleConfirm = async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const endpoint = payment.metodo === 'tarjeta' ?
        `/api/pedidos/${orderId}/confirm-card` :
        `/api/pedidos/${orderId}/confirm-transfer`;
      const body = payment.metodo === 'tarjeta' ?
        { cardToken: sessionStorage.getItem('checkout-cardToken') } :
        { transferencia_ref: transferenciaRef };
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error();
      emptyCart(); setStep(4);
      toast.success('Pago confirmado');
    } catch {
      toast.error('No se pudo confirmar pago');
    } finally { setLoading(false); }
  };

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <>
      <Toaster position="top-center" />
      <Script src="https://sdk.mercadopago.com/js/v2" onLoad={() => setMpLoaded(true)} />
      <div className="bg-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white p-6 space-y-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl text-center font-bold text-green-700">Checkout</h1>
          {/* Stepper */}
          <ul className="flex justify-between mb-4">{steps.map((s,i)=><li key={i} className="flex-1 text-center"><div className={`inline-block p-2 border-2 rounded-full ${step>i+1?'bg-green-600 text-white':'bg-gray-200 text-gray-500'}`}>{s.icon}</div><p className={`mt-1 text-xs ${step>=i+1?'text-green-700':'text-gray-500'}`}>{s.label}</p></li>)}</ul>
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-6"><motion.div className="h-full bg-green-600 rounded-full" style={{width:`${progress}%`}} /></div>
          {/* Steps */}
          {step===1 && <form onSubmit={e=>{e.preventDefault();next();}} className="space-y-4 animate-fade">{(['nombre','email','telefono','direccion'] as (keyof ShippingInfo)[]).map(field=> <div key={field}><label className="block text-sm font-medium mb-1">{field.toUpperCase()}</label><input name={field} type={field==='email'?'email':'text'} value={shipping[field]} onChange={e=>setShipping({...shipping,[field]:e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300" required={field!=='telefono'} /></div>)}<div className="text-right"><button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md">Siguiente</button></div></form>}
          {step===2 && <div className="space-y-4 animate-fade"><p className="text-sm font-medium">Método de pago</p><PaymentMethodSelector selected={payment.metodo} onChange={m=>{setPayment({metodo:m as MetodoPago});setCardToken('');setTransferenciaRef('');}} /><div id={payment.metodo==='tarjeta'?'card-brick-container':''} style={payment.metodo==='tarjeta'?{minHeight:200}:{}} />{payment.metodo==='transferencia'&&<div className="space-y-2"><p className="text-sm">CBU: <code className="font-mono bg-gray-100 px-2 py-1">{CBU_EMPRESA}</code></p><input type="text" placeholder="Referencia" value={transferenciaRef} onChange={e=>setTransferenciaRef(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300" /><p className="text-sm">Envía comprobante por <a href={`https://wa.me/${WPP_EMPRESA}`} target="_blank" rel="noreferrer" className="underline text-green-600">WhatsApp</a></p></div>}<div className="flex justify-between"><button onClick={back} className="px-4 py-2 border rounded-md">Atrás</button>{payment.metodo!=='tarjeta'&&<button onClick={submitOrder} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded-md">{loading?'Procesando...':'Continuar'}</button>}</div></div>}
          {step===3 && <div className="text-center space-y-4 animate-fade"><p className="text-sm"><strong>Envío:</strong> {shipping.direccion}</p><p className="text-sm"><strong>Método:</strong> {payment.metodo}</p><p className="text-lg font-bold">Total: ${total.toFixed(2)}</p><button onClick={handleConfirm} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded-md">{loading?'Confirmando...':'He completado el pago'}</button></div>}
          {step===4 && <div className="text-center space-y-4 animate-fade"><h2 className="text-xl font-semibold text-green-700">¡Gracias!</h2><p>Tu pedido está confirmado.</p><button onClick={()=>router.push('/')} className="px-4 py-2 bg-green-600 text-white rounded-md">Inicio</button></div>}
        </div>
      </div>
      <style jsx>{`@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.animate-fade{animation:fadeIn .5s ease-out}`}</style>
    </>
  );
}
