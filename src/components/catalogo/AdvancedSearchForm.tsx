// src/components/catalogo/AdvancedSearchForm.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { HiSearch, HiX } from 'react-icons/hi';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { buildSearchPath, SearchForm } from '@/hooks/useAdvancedSearch';

interface Option { id: number; name: string; slug: string }

interface AdvancedSearchFormProps {
  marcas: Option[];
  rubros: Option[];
  // Ahora sí existen estas props
  marca_slug?: string;
  categoria_slug?: string;
  keywords?: string;
}

export default function AdvancedSearchForm({
  marcas,
  rubros,
  marca_slug = '',
  categoria_slug = '',
  keywords = '',
}: AdvancedSearchFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<SearchForm>({
    keywords,
    marca: marca_slug,
    categoria: categoria_slug,
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(o => !o);
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(buildSearchPath(form));
  };
  const onClear = () => {
    setForm({ keywords: '', marca: '', categoria: '' });
    router.push('/catalogo/pagina-1');
  };

  return (
    <div className="px-4 py-6">
      {/* Toggle Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls="advanced-search-panel"
          className={clsx(
            'inline-flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-transform',
            'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500',
            isOpen ? 'scale-105' : 'scale-100'
          )}
        >
          {isOpen ? <HiX className="w-5 h-5" /> : <HiSearch className="w-5 h-5" />}
          {isOpen ? 'Ocultar Filtros' : 'Búsqueda Avanzada'}
        </button>
      </div>

      {/* Panel Animado */}
      <div
        id="advanced-search-panel"
        aria-hidden={!isOpen}
        className={clsx(
          'overflow-hidden transition-[max-height,opacity] duration-300',
          isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
            Filtros Avanzados
          </h2>

          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Keywords */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
                Buscar
              </label>
              <input
                id="keywords"
                name="keywords"
                type="text"
                value={form.keywords}
                onChange={onChange}
                placeholder="Palabras clave..."
                className="w-full px-4 py-2 border-2 border-green-600 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            {/* Marca */}
            <div>
              <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-1">
                Marca
              </label>
              <select
                id="marca"
                name="marca"
                value={form.marca}
                onChange={onChange}
                className="w-full px-4 py-2 border-2 border-green-600 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 transition"
              >
                <option value="">Todas las marcas</option>
                {marcas.map(m => (
                  <option key={m.id} value={m.slug}>{m.name}</option>
                ))}
              </select>
            </div>

            {/* Categoría */}
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                id="categoria"
                name="categoria"
                value={form.categoria}
                onChange={onChange}
                className="w-full px-4 py-2 border-2 border-green-600 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 transition"
              >
                <option value="">Todas las categorías</option>
                {rubros.map(r => (
                  <option key={r.id} value={r.slug}>{r.name}</option>
                ))}
              </select>
            </div>

            {/* Acciones */}
            <div className="sm:col-span-2 lg:col-span-3 flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={onClear}
                className="px-5 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              >
                Aplicar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
