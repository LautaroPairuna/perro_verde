// src/components/unProducto/ProductInfo.tsx
'use client';

import React, { useMemo, useState, ChangeEvent } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { useCart } from '@/context/CartContext';
import type { ProductDetail } from '@/utils/fetchData';

interface ProductInfoProps {
  product: ProductDetail;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { cart, updateCart } = useCart();

  const sanitizedProduct = useMemo(() => ({
    ...product,
    precio: parseFloat(String(product.precio ?? 0)),
  }), [product]);

  const formatoMoneda = useMemo(() => new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }), []);

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const qty = Math.max(1, parseInt(e.target.value, 10) || 1);
    setQuantity(qty);
  };

  const handleAddToCart = () => {
    const newCart = [...cart];
    const idStr = sanitizedProduct.id.toString();
    const idx = newCart.findIndex(item => item.id === idStr);
    if (idx === -1) {
      newCart.push({
        id: idStr,
        name: sanitizedProduct.producto,
        price: sanitizedProduct.precio,
        thumbnail: `/images/productos/thumbs/${sanitizedProduct.foto ?? 'placeholder.jpg'}`,
        quantity,
      });
    } else {
      newCart[idx].quantity += quantity;
    }
    updateCart(newCart);
    setQuantity(1);
  };

  return (
    <ErrorBoundary>
      <section className="flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
        {/* Encabezado: Título y Precio */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 transition-transform duration-300 hover:scale-105">
            {sanitizedProduct.producto || 'Producto sin nombre'}
          </h1>
          <p className="mt-2 text-2xl md:text-3xl font-extrabold text-green-700 transition-transform duration-300 hover:scale-105">
            {formatoMoneda.format(sanitizedProduct.precio)}
          </p>
        </div>

        {/* Tarjetas de Información (Marca y Categoria) */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-white border border-green-400 rounded-md px-4 py-2 shadow-sm flex-1 min-w-[120px] transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <p className="text-gray-700 text-sm font-semibold uppercase">Marca</p>
            <p className="text-gray-600 text-sm mt-1">{sanitizedProduct.marca?.marca || 'Sin marca'}</p>
          </div>
          <div className="bg-white border border-green-400 rounded-md px-4 py-2 shadow-sm flex-1 min-w-[120px] transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <p className="text-gray-700 text-sm font-semibold uppercase">Categoria</p>
            <p className="text-gray-600 text-sm mt-1">{sanitizedProduct.rubro?.rubro || 'Sin Categoria'}</p>
          </div>
        </div>

        {/* Sección de cantidad y botón para añadir al carrito */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="cantidad" className="text-gray-700 font-medium">
              Cantidad:
            </label>
            <input
              id="cantidad"
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:border-green-700 transition"
            />
          </div>
          <button
            onClick={handleAddToCart}
            type="button"
            className="w-full sm:w-auto px-6 py-3 border border-green-700 text-green-700 rounded-md shadow-md transition-all duration-300 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label={`Añadir ${sanitizedProduct.producto} al carrito`}
          >
            Añadir al Carrito
          </button>
        </div>

        {/* Botón para volver al catálogo */}
        <div>
          <a
            href="/catalogo"
            className="w-full sm:w-auto px-6 py-3 border border-green-700 text-green-700 rounded-md shadow-md transition-all duration-300 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center gap-2"
            aria-label="Volver al Catálogo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Catálogo
          </a>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default ProductInfo;
