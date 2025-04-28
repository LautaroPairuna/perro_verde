// src/components/unProducto/Galeria.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const PLACEHOLDER_THUMB = '/images/productos/fotos/placeholder.jpg';
const ADMIN_HOST        = process.env.NEXT_PUBLIC_ADMIN_HOST!;

interface GalleryImage {
  src: string;
  thumb: string;
  alt: string;
  pswpWidth: number;
  pswpHeight: number;
}

async function validateImage(url: string): Promise<boolean> {
  try {
    // Cabezal HEAD para verificar existencia
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

async function validateImages(images: GalleryImage[]): Promise<GalleryImage[]> {
  return Promise.all(
    images.map(async img => {
      const fullSrc  = img.src.startsWith('http') ? img.src : `${ADMIN_HOST}${img.src}`;
      const ok       = await validateImage(fullSrc);
      const finalSrc = ok ? fullSrc : `${ADMIN_HOST}${PLACEHOLDER_THUMB}`;
      const finalThumb = ok
        ? img.thumb.startsWith('http') ? img.thumb : `${ADMIN_HOST}${img.thumb}`
        : `${ADMIN_HOST}${PLACEHOLDER_THUMB}`;
      return { ...img, src: finalSrc, thumb: finalThumb };
    })
  );
}

const Galeria: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loaded,  setLoaded] = useState(false);

  useEffect(() => {
    const raw: GalleryImage[] = [
      { src: '/images/large1.jpg', thumb: '/images/thumb1.jpg', alt: 'Image 1', pswpWidth: 800, pswpHeight: 800 },
      { src: '/images/large2.jpg', thumb: '/images/thumb2.jpg', alt: 'Image 2', pswpWidth: 800, pswpHeight: 800 },
      // …añade tus imágenes aquí
    ];
    validateImages(raw).then(validated => {
      setImages(validated);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    import('photoswipe/lightbox')
      .then(({ default: PhotoSwipeLightbox }) => {
        const lightbox = new PhotoSwipeLightbox({
          gallery: '#gallery',
          children: 'a',
          pswpModule: () => import('photoswipe'),
        });
        lightbox.init();
      })
      .catch(err => console.error('Error initializing PhotoSwipe:', err));
  }, [loaded]);

  return (
    <>
      <style jsx>{`
        .fade-in { opacity: 0; transition: opacity 0.5s ease-in-out; }
        .fade-in.loaded { opacity: 1; }
      `}</style>

      <div id="gallery" className="grid grid-cols-1 gap-4">
        {images.map((img, i) => (
          <a
            key={i}
            href={img.src}
            data-pswp-width={img.pswpWidth}
            data-pswp-height={img.pswpHeight}
            data-index={i}
          >
            <Image
              src={img.thumb}
              alt={img.alt}
              width={300}
              height={300}
              className={`object-cover rounded cursor-pointer fade-in ${loaded ? 'loaded' : ''}`}
              onError={e => {
                // Fallback en caso de error
                (e.currentTarget as HTMLImageElement).src = `${ADMIN_HOST}${PLACEHOLDER_THUMB}`;
              }}
            />
          </a>
        ))}
      </div>
    </>
  );
};

export default Galeria;
