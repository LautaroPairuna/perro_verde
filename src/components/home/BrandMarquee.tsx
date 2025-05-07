// src/components/home/BrandMarquee.tsx
'use client';

import React from 'react';
import slugify from '@/utils/slugify';
import Image from 'next/image';
import Link from 'next/link';
import type { Brand } from './HomeClientComponents';

interface Props {
  brands: Brand[];
}

export default function BrandMarquee({ brands }: Props) {
  return (
    <section className="bg-white py-8 overflow-hidden group">
      <div className="max-w-7xl mx-auto px-4">
        <div className="pt-2 pb-6">
          <h2 className="text-4xl font-extrabold text-center text-green-900">
              Nuestras Marcas
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
        {/* Compensa el padding lateral para que el marquee empiece en el borde */}
        <div className="relative whitespace-nowrap text-[0] -mx-4">
          <div className="inline-block animate-marquee">
            {[...brands, ...brands].map((brand, idx) => (
              <div
                key={idx}
                className="inline-block align-middle w-24 sm:w-32 md:w-36 lg:w-40 my-4 mx-6"
              >
                <Link href={`/catalogo/marca-${slugify(brand.marca)}/pagina-1`}>
                  <div className="relative aspect-square w-full transition-transform duration-300 hover:scale-110">
                    <Image
                      src={`/images/marcas/thumbs/${brand.foto || 'placeholder.jpg'}`}
                      alt={`Logo de ${brand.marca}`}
                      loading="lazy"
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
