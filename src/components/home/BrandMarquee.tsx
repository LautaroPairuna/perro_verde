// src/components/BrandMarquee.tsx
import React from 'react';
import slugify from '@/utils/slugify';
import { prisma } from '../../lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

export default async function BrandMarquee() {
  const brands = await prisma.cfgMarcas.findMany({
    select: {
      id: true,
      marca: true,
      foto: true,
    },
    where: {
      activo: true,
    },
    orderBy: {
      marca: 'asc',
    },
  });

  return (
    <section className="bg-white py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Nuestras marcas
        </h2>
        <div className="relative whitespace-nowrap text-[0]">
          <div className="inline-block animate-marquee">
            {[...brands, ...brands].map((brand, idx) => (
              <div key={idx} className="inline-block align-middle w-36 my-4 mx-10">
                <Link href={`/catalogo/marca-${slugify(brand.marca)}/pagina-1`}>
                  <div className="relative aspect-square w-full">
                    <Image
                      src={`/images/marcas/thumbs/${brand.foto || 'placeholder.jpg'}`}
                      alt={`Logo de ${brand.marca}`}
                      loading="lazy"
                      fill
                      sizes="9rem"
                      className="absolute inset-0 w-full h-full object-contain"
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
