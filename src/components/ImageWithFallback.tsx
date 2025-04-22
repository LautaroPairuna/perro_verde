"use client";
import React, { useState } from "react";

type FallbackErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;

interface ImageWithFallbackProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "onError"> {
  src: string;
  fallbackSrc?: string;
  onFallbackError?: FallbackErrorHandler;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = (props) => {
  const {
    src,
    alt,
    fallbackSrc = "/images/productos/thumbs/placeholder.jpg",
    onFallbackError,
    ...rest
  } = props;

  const [imgSrc, setImgSrc] = useState(src);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImgSrc(fallbackSrc);
    // si el usuario definió onFallbackError, llamarlo también
    if (onFallbackError) {
      onFallbackError(e);
    }
  };

  return (
    <img
      {...rest} // className, style, etc.
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;
