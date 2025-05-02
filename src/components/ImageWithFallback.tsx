// src/components/ImageWithFallback.tsx
'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import clsx from 'clsx';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  fallbackSrc = '/images/productos/placeholder.jpg',
  alt,
  fill,
  width,
  height,
  className,
  style,
  ...rest
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
  };

  // RENDERIZADO CON fill (sin width/height explícitos)
  if (fill) {
    return (
      <div
        className={clsx('relative w-full h-full', className)}
        style={style}
      >
        <Image
          key={currentSrc}
          src={currentSrc}
          alt={alt || ''}
          fill
          className="object-cover"
          onError={handleError}
          unoptimized
          {...rest}
        />
      </div>
    );
  }

  // RENDERIZADO CON width/height explícitos
  return (
    <Image
      key={currentSrc}
      src={currentSrc}
      alt={alt || ''}
      width={width}
      height={height}
      onError={handleError}
      unoptimized
      className={className}
      style={style}
      {...rest}
    />
  );
}
