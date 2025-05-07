// src/components/home/RubrosGrid.tsx
'use client';

import React from 'react';
import slugify from '@/utils/slugify';
import Link from 'next/link';
import type { CfgRubros } from '@prisma/client';
import ImageWithFallback from '@/components/ImageWithFallback';

interface RubrosGridProps {
  rubros: Array<Pick<CfgRubros, 'id' | 'rubro' | 'foto'>>;
}

export default function RubrosGrid({ rubros }: RubrosGridProps) {
  // Agrupamos en filas de máximo 4
  const filas: Array<Array<RubrosGridProps['rubros'][0]>> = [];
  for (let i = 0; i < rubros.length; i += 4) {
    filas.push(rubros.slice(i, i + 4));
  }

  return (
    <section className="w-full bg-white">
      {/* Header */}
        <div className="py-6">
            <h2 className="text-4xl font-extrabold text-center text-green-900">
                Categorías Destacadas
            </h2>
            <div
                className="
                mt-2
                h-1
                w-40
                mx-auto
                rounded-full
                bg-gradient-to-r
                from-green-700
                via-green-500
                to-green-700
                "
            />
        </div>

      {/* Filas dinámicas */}
      {filas.map((fila, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-px"
          style={{
            // repetimos tantas columnas como elementos tenga la fila (1–4)
            gridTemplateColumns: `repeat(${fila.length}, minmax(0, 1fr))`,
          }}
        >
          {fila.map(({ id, rubro, foto }) => {
            const imgSrc = foto && !foto.startsWith('http') && !foto.startsWith('/')
              ? `/images/rubros/${foto}`
              : foto || '/images/placeholder.png';
            const href = `/catalogo/categoria-${slugify(rubro)}/pagina-1`;

            return (
              <Link
                key={id}
                href={href}
                className="relative block w-full group"
              >
                {/* Imagen full-bleed ratio 3/2 */}
                <div className="w-full aspect-[3/2] overflow-hidden">
                  <ImageWithFallback
                    src={imgSrc}
                    alt={rubro}
                    fill
                    className="
                      object-cover
                      transition-transform duration-500 ease-in-out
                      group-hover:scale-105
                      group-hover:brightness-75
                    "
                    unoptimized
                  />
                </div>

                {/* Overlay + Botón */}
                <div
                className="
                    absolute inset-0
                    flex items-center justify-center
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500 ease-in-out
                "
                >
                    <button
                        className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        font-semibold
                        px-5
                        py-2
                        rounded-lg
                        shadow-lg
                        transition-all
                        duration-300
                        transform
                        hover:scale-105
                        "
                    >
                        Ver más
                    </button>
                </div>

                {/* Título centrado abajo */}
                <div className="absolute inset-0 flex items-end pl-4 pb-4 pointer-events-none">
                  <span className="text-white text-2xl font-bold drop-shadow-lg">
                    {rubro}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ))}
    </section>
  );
}
