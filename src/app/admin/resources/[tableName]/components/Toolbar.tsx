'use client'
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import {
  HiPlus, HiTrash, HiAdjustments, HiSearch, HiX, HiFilter
} from 'react-icons/hi'

type Props = {
  readOnly: boolean
  selectedCount: number
  onNew: () => void
  onDeleteSelected: () => void
  onBulkEdit: () => void
  search: string
  setSearch: (v: string) => void
  pageSize: number
  setPageSize: (n: number) => void
  onToggleFilters: () => void
  activeFiltersCount: number
}

export const Toolbar = memo(function Toolbar({
  readOnly,
  selectedCount,
  onNew,
  onDeleteSelected,
  onBulkEdit,
  search,
  setSearch,
  pageSize,
  setPageSize,
  onToggleFilters,
  activeFiltersCount,
}: Props) {
  /* estado local para debounce del buscador */
  const [q, setQ] = useState(search)
  useEffect(() => setQ(search), [search])
  useEffect(() => {
    const id = setTimeout(() => setSearch(q), 250)
    return () => clearTimeout(id)
  }, [q, setSearch])

  /* persistir page size */
  useEffect(() => {
    const saved = localStorage.getItem('admin.pageSize')
    if (saved && !Number.isNaN(+saved)) setPageSize(+saved)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    localStorage.setItem('admin.pageSize', String(pageSize))
  }, [pageSize])

  /* atajos de teclado */
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable
      if (!isTyping && e.key === '/') { e.preventDefault(); inputRef.current?.focus(); }
      if (!isTyping && e.key.toLowerCase() === 'n') onNew()
      if (!isTyping && e.key.toLowerCase() === 'b' && selectedCount > 0) onBulkEdit()
      if (!isTyping && (e.key === 'Delete' || e.key === 'Backspace') && selectedCount > 0) onDeleteSelected()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onNew, onBulkEdit, onDeleteSelected, selectedCount])

  const disableBulk = useMemo(() => selectedCount === 0, [selectedCount])

  return (
    <div className="
      sticky top-2 z-10
      flex flex-wrap items-center justify-between gap-2 mb-2
      bg-white/85 backdrop-blur py-2
    ">
      <div className="flex items-center gap-2">
        {!readOnly && (
          <button
            onClick={onNew}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
          >
            <HiPlus className="mr-2" /> Nuevo
          </button>
        )}

        {!readOnly && selectedCount > 0 && (
          <>
            <button
              onClick={onDeleteSelected}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              <HiTrash className="mr-2" /> Eliminar ({selectedCount})
            </button>
            <button
              onClick={onBulkEdit}
              disabled={disableBulk}
              className="flex items-center bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded transition"
            >
              <HiAdjustments className="mr-2" /> Editar ({selectedCount})
            </button>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleFilters}
          className={`
            relative p-2 rounded-lg border transition
            ${activeFiltersCount > 0
              ? 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100'
              : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }
          `}
          title="Filtros"
        >
          <HiFilter className="h-5 w-5" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Search con icono y clear */}
        <div className="relative">
          <HiSearch className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Buscar…  ( / )"
            aria-label="Buscar"
            className="pl-9 pr-9 py-2 w-56 sm:w-64 border rounded
                       bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {q && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              aria-label="Limpiar búsqueda"
              onClick={() => { setQ(''); setSearch('') }}
              type="button"
            >
              <HiX className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Page size */}
        <select
          value={pageSize}
          onChange={e => setPageSize(+e.target.value)}
          aria-label="Filas por página"
          className="px-3 py-2 border rounded bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {[5, 10, 25, 50].map(n => (
            <option key={n} value={n}>{n} filas</option>
          ))}
        </select>
      </div>
    </div>
  )
})
