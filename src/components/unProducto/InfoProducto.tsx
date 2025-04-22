// src/components/unProducto/InfoProducto.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { ProductDetail } from '@/utils/fetchData';

const ProductInfo = dynamic(() => import('./ProductInfo'), { ssr: false });

interface InfoProductoProps {
  product: ProductDetail;
}

const InfoProducto: React.FC<InfoProductoProps> = ({ product }) => (
  <main>
    <ProductInfo product={product} />
  </main>
);

export default InfoProducto;
