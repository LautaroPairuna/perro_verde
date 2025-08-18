// src/lib/seo.tsx
import * as React from "react";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function absoluteUrl(path: string = "/"): string {
  try {
    return new URL(path, SITE_URL).toString();
  } catch {
    return `${SITE_URL.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
  }
}

export function productPath(id: number | string, slug?: string) {
  // Ajusta si tu ruta real es /producto/:slug o /productos/:id
  return `/productos/${slug ?? id}`;
}

export function imagePathSlider(file: string) {
  return `/images/slider/${file}`;
}

export function imagePathProducto(file?: string | null) {
  return file ? `/images/productos/${file}` : "/images/placeholder-producto.jpg";
}

export function brandLogoPath(file?: string | null) {
  return file ? `/images/marcas/${file}` : "/images/placeholder-marca.png";
}

/** Inyecta JSON-LD validado en SSR sin hydration warnings */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
