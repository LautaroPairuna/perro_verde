// src/components/home/HomeClientComponents.tsx
// Elimina o comenta "use client" al inicio
import dynamic from "next/dynamic";
import React from "react";

const Destacados = dynamic(() => import('@/components/home/FeaturedProducts'), { ssr: true });
const Marcas = dynamic(() => import('@/components/home/BrandMarquee'), { ssr: true });
const Vistos = dynamic(() => import('@/components/home/MostViewedProducts'), { ssr: true });
const PromotionsSlider = dynamic(() => import('@/components/home/PromotionsSlider'), { ssr: true });

export default function HomeClientComponents() {
  const promotionImages = [
    '/images/slider/slider-1.webp',
    '/images/slider/slider-2.webp',
    '/images/slider/slider-3.webp'
  ];

  return (
    <>
      <PromotionsSlider images={promotionImages} />
      <Destacados />
      <Marcas />
      <Vistos />
    </>
  );
}
