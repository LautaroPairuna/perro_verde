// src/components/home/FeaturedProducts.tsx
'use client';

import React from 'react';
import ProductCard from '../catalogo/ProductCard';
import Link from 'next/link';
import type { FeaturedProduct } from './HomeClientComponents';

interface Props {
  products: FeaturedProduct[];
}

export default function FeaturedProducts({ products }: Props) {
  return (
    <section className="p-12 text-center bg-green-50">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-bold text-green-800 mb-10">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                descripcion: product.descripcion ?? undefined,
                foto: product.foto ?? undefined,
                precio: product.precio,
              }}
            />
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/catalogo/pagina-1"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Ver todo el catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
