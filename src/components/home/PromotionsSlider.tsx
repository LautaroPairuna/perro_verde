// src/components/home/PromotionsSlider.tsx
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useId,
} from "react";
import Image from "next/image";
import clsx from "clsx";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

/** Punto de foco (0..1 o 0..100 en porcentaje) */
type FocusPoint = { x: number; y: number };

/** Misma imagen; cambiamos sólo encuadre por breakpoint */
type Slide =
  | string
  | {
      src: string;
      alt?: string;
      focus?: {
        mobile?: FocusPoint; // <= 640px
        desktop?: FocusPoint; // > 640px
      };
    };

interface PromotionsSliderProps {
  images: Slide[];
  interval?: number; // ms
  /** Altura mínima en móviles (svh) para que no quede "tira" bajita */
  mobileMinVH?: number; // 0..100 (default 56)
  /** ID opcional para evitar hydration mismatch si useId falla */
  id?: string;
}

/* ---------- Hooks y Utils ---------- */
function useMedia(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

function usePrefersReducedMotion() {
  return useMedia("(prefers-reduced-motion: reduce)");
}

function toObjectPosition(p?: FocusPoint, fallback = "50% 50%") {
  if (!p) return fallback;
  const x = p.x <= 1 ? p.x * 100 : p.x;
  const y = p.y <= 1 ? p.y * 100 : p.y;
  return `${x}% ${y}%`;
}

// Función wrap para índices cíclicos
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

/* ---------- Variantes Framer Motion ---------- */
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95, // Leve efecto de zoom in
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95, // Leve efecto de zoom out al salir
  }),
};

/* ---------- Componente ---------- */
function PromotionsSliderComponent({
  images,
  interval = 5000,
  mobileMinVH = 56,
  id,
}: PromotionsSliderProps) {
  // Estado: [pagina actual, dirección de la animación]
  const [[page, direction], setPage] = useState([0, 0]);

  // Índice calculado (wrap maneja negativos y overflow)
  const imageIndex = wrap(0, images.length, page);
  const total = images.length;

  const isMobile = useMedia("(max-width: 640px)");
  const reduceMotion = usePrefersReducedMotion();

  const generatedId = useId();
  const regionId = id ?? generatedId;

  const rootRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const inViewRef = useRef<boolean>(true);

  // --- Navegación ---
  const paginate = useCallback((newDirection: number) => {
    setPage((prev) => [prev[0] + newDirection, newDirection]);
  }, []);

  const goTo = useCallback((idx: number) => {
    setPage((prev) => {
      const currentIdx = wrap(0, total, prev[0]);
      const diff = idx - currentIdx;
      // Si es el mismo, no hacemos nada
      if (diff === 0) return prev;
      return [prev[0] + diff, diff > 0 ? 1 : -1];
    });
  }, [total]);

  // --- Autoplay ---
  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current === null && !reduceMotion && inViewRef.current && total > 1) {
      timerRef.current = window.setInterval(() => {
        paginate(1);
      }, interval);
    }
  }, [interval, reduceMotion, total, paginate]);

  // Efectos de ciclo de vida del timer
  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, [startTimer, clearTimer]);

  // Pausa en cambio de pestaña
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "hidden") clearTimer();
      else startTimer();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [startTimer, clearTimer]);

  // Pausa si no está en viewport
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        inViewRef.current = visible;
        if (visible) startTimer();
        else clearTimer();
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [startTimer, clearTimer]);

  // --- Resolver Imagen ---
  const resolveSlide = useCallback(
    (s: Slide) => {
      if (typeof s === "string") {
        return {
          src: s,
          alt: "Promoción",
          objectPosition: "50% 50%",
        };
      }
      const pos = isMobile
        ? toObjectPosition(
            s.focus?.mobile,
            s.focus?.desktop ? toObjectPosition(s.focus?.desktop) : "50% 30%"
          )
        : toObjectPosition(
            s.focus?.desktop,
            s.focus?.mobile ? toObjectPosition(s.focus?.mobile) : "50% 50%"
          );
      return { src: s.src, alt: s.alt || "Promoción", objectPosition: pos };
    },
    [isMobile]
  );

  const currentSlide = resolveSlide(images[imageIndex]);

  // Swipe power logic
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section
      ref={rootRef}
      id={regionId}
      className="relative w-full overflow-hidden group"
      role="region"
      aria-roledescription="carousel"
      aria-label="Slider de promociones"
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
    >
      {/* Contenedor responsivo */}
      <div
        className={clsx(
          "relative w-full z-0 overflow-hidden bg-gray-100", // bg-gray-100 para evitar flash blanco
          "aspect-[4/5] sm:aspect-[3/2] md:aspect-[16/9] 2xl:aspect-[21/9]"
        )}
        style={{
          minHeight: `clamp(320px, ${mobileMinVH}svh, 720px)`,
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            <Image
              src={currentSlide.src}
              alt={currentSlide.alt}
              fill
              sizes="100vw"
              style={{ objectPosition: currentSlide.objectPosition }}
              className="object-cover"
              priority
              draggable={false} // Evita drag nativo del navegador
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div aria-live="polite" className="sr-only">
        {`Promoción ${imageIndex + 1} de ${total}`}
      </div>

      {/* Controles y Bullets */}
      {total > 1 && (
        <>
          {/* Botón Anterior */}
          <button
            onClick={() => paginate(-1)}
            className="absolute top-1/2 left-3 sm:left-6 -translate-y-1/2
                       bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20
                       text-white p-2 sm:p-3 rounded-full
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300
                       focus-visible:opacity-100 focus-visible:ring z-20"
            aria-label="Anterior"
          >
            <HiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Botón Siguiente */}
          <button
            onClick={() => paginate(1)}
            className="absolute top-1/2 right-3 sm:right-6 -translate-y-1/2
                       bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20
                       text-white p-2 sm:p-3 rounded-full
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300
                       focus-visible:opacity-100 focus-visible:ring z-20"
            aria-label="Siguiente"
          >
            <HiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Bullets */}
          <div
            className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2
                       flex gap-2 sm:gap-3 z-20 pointer-events-auto"
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Ir a promoción ${idx + 1}`}
                aria-controls={regionId}
                aria-current={idx === imageIndex ? "true" : "false"}
                className={clsx(
                  "h-1.5 sm:h-2 rounded-full transition-all duration-300 focus-visible:ring",
                  idx === imageIndex
                    ? "w-6 sm:w-8 bg-white"
                    : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

const PromotionsSlider = React.memo(PromotionsSliderComponent);
PromotionsSlider.displayName = "PromotionsSlider";

export default PromotionsSlider;
