"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface PromotionsSliderProps {
  images: string[];
  interval?: number;
}

export default function PromotionsSlider({ images, interval = 5000 }: PromotionsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = images.length;
  const autoPlay = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = useCallback(() => {
    if (!autoPlay.current) {
      autoPlay.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % totalSlides);
      }, interval);
    }
  }, [interval, totalSlides]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlay.current) {
      clearInterval(autoPlay.current);
      autoPlay.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  const handleNext = () => setCurrentIndex(prev => (prev + 1) % totalSlides);
  const handlePrev = () => setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  const goToSlide = (index: number) => setCurrentIndex(index);

  // Swipe handlers
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipe = 80;
  const onTouchStart = (e: React.TouchEvent) => (touchStartX.current = e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => (touchEndX.current = e.touches[0].clientX);
  const onTouchEnd = () => {
    const dx = touchStartX.current - touchEndX.current;
    if (dx > minSwipe) handleNext();
    if (dx < -minSwipe) handlePrev();
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Slider de promociones"
      onKeyDown={e => {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }}
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Responsive aspect ratio container */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] 2xl:aspect-[21/9]">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={clsx(
              'absolute inset-0 transition-opacity duration-700 ease-in-out',
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Image
              src={src}
              alt={`Promoción ${idx + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* ARIA live for screen readers */}
      <div aria-live="polite" className="sr-only">
        {`Promoción ${currentIndex + 1} de ${totalSlides}`}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-6 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full focus:outline-none"
        aria-label="Anterior"
      >
        <HiChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-6 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full focus:outline-none"
        aria-label="Siguiente"
      >
        <HiChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            title={`Ir a promoción ${idx + 1}`}
            className={clsx(
              'w-4 h-4 rounded-full transition-transform',
              idx === currentIndex
                ? 'scale-125 bg-white'
                : 'bg-gray-400 hover:scale-110'
            )}
            aria-label={`Ir a promoción ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
