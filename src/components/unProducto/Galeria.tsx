// src/components/unProducto/Galeria.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const PLACEHOLDER_THUMB = '/images/productos/thumbs/placeholder.jpg';

interface GalleryImage {
  src: string;
  thumb: string;
  alt: string;
  pswpWidth: number;
  pswpHeight: number;
}

// Función para validar si una imagen existe (simula un HEAD fetch)
async function validateImage(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

async function validateImages(images: GalleryImage[]): Promise<GalleryImage[]> {
  const validations = images.map(async (img) => {
    const isValid = await validateImage(img.src);
    return isValid ? img : { ...img, src: PLACEHOLDER_THUMB, thumb: PLACEHOLDER_THUMB };
  });
  return Promise.all(validations);
}

const Galeria: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Array inicial de imágenes (puede llegar via props o datos)
  const imagesRaw: GalleryImage[] = [
    { src: '/images/large1.jpg', thumb: '/images/thumb1.jpg', alt: 'Image 1', pswpWidth: 800, pswpHeight: 800 },
    { src: '/images/large2.jpg', thumb: '/images/thumb2.jpg', alt: 'Image 2', pswpWidth: 800, pswpHeight: 800 },
  ];

  useEffect(() => {
    validateImages(imagesRaw).then(validated => {
      setImages(validated);
      setLoaded(true);
    });
  }, [imagesRaw]);

  useEffect(() => {
    // Inicializamos PhotoSwipe solo cuando la galería se ha cargado
    if (loaded) {
      import('photoswipe/lightbox').then(({ default: PhotoSwipeLightbox }) => {
        const lightbox = new PhotoSwipeLightbox({
          gallery: '#gallery',
          children: 'a',
          pswpModule: () => import('photoswipe'),
        });
        lightbox.init();
      }).catch(error => {
        console.error('Error initializing PhotoSwipe:', error);
      });
    }
  }, [loaded]);

  return (
    <>
      <style jsx>{`
        .fade-in {
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .fade-in.loaded {
          opacity: 1;
        }
      `}</style>
      <div id="gallery" className="grid grid-cols-1 gap-4">
        {images.map((img, index) => (
          <a key={index} href={img.src} data-pswp-width={img.pswpWidth} data-pswp-height={img.pswpHeight} data-index={index}>
            <Image
              src={img.thumb}
              alt={img.alt}
              width={300}
              height={300}
              className={`object-cover rounded cursor-pointer fade-in ${loaded ? 'loaded' : ''}`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_THUMB;
              }}
            />
          </a>
        ))}
      </div>
    </>
  );
};

export default Galeria;
