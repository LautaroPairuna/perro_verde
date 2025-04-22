// src/components/unProducto/InfoProducto.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Importamos ProductInfo de forma dinámica para controlarla en el cliente.
const ProductInfo = dynamic(() => import('./ProductInfo'), { ssr: false });

interface InfoProductoProps {
  product: any;
}

const InfoProducto: React.FC<InfoProductoProps> = ({ product }) => {
  return (
    <main>
      <ProductInfo product={product} />
    </main>
  );
};

export default InfoProducto;
