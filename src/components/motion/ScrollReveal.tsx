"use client";

import React, { useRef } from "react";
import { motion, useInView, UseInViewOptions, Variants } from "framer-motion";

type ScrollRevealProps = {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  duration?: number;
  viewport?: UseInViewOptions;
  variant?: "fade-up" | "fade-in" | "scale-up" | "slide-left" | "slide-right";
};

export default function ScrollReveal({
  children,
  width = "100%",
  className = "",
  delay = 0,
  duration = 0.5,
  viewport = { once: true, amount: 0.2 },
  variant = "fade-up",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewport);

  const variantsMap: Record<string, Variants> = {
    "fade-up": {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    "fade-in": {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    "scale-up": {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    "slide-left": {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
  };

  const selectedVariant = variantsMap[variant];

  return (
    <motion.div
      ref={ref}
      variants={selectedVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      style={{ width, position: "relative" }}
    >
      {children}
    </motion.div>
  );
}
