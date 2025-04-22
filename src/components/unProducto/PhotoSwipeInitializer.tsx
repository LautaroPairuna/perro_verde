'use client';

import { useEffect } from 'react';
import 'photoswipe/style.css';

export const PhotoSwipeInitializer: React.FC = () => {
  useEffect(() => {
    let lightbox: any;

    (async () => {
      try {
        const PhotoSwipeLightbox = (await import('photoswipe/lightbox')).default;
        const pswpModule = () => import('photoswipe');

        lightbox = new PhotoSwipeLightbox({
          gallery: '#gallery',
          children: 'a',
          pswpModule,
        });
        lightbox.init();
      } catch (error) {
        console.error('Error initializing PhotoSwipe:', error);
      }
    })();

    // Cleanup al desmontar el componente
    return () => {
      if (lightbox && typeof lightbox.destroy === 'function') {
        lightbox.destroy();
      }
    };
  }, []);

  return null;
};
