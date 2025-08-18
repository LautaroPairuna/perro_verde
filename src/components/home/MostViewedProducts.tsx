// src/components/home/MostViewedProducts.tsx
'use client';

import React from 'react';
import ProductCard from '../catalogo/ProductCard';
import Link from 'next/link';
import type { ViewedProduct } from './HomeClientComponents';

interface Props {
  products: ViewedProduct[];
}

export default function MostViewedProducts({ products }: Props) {
  return (
    <section className="relative bg-green-100 py-12 overflow-hidden group">
      <div className="max-w-[1400px] mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 text-center mb-8 group">
          Productos más Vistos
          <span className="block h-1 w-28 bg-green-600 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/catalogo/pagina-1"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-green-700 hover:shadow-xl transition"
          >
            Ver todo el catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
