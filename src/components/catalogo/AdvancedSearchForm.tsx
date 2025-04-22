"use client";

import React, { useState, FormEvent } from 'react';

// Interfaz de props
interface AdvancedSearchFormProps {
  // Listas de marcas y rubros con id, name y slug
  marcas: { id: number; name: string; slug: string }[];
  rubros: { id: number; name: string; slug: string }[];

  // Slugs que vienen de la URL parseada (para iniciar el form)
  marca_slug: string;
  categoria_slug: string;
  keywords: string;
}

const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  marcas,
  rubros,
  marca_slug,
  categoria_slug,
  keywords,
}) => {
  // Estado local para el contenido del form (keywords, marca, categoría)
  const [formData, setFormData] = useState({
    keywords: keywords || '',
    marca: marca_slug || '',
    categoria: categoria_slug || '',
  });

  // Estado para mostrar/ocultar el formulario
  const [isOpen, setIsOpen] = useState(false);

  // Manejador de toggle; se usa un efecto de scale leve para el botón en lugar de una rotación agresiva
  const handleToggle = () => setIsOpen((prev) => !prev);

  // Manejador de cambios en inputs/select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Al hacer submit, armamos la URL y redirigimos
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let href = '/catalogo';
    if (formData.keywords.trim()) {
      const kw = formData.keywords.trim().replace(/\s+/g, '-');
      href += `/keys-${encodeURIComponent(kw)}`;
    }
    if (formData.marca) {
      href += `/marca-${encodeURIComponent(formData.marca)}`;
    }
    if (formData.categoria) {
      href += `/categoria-${encodeURIComponent(formData.categoria)}`;
    }
    href += '/pagina-1';
    window.location.href = href;
  };

  // Al limpiar, reseteamos el state y redirigimos
  const handleClear = () => {
    setFormData({ keywords: '', marca: '', categoria: '' });
    window.location.href = '/catalogo/pagina-1';
  };

  return (
    <div className="px-4 py-6">
      {/* Botón Toggle centrado */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleToggle}
          className="px-6 py-2 bg-green-600 text-white rounded-lg 
                     hover:bg-green-700 transition-transform duration-200
                     transform hover:scale-105"
          aria-expanded={isOpen}
        >
          Búsqueda Avanzada
        </button>
      </div>

      {/* Contenedor del formulario con animación sutil de apertura */}
      <div
        className={`overflow-hidden transition-all duration-300
                    ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Filtros Avanzados
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Filtro por Palabras Clave */}
            <div className="md:col-span-3">
              <label htmlFor="keywords" className="block text-left text-gray-800 font-medium mb-1">
                Búsqueda:
              </label>
              <input
                type="text"
                id="keywords"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                placeholder="Buscar productos..."
                className="block w-full border border-green-700 rounded-lg px-4 py-2 shadow-sm 
                           focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              />
            </div>

            {/* Filtro por Marca */}
            <div>
              <label htmlFor="marca" className="block text-left text-gray-800 font-medium mb-1">
                Marca:
              </label>
              <select
                id="marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                className="block w-full border border-green-700 rounded-lg px-4 py-2 shadow-sm 
                           focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              >
                <option value="">Todas las marcas</option>
                {marcas.length > 0 ? (
                  marcas.map((m) => (
                    <option key={m.id} value={m.slug}>
                      {m.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No hay marcas disponibles</option>
                )}
              </select>
            </div>

            {/* Filtro por Categoría */}
            <div>
              <label htmlFor="categoria" className="block text-left text-gray-800 font-medium mb-1">
                Categoría:
              </label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="block w-full border border-green-700 rounded-lg px-4 py-2 shadow-sm 
                           focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              >
                <option value="">Todas las categorías</option>
                {rubros.length > 0 ? (
                  rubros.map((r) => (
                    <option key={r.id} value={r.slug}>
                      {r.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No hay categorías disponibles</option>
                )}
              </select>
            </div>

            {/* Botones de Acción */}
            <div className="md:col-span-3 flex justify-center md:justify-end items-center space-x-4 mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg shadow-md 
                           hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              >
                Aplicar
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md 
                           hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchForm;
