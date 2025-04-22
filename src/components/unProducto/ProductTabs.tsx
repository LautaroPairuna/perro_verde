// src/components/unProducto/ProductTabs.tsx
'use client';

import React, { useState } from 'react';

interface Especificacion {
  categoria?: string;
  especificaciones?: string;
}

interface Product {
  especificaciones?: Especificacion[];
  descripcion?: string;
  garantia?: string;
}

interface ProductTabsProps {
  product: Product;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const tabs = [
    { id: 'specs', label: 'Especificaciones Técnicas' },
    { id: 'description', label: 'Descripción' },
    { id: 'warranty', label: 'Garantía' },
  ];

  // La pestaña activa se inicializa en "specs" (por defecto)
  const [activeTab, setActiveTab] = useState<string>('specs');

  const activateTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      {/* Botones de las pestañas */}
      <div className="flex border-b border-gray-300">
        {tabs.map(tab => {
          const isActive = tab.id === activeTab;
          const buttonClass = isActive
            ? 'px-6 py-3 text-lg font-medium focus:outline-none transition-colors duration-300 text-white bg-green-700'
            : 'px-6 py-3 text-lg font-medium focus:outline-none transition-colors duration-300 text-green-700 bg-transparent';
          const underlineClass = isActive
            ? 'absolute left-0 bottom-0 h-0.5 w-full bg-green-700 transform transition-transform duration-300 scale-x-100'
            : 'absolute left-0 bottom-0 h-0.5 w-full bg-green-700 transform transition-transform duration-300 scale-x-0';

          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              data-tab={tab.id}
              role="tab"
              aria-selected={isActive ? 'true' : 'false'}
              aria-controls={tab.id}
              onClick={() => activateTab(tab.id)}
              className={`group relative ${buttonClass}`}
            >
              {tab.label}
              {/* Línea de subrayado animada */}
              <span className={underlineClass}></span>
            </button>
          );
        })}
      </div>

      {/* Contenedor de contenido de las pestañas */}
      <div id="tab-content" className="mt-6">
        {/* Panel: Especificaciones Técnicas */}
        <div
          id="specs"
          role="tabpanel"
          aria-labelledby="tab-specs"
          className={`tab-pane transition-opacity duration-300 ${
            activeTab === 'specs' ? 'block opacity-100' : 'hidden opacity-0'
          }`}
        >
          {product.especificaciones && product.especificaciones.length > 0 ? (
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-800 font-semibold border-b border-gray-300">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-gray-800 font-semibold border-b border-gray-300">
                      Especificación
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.especificaciones.map((especificacion, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-300">
                      <td className="px-6 py-4 border-b border-gray-300 text-gray-700">
                        {especificacion.categoria || 'Sin categoría'}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 text-gray-800">
                        {especificacion.especificaciones || 'Sin especificación'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No hay especificaciones disponibles.</p>
          )}
        </div>

        {/* Panel: Descripción */}
        <div
          id="description"
          role="tabpanel"
          aria-labelledby="tab-description"
          className={`tab-pane transition-opacity duration-300 ${
            activeTab === 'description' ? 'block opacity-100' : 'hidden opacity-0'
          }`}
        >
          {product.descripcion ? (
            // Usamos dangerouslySetInnerHTML para insertar HTML proveniente de la descripción
            <div
              className="code_html mt-4"
              dangerouslySetInnerHTML={{ __html: product.descripcion }}
            ></div>
          ) : (
            <p className="text-gray-500 mt-4">Descripción no disponible.</p>
          )}
        </div>

        {/* Panel: Garantía */}
        <div
          id="warranty"
          role="tabpanel"
          aria-labelledby="tab-warranty"
          className={`tab-pane transition-opacity duration-300 ${
            activeTab === 'warranty' ? 'block opacity-100' : 'hidden opacity-0'
          }`}
        >
          {product.garantia ? (
            <p className="text-gray-700 mt-4">{product.garantia}</p>
          ) : (
            <p className="text-gray-500 mt-4">Garantía no disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
