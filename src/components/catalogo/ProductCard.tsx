// src/components/catalogo/ProductCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import slugify from "@/utils/slugify";
import { useCart } from "@/context/CartContext";
import toast from 'react-hot-toast';    // <-- import

export interface Rubro {
  id: number;
  rubro: string;
}

export interface Product {
  id: number;
  producto: string;
  descripcion?: string;
  precio?: number;
  foto?: string;
  visitas?: number;
  rubro: Rubro;
}

export interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, updateCart } = useCart();

  const productSlug = slugify(product.producto);
  const productUrl = `/catalogo/detalle/${productSlug}-${product.id}`;
  const displayPrice = product.precio ? `$${product.precio}` : "Precio no disponible";

  const handleAddToCart = (): void => {
    const newCart = [...cart];
    const productIdStr = product.id.toString();
    const index = newCart.findIndex((item) => item.id === productIdStr);
    if (index === -1) {
      newCart.push({
        id: productIdStr,
        name: product.producto,
        price: product.precio ?? 0,
        thumbnail: `/images/productos/thumbs/${product.foto || "placeholder.jpg"}`,
        quantity: 1,
      });
    } else {
      newCart[index].quantity += 1;
    }
    updateCart(newCart);
    toast.success(`Añadido "${product.producto}" al carrito`);  // <-- toast
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
      <figure className="relative aspect-[3/4] overflow-hidden">
        <Link href={productUrl} aria-label={`Ver más detalles de ${product.producto}`} className="block">
          <Image
            src={`/images/productos/${product.foto || "placeholder.jpg"}`}
            alt={product.producto || "Imagen no disponible"}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>
        <figcaption className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </figure>
      <div className="flex flex-col justify-between p-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-green-800 truncate transition-transform duration-300 group-hover:scale-105">
            {product.producto || "Producto sin nombre"}
          </h2>
          <p className="mt-2 text-lg md:text-xl font-semibold text-green-600 transition-transform duration-300 group-hover:scale-105">
            {displayPrice}
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={productUrl}
            aria-label={`Ver más detalles de ${product.producto}`}
            className="inline-block rounded-full bg-green-700 px-6 py-2 text-center text-sm font-medium text-white transition-colors duration-300 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Ver Más
          </Link>
          <button
            onClick={handleAddToCart}
            type="button"
            aria-label={`Añadir ${product.producto} al carrito`}
            className="w-full rounded-full border border-green-700 px-6 py-2 text-center text-sm font-medium text-green-700 transition-colors duration-300 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
      <div className="absolute top-3 left-3 rounded-full bg-green-700 px-3 py-1 text-xs font-bold text-white shadow-md">
        {product.rubro?.rubro || "Sin rubro"}
      </div>
    </article>
  );
};

export default ProductCard;
