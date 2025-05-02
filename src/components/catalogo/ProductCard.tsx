"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import slugify from "@/utils/slugify";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { HiShoppingCart, HiArrowRight } from "react-icons/hi";

export interface Rubro {
  id: number;
  rubro: string;
}

export interface Product {
  id: number;
  producto: string;
  descripcion?: string | null;
  precio?: number | null;
  foto?: string | null;
  visitas?: number | null;
  rubro: Rubro;
}

export interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, updateCart } = useCart();

  const DEFAULT_IMG = "placeholder.jpg";
  const initialFile = product.foto && product.foto.trim() ? product.foto : DEFAULT_IMG;
  const initialSrc = `/images/productos/${initialFile}`;
  const [imgSrc, setImgSrc] = useState(initialSrc);

  const displayPrice =
    product.precio != null
      ? `$${product.precio.toFixed(2)}`
      : "Precio no disponible";

  const productSlug = slugify(product.producto);
  const productUrl = `/catalogo/detalle/${productSlug}-${product.id}`;

  const handleAddToCart = (): void => {
    const newCart = [...cart];
    const productIdStr = product.id.toString();
    const index = newCart.findIndex((item) => item.id === productIdStr);
    if (index === -1) {
      newCart.push({
        id: productIdStr,
        name: product.producto,
        price: product.precio ?? 0,
        thumbnail: `/images/productos/thumbs/${initialFile}`,
        quantity: 1,
      });
    } else {
      newCart[index].quantity += 1;
    }
    updateCart(newCart);
    toast.success(`Añadido "${product.producto}" al carrito`);
  };

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl bg-green-50">
        <Link href={productUrl} className="block">
          <Image
            src={imgSrc}
            alt={product.producto || "Imagen no disponible"}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgSrc(`/images/productos/${DEFAULT_IMG}`)}
          />
        </Link>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.producto}
          </h3>
          <p className="mt-2 text-xl font-bold text-green-600">
            {displayPrice}
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center bg-green-600 text-white py-2 rounded-full font-medium transition-colors duration-300 hover:bg-green-700"
          >
            <HiShoppingCart className="w-5 h-5 mr-2" />
            Añadir
          </button>
          <Link
            href={productUrl}
            className="flex-1 flex items-center justify-center border-2 border-green-600 text-green-600 py-2 rounded-full font-medium text-center transition-colors duration-300 hover:bg-green-600 hover:text-white"
          >
            Ver Más
            <HiArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
        {product.rubro?.rubro ?? "Sin rubro"}
      </span>
    </article>
  );
};

export default ProductCard;
