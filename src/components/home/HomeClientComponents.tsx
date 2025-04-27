// src/components/home/HomeClientComponents.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Tipo para productos destacados
export type FeaturedProduct = {
  id: number;
  producto: string;
  descripcion: string | null;
  precio: number;
  foto: string | null;
  rubro: { id: number; rubro: string };
  marca: { id: number; marca: string };
};

// Tipo para productos más vistos (añade visitas)
export type ViewedProduct = FeaturedProduct & {
  visitas: number;
};

// Tipo para marcas
export interface Brand {
  id: number;
  marca: string;
  foto: string | null;
}

// Componentes cargados dinámicamente
const PromotionsSlider = dynamic(
  () => import('@/components/home/PromotionsSlider'),
  { ssr: false }
);
const FeaturedProducts = dynamic(
  () => import('@/components/home/FeaturedProducts'),
  { ssr: false }
);
const BrandMarquee = dynamic(
  () => import('@/components/home/BrandMarquee'),
  { ssr: false }
);
const MostViewedProducts = dynamic(
  () => import('@/components/home/MostViewedProducts'),
  { ssr: false }
);

interface Props {
  promotionImages: string[];
  featuredProducts: FeaturedProduct[];
  brands: Brand[];
  mostViewed: ViewedProduct[];
}

export default function HomeClientComponents({
  promotionImages,
  featuredProducts,
  brands,
  mostViewed,
}: Props) {
  return (
    <>
      <PromotionsSlider images={promotionImages} />
      <FeaturedProducts products={featuredProducts} />
      <BrandMarquee brands={brands} />
      <MostViewedProducts products={mostViewed} />
    </>
  );
}
