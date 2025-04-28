// src/components/ImageWithFallback.tsx
'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string;              // puede venir "/images/..." o URL absoluta
  fallbackSrc?: string;     // idem
}

const ADMIN_HOST = process.env.NEXT_PUBLIC_ADMIN_HOST!;

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = '/images/productos/thumbs/placeholder.jpg',
  alt,
  ...rest
}) => {
  // Función para anteponer host si es ruta relativa
  const makeUrl = (u: string) =>
    u.startsWith('http') ? u : `${ADMIN_HOST}${u}`;

  const [imgSrc, setImgSrc] = useState(() => makeUrl(src));
  const fbSrc = makeUrl(fallbackSrc);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fbSrc)}
      // Width/height por defecto (puedes pasarlos via rest)
      width={rest.width ?? 300}
      height={rest.height ?? 300}
    />
  );
};

export default ImageWithFallback;
