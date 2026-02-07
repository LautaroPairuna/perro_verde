// src/components/carrito/Cart.tsx
'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCartStore, CartItem } from '@/store/useCartStore';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import emptyCart from  "../../../public/images/empty-cart.svg";

export default function Cart() {
  const { cart, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const val = e.target.value;
    const qty = parseInt(val, 10);
    const finalQty = isNaN(qty) ? 1 : qty;
    updateQuantity(id, finalQty);
  };

  // Evitar hydration mismatch renderizando null o skeleton hasta montar
  if (!mounted) return <div className="p-10 text-center">Cargando carrito...</div>;

  const total = getTotalPrice();

  const handleEmptyCart = () => {
    clearCart();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-extrabold text-center text-green-800 mb-4">
        Tu Carrito de Compras
      </h1>
      {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="w-36 h-36 mb-5">
              <Image
                src={emptyCart}
                alt="Carrito vacío"
                width={144}
                height={144}
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700">
              ¡Tu carrito está vacío!
            </h2>
            <p className="text-center text-gray-500 max-w-xs">
              Agrega productos a tu carrito para comenzar tu compra y descubrir
              todas nuestras ofertas.
            </p>
            <button
              onClick={() => router.push('/catalogo')}
              className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
            >
              Ver Productos
            </button>
          </div>
        ) : (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Producto</th>
                  <th className="px-6 py-4 text-center font-semibold">Precio</th>
                  <th className="px-6 py-4 text-center font-semibold">Cantidad</th>
                  <th className="px-6 py-4 text-center font-semibold">Subtotal</th>
                  <th className="px-6 py-4 text-center font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cart.map((item: CartItem) => (
                  <tr key={item.id} className="hover:bg-green-50 transition-colors">
                    {/* Producto */}
                    <td className="px-6 py-4 flex items-center space-x-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <ImageWithFallback
                          src={item.thumbnail || ''}
                          fallbackSrc="/images/productos/thumbs/placeholder.jpg"
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <span className="text-gray-800 font-medium">{item.name}</span>
                    </td>
                    {/* Precio */}
                    <td className="px-6 py-4 text-center text-gray-700 font-semibold">
                      ${Number(item.price).toFixed(2)}
                    </td>
                    {/* Cantidad */}
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(e, item.id)}
                        className="w-16 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:border-green-700 transition"
                      />
                    </td>
                    {/* Subtotal */}
                    <td className="px-6 py-4 text-center text-gray-700 font-semibold">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </td>
                    {/* Acciones */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={handleEmptyCart}
              className="w-full sm:w-auto mb-4 sm:mb-0 px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Vaciar Carrito
            </button>
            <p className="text-2xl font-bold text-green-700">
              Total: ${total.toFixed(2)}
            </p>
            <button
              onClick={() => router.push('/checkout')}
              className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-800 transition"
            >
              Proceder a Pagar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
