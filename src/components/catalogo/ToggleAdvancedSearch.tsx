// src/components/catalogo/ToggleAdvancedSearch.tsx
"use client";

import React, { useState } from 'react';

interface ToggleAdvancedSearchProps {
  children: React.ReactNode;
}

/**
 * Client Component que maneja el estado local para
 * mostrar/ocultar su contenido (donde pones AdvancedSearchForm).
 */
export default function ToggleAdvancedSearch({ children }: ToggleAdvancedSearchProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="text-center">
      <button
        onClick={handleToggle}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        aria-expanded={isOpen}
      >
        Búsqueda Avanzada
      </button>

      {/* 
        Si isOpen es true, mostramos el children con scale-100,
        de lo contrario hidden + scale-95 
      */}
      <div
        className={`mb-6 bg-white p-8 rounded-lg shadow-lg transition-transform duration-300 transform ${
          isOpen ? 'scale-100' : 'scale-95 hidden'
        }`}
        id="advancedSearchMenu"
      >
        {children}
      </div>
    </div>
  );
}
