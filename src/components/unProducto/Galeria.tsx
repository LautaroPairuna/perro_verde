'use client'

import React from 'react'
import Image from 'next/image'
import { PhotoSwipeInitializer } from './PhotoSwipeInitializer'

export interface GalleryImage {
  src: string
  thumb: string
  alt: string
  pswpWidth: number
  pswpHeight: number
}

const PLACEHOLDER = '/images/productos/fotos/placeholder.jpg'

interface GaleriaProps {
  images: GalleryImage[]
}

export default function Galeria({ images }: GaleriaProps) {
  return (
    <>
      <PhotoSwipeInitializer />

      <div
        id="gallery"
        className="
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
      >
        {images.map((img, i) => (
          <a
            key={i}
            href={img.src}
            data-pswp-width={img.pswpWidth}
            data-pswp-height={img.pswpHeight}
            className="relative w-full aspect-square overflow-hidden rounded-lg shadow-sm hover:scale-105 transition"
          >
            <Image
              src={img.thumb}
              alt={img.alt}
              fill
              style={{ objectFit: 'cover' }}
              onError={(e) => { e.currentTarget.src = PLACEHOLDER }}
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </a>
        ))}
      </div>
    </>
  )
}
