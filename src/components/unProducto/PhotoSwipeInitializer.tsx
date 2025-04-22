// src/components/unProducto/PhotoSwipeInitializer.tsx
'use client';

import { useEffect } from 'react';
import 'photoswipe/style.css';
import type PhotoSwipeLightbox from 'photoswipe/lightbox';

export const PhotoSwipeInitializer: React.FC = () => {
  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | undefined;

    (async () => {
      try {
        const { default: PSLightbox } = await import('photoswipe/lightbox');
        lightbox = new PSLightbox({
          gallery: '#gallery',
          children: 'a',
          pswpModule: () => import('photoswipe'),
        });
        lightbox.init();
      } catch (error) {
        console.error('Error initializing PhotoSwipe:', error);
      }
    })();

    return () => {
      if (lightbox) lightbox.destroy();
    };
  }, []);

  return null;
};
