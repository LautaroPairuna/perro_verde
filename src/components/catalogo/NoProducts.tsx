// src/components/catalogo/NoProducts.tsx
import React from 'react';
import Link from 'next/link';

interface NoProductsProps {
  message: string;
}

const NoProducts: React.FC<NoProductsProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4">
      {/* Contenedor del ícono animado: fondo circular con gradiente y efecto pulse */}
      <div className="relative flex items-center justify-center w-28 h-28 mb-8 bg-gradient-to-r from-green-200 to-green-400 rounded-full shadow-2xl animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" className="opacity-75" />
          <line x1="15" y1="9" x2="9" y2="15" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="9" y1="9" x2="15" y2="15" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Oops, no encontramos resultados
      </h2>
      <p className="text-xl text-gray-600 mb-10 text-center max-w-xl">
        {message || "Parece que no hay productos disponibles para tu búsqueda."}
      </p>
      <Link
        href="/catalogo"
        className="inline-flex items-center justify-center px-10 py-4 bg-green-600 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300"
      >
        Volver al Catálogo
      </Link>
    </div>
  );
};

export default NoProducts;
