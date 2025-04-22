// src/components/home/PromotionsSlider.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface PromotionsSliderProps {
  images: string[]; // Arreglo de URLs de las imágenes de promoción
}

export default function PromotionsSlider({ images }: PromotionsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = images.length;
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    if (!autoPlayInterval.current) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, 5000);
    }
  };

  const stopAutoPlay = () => {
    if (autoPlayInterval.current) {
      clearInterval(autoPlayInterval.current);
      autoPlayInterval.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goToSlide = (index: number) => setCurrentIndex(index);

  // Manejo simple de gestos en móviles
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > minSwipeDistance) {
      handleNext();
    }
    if (touchEndX.current - touchStartX.current > minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="Slider de promociones"
      role="region"
      aria-roledescription="carousel"
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className="w-full flex-shrink-0 relative aspect-[4/3] lg:aspect-[16/9] 2xl:aspect-[21/9] group"
          >
            <Image
              src={src}
              alt={`Promoción ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Botón Anterior */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full focus:outline-none"
        aria-label="Anterior"
      >
        ‹
      </button>

      {/* Botón Siguiente */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full focus:outline-none"
        aria-label="Siguiente"
      >
        ›
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full focus:outline-none ${
              currentIndex === idx ? 'bg-white' : 'bg-gray-400'
            }`}
            aria-label={`Ir a promoción ${idx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
