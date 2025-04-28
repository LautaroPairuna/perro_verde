// src/components/catalogo/ProductCard.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import slugify from '@/utils/slugify'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'

export interface Rubro { id:number; rubro:string }
export interface Product {
  id: number
  producto: string
  descripcion?: string
  precio?: number
  foto?: string
  visitas?: number
  rubro: Rubro
}
export interface ProductCardProps { product:Product }

const ADMIN_HOST = process.env.NEXT_PUBLIC_ADMIN_HOST!

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, updateCart } = useCart()
  const productSlug = slugify(product.producto)
  const productUrl  = `/catalogo/detalle/${productSlug}-${product.id}`
  const displayPrice = product.precio ? `$${product.precio}` : 'Precio no disponible'

  const handleAddToCart = () => {
    const newCart = [...cart]
    const pid     = product.id.toString()
    const idx     = newCart.findIndex(item => item.id===pid)
    if (idx === -1) {
      newCart.push({
        id: pid,
        name: product.producto,
        price: product.precio || 0,
        thumbnail: `${ADMIN_HOST}/images/productos/thumbs/${product.foto || 'placeholder.jpg'}`,
        quantity: 1,
      })
    } else newCart[idx].quantity++
    updateCart(newCart)
    toast.success(`Añadido "${product.producto}" al carrito`)
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:-translate-y-1">
      <figure className="relative aspect-[3/4] overflow-hidden">
        <Link href={productUrl} aria-label={`Ver ${product.producto}`} className="block">
          <Image
            src={`${ADMIN_HOST}/images/productos/${product.foto || 'placeholder.jpg'}`}
            alt={product.producto}
            fill
            style={{ objectFit:'cover' }}
            className="transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>
        <figcaption className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100" />
      </figure>
      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <h2 className="text-xl font-bold text-green-800 truncate">{product.producto}</h2>
          <p className="mt-2 text-lg text-green-600">{displayPrice}</p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={productUrl}
            className="rounded-full bg-green-700 px-6 py-2 text-white text-sm font-medium text-center"
          >
            Ver Más
          </Link>
          <button
            onClick={handleAddToCart}
            className="w-full rounded-full border border-green-700 px-6 py-2 text-green-700 text-sm font-medium hover:bg-green-700 hover:text-white"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
      <span className="absolute top-3 left-3 rounded-full bg-green-700 px-3 py-1 text-xs font-bold text-white">
        {product.rubro?.rubro || 'Sin rubro'}
      </span>
    </article>
  )
}

export default ProductCard
