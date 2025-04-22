// src/components/home/FeaturedProducts.tsx
import React from 'react';
import ProductCard from '../catalogo/ProductCard';
import { prisma } from '@/lib/prisma';

export default async function FeaturedProducts() {
  const products = await prisma.productos.findMany({
    select: {
      id: true,
      producto: true,
      descripcion: true,
      precio: true,
      foto: true,
      rubro: {
        select: { id: true, rubro: true },
      },
      marca: {
        select: { id: true, marca: true },
      },
    },
    where: {
      destacado: true,
      activo: true,
    },
    take: 4,
  });

  return (
    <section className="p-12 text-center bg-green-50">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-bold text-green-800 mb-10">Productos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                descripcion: product.descripcion ?? undefined,
                foto: product.foto ?? undefined,
                // Convertimos el precio de Decimal a número
                precio: product.precio ? parseFloat(product.precio.toString()) : undefined,
              }}
            />
          ))}
        </div>
        <div className="mt-6">
          <a
            href="/catalogo/pagina-1"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Ver todo el catálogo
          </a>
        </div>
      </div>
    </section>
  );
}
