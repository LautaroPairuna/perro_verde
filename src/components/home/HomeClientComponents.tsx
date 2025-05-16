// src/components/home/HomeClientComponents.tsx
"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// ——————————————————————————————————————————
// Tipos utilizados en este componente
// ——————————————————————————————————————————
export type FeaturedProduct = {
  id: number;
  producto: string;
  descripcion: string | null;
  precio: number;
  foto: string | null;
  rubro: { id: number; rubro: string };
  marca: { id: number; marca: string };
};

export type ViewedProduct = FeaturedProduct & {
  visitas: number;
};

export interface Brand {
  id: number;
  marca: string;
  foto: string | null;
}

export interface Rubro {
  id: number;
  rubro: string;
  foto: string | null;
}

// ——————————————————————————————————————————
// Componentes cargados dinámicamente
// ——————————————————————————————————————————
const PromotionsSlider = dynamic(
  () => import("@/components/home/PromotionsSlider"),
  {
    ssr: true,
    loading: () => (
      <div className="w-full h-60 bg-gray-200 animate-pulse rounded-xl" />
    ),
  }
);
const FeaturedProducts = dynamic(
  () => import("@/components/home/FeaturedProducts"),
  { ssr: false }
);
const BrandMarquee = dynamic(
  () => import("@/components/home/BrandMarquee"),
  { ssr: false }
);
const MostViewedProducts = dynamic(
  () => import("@/components/home/MostViewedProducts"),
  { ssr: false }
);
const RubrosGrid = dynamic(() => import("@/components/home/RubrosGrid"), {
  ssr: false,
});

interface HomeClientComponentsProps {
  promotionImages: string[];
  featuredProducts: FeaturedProduct[];
  brands: Brand[];
  mostViewed: ViewedProduct[];
  rubros: Rubro[];
}

export default function HomeClientComponents({
  promotionImages,
  featuredProducts,
  brands,
  mostViewed,
  rubros,
}: HomeClientComponentsProps) {
  return (
    <Suspense fallback={<div className="text-center py-8">Cargando...</div>}>
      <PromotionsSlider images={promotionImages} />

      <FeaturedProducts products={featuredProducts} />

      <BrandMarquee brands={brands} />

      <MostViewedProducts products={mostViewed} />

      <RubrosGrid rubros={rubros} />
    </Suspense>
  );
}
