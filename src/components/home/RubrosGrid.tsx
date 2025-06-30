'use client';

import React, { useMemo } from 'react';
import clsx from 'clsx';
import slugify from '@/utils/slugify';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useBreakpointCols } from '@/hooks/useBreakpointCols';

interface Rubro { id: number; rubro: string; foto?: string | null }
interface RubrosGridProps { rubros: Rubro[] }

export default function RubrosGrid({ rubros }: RubrosGridProps) {
  // 1) Cuántas columnas ahora
  const cols = useBreakpointCols();

  // 2) Parto en filas de 'cols' elementos
  const filas = useMemo(() => {
    const arr: Rubro[][] = [];
    for (let i = 0; i < rubros.length; i += cols) {
      arr.push(rubros.slice(i, i + cols));
    }
    return arr;
  }, [rubros, cols]);

  return (
    <section className="w-full bg-white">
      {/* Header */}
      <div className="py-6">
        <h2 className="text-4xl font-extrabold text-center text-green-900">
          Categorías Destacadas
        </h2>
        <div className="mt-2 h-1 w-40 mx-auto rounded-full bg-gradient-to-r from-green-700 via-green-500 to-green-700"/>
      </div>

      {/* 3) Por cada fila, un grid con N = fila.length columnas */}
      {filas.map((fila, rowIdx) => {
        // construyo las clases estáticas que Tailwind detecte
        const colsClass = clsx({
          'grid-cols-1': fila.length === 1,
          'grid-cols-2': fila.length === 2,
          'grid-cols-3': fila.length === 3,
          'grid-cols-4': fila.length >= 4,
        });

        return (
          <div key={rowIdx} className={`grid gap-px ${colsClass}`}>
            {fila.map(({ id, rubro, foto }) => {
              const imgSrc =
                foto && !/^https?:/.test(foto)
                  ? `/images/rubros/${foto}`
                  : foto || '/images/placeholder.png';
              const href = `/catalogo/categoria-${slugify(rubro)}/pagina-1`;

              return (
                <Link
                  key={id}
                  href={href}
                  aria-label={`Ver más sobre ${rubro}`}
                  className="relative block w-full group"
                >
                  {/* Imagen 3:2 */}
                  <div className="w-full aspect-[3/2] overflow-hidden">
                    <ImageWithFallback
                      src={imgSrc}
                      alt={rubro}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75"
                    />
                  </div>

                  {/* Overlay + botón */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                    <span
                      role="button"
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                    >
                      Ver más
                    </span>
                  </div>

                  {/* Título */}
                  <div className="absolute inset-0 flex items-end pl-4 pb-4 pointer-events-none">
                    <span className="text-white text-2xl font-bold drop-shadow-lg">
                      {rubro}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}
