// src/components/home/PromotionsSlider.tsx
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import clsx from "clsx";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface PromotionsSliderProps {
  images: string[];
  interval?: number;
}

// Definimos la función normal…
function PromotionsSliderComponent({
  images,
  interval = 5000,
}: PromotionsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;

  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current === null) {
      timerRef.current = window.setInterval(() => {
        setCurrentIndex((i) => (i + 1) % total);
      }, interval);
    }
  }, [interval, total]);

  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, [startTimer, clearTimer]);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((idx: number) => {
    setCurrentIndex(idx);
  }, []);

  // Swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const MIN_SWIPE = 80;
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback(() => {
    const dx = touchStartX.current - touchEndX.current;
    if (dx > MIN_SWIPE) handleNext();
    if (dx < -MIN_SWIPE) handlePrev();
  }, [handleNext, handlePrev]);

  const slides = useMemo(
    () =>
      images.map((src, idx) => (
        <div
          key={idx}
          className={clsx(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            idx === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={src}
            alt={`Promoción ${idx + 1}`}
            fill
            className="object-cover"
            priority={idx === 0}
            loading={idx === 0 ? "eager" : "lazy"}
            unoptimized
          />
        </div>
      )),
    [images, currentIndex]
  );

  return (
    <section
      className="relative w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Slider de promociones"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }}
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] 2xl:aspect-[21/9]">
        {slides}
      </div>

      <div aria-live="polite" className="sr-only">
        {`Promoción ${currentIndex + 1} de ${total}`}
      </div>

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

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            title={`Ir a promoción ${idx + 1}`}
            className={clsx(
              "w-4 h-4 rounded-full transition-transform",
              idx === currentIndex
                ? "scale-125 bg-white"
                : "bg-gray-400 hover:scale-110"
            )}
            aria-label={`Ir a promoción ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// Memoizamos y le ponemos displayName
const PromotionsSlider = React.memo(PromotionsSliderComponent);
PromotionsSlider.displayName = "PromotionsSlider";

export default PromotionsSlider;
