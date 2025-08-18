/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-imports */
'use client'

/* ────────────────────────────── 1. IMPORTS ─────────────────────────────── */
import React, { useMemo, useCallback, useReducer, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import {
  HiChevronLeft, HiChevronRight,
  HiCheckCircle, HiXCircle, HiCalendar, HiDocumentText,
  HiPencil, HiTrash, HiEye,
  HiSortAscending, HiSortDescending
} from 'react-icons/hi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useRelations } from './hooks/useRelations'
import { useServerTable } from './hooks/useServerTable'

import { Modal } from './components/Modal'
import { ConfirmModal } from './components/ConfirmModal'
import { DetailContent } from './components/DetailContent'
import { FotoCell } from './components/FotoCell'
import { Form, BulkForm } from './components/Form'
import { Toolbar } from './components/Toolbar'
import { FiltersBar } from './components/FiltersBar'

import {
  DEFAULT_COLUMNS, HIDDEN_COLUMNS, READ_ONLY_RESOURCES, relationLabels,
} from './config'
import { getDefaultColumns, getHiddenColumns } from './utils/adminColumns'
import { buildFD, sanitize } from './utils/formData'
import type { Row, IdLike, Json } from './types'

/* ───────────────────────── 2. HELPERS / CONSTANTES ──────────────────────── */
const fetcher = (u: string) =>
  fetch(u).then(async r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    return r.json()
  })

const dateFmt = new Intl.DateTimeFormat('es-AR')
const csrfHdr = () => ({
  'X-CSRF-Token': document.cookie.match(/(?:^|;\s*)csrfToken=([^;]+)/)?.[1] ?? '',
})

// columnas que pueden ser muy largas (clamp en tabla)
const LONG_TEXT_COLS = new Set(['descripcion', 'detalle', 'especificaciones', 'condiciones'])

const guessFK = (child: string, parent: string) => {
  const hard: Record<string, string> = {
    ProductoFotos:            'producto_id',
    ProductoVersiones:        'producto_id',
    ProductoEspecificaciones: 'producto_id',
  }
  if (hard[child]) return hard[child]
  const cols   = DEFAULT_COLUMNS[child as keyof typeof DEFAULT_COLUMNS] ?? []
  const needle = parent.toLowerCase().replace(/s$/, '')
  return cols.find(c => c.toLowerCase().endsWith('id') && c.toLowerCase().includes(needle)) ?? ''
}

/* ───────────────────────── 3. UI STATE ───────────────────────── */
interface UiState {
  selected: IdLike[]
  createOpen: boolean
  editRow: Row | 'bulk' | null
  detailRow: Row | null
  confirmRows: Row[] | null
}
type UiAction =
  | { type: 'toggleSelect'; id: IdLike }
  | { type: 'selectAll'; ids: IdLike[] }
  | { type: 'resetSelect' }
  | { type: 'openCreate'; open: boolean }
  | { type: 'openEdit'; row: Row | 'bulk' | null }
  | { type: 'openDetail'; row: Row | null }
  | { type: 'confirmDelete'; rows: Row[] | null }

const uiReducer = (s: UiState, a: UiAction): UiState => {
  switch (a.type) {
    case 'toggleSelect':
      return {
        ...s,
        selected: s.selected.includes(a.id)
          ? s.selected.filter(i => i !== a.id)
          : [...s.selected, a.id],
      }
    case 'selectAll':
      return { ...s, selected: s.selected.length === a.ids.length ? [] : a.ids }
    case 'resetSelect':
      return { ...s, selected: [] }
    case 'openCreate':
      return { ...s, createOpen: a.open }
    case 'openEdit':
      return { ...s, editRow: a.row }
    case 'openDetail':
      return { ...s, detailRow: a.row }
    case 'confirmDelete':
      return { ...s, confirmRows: a.rows }
  }
}

/* ───────────────────────── 4. FILTERS TIPOS ───────────────────────── */
// Filtros de UI (permiten undefined/null). Así evitamos el error de tipos con FiltersBar.
type UIFilters = Record<string, string | number | boolean | undefined | null>

const compactFilters = (o: UIFilters): Record<string, string | number | boolean> =>
  Object.fromEntries(
    Object.entries(o).filter(([, v]) => v !== '' && v !== undefined && v !== null)
  ) as Record<string, string | number | boolean>

/* ╭────────────────────── 5. MAIN COMPONENT ────────────────────╮ */
export default function ResourceDetailClient({ tableName }: { tableName: string }) {
  const readOnly = READ_ONLY_RESOURCES.includes(tableName)

  // para título / breadcrumb
  const { data: parentResp, error: parentError, isValidating: loadingParent } =
    useSWR<any>(`/api/admin/resources/${tableName}?page=1&pageSize=50`, fetcher, {
      revalidateOnFocus: false,
      keepPreviousData: true,
    })
  const rows: any[] = Array.isArray(parentResp) ? parentResp : (parentResp?.rows ?? [])

  const relationsData = useRelations(tableName)
  const [child, setChild] = React.useState<{
    childTable: string
    foreignKey: string
    parentId: IdLike
  } | null>(null)

  const [ui, dispatch] = useReducer(uiReducer, {
    selected: [],
    createOpen: false,
    editRow: null,
    detailRow: null,
    confirmRows: null,
  })

  useEffect(() => { dispatch({ type: 'resetSelect' }) }, [tableName, child])

  const resource = child ? child.childTable : tableName

  /* ──────────────── Tabla en servidor: página, sort, búsqueda, filtros ─────────────── */
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [sortBy, setSortBy] = React.useState('id')
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc')
  const [search, setSearch] = React.useState('')
  const [uiFilters, setUIFilters] = React.useState<UIFilters>({})

  // Filtros limpios para el servidor (+ FK si estamos viendo una relación hija)
  const baseClean = useMemo(() => compactFilters(uiFilters), [uiFilters])
  const effectiveFilters = useMemo(
    () => (child ? { ...baseClean, [child.foreignKey]: child.parentId } : baseClean),
    [baseClean, child]
  )

  const { rows: data, total, validating, refresh } = useServerTable(resource, {
    page, pageSize, sortBy, sortDir, search, filters: effectiveFilters,
  })

  /* ──────────────── columnas visibles (readonly → mutable string[]) ─────────────── */
  const rawCols = useMemo(() => {
    const def = getDefaultColumns(DEFAULT_COLUMNS as Record<string, readonly string[]>, resource)
    return def ?? Object.keys((data as Row[])[0] ?? {})
  }, [data, resource])

  const hidden  = getHiddenColumns(HIDDEN_COLUMNS as Record<string, readonly string[]>, resource)
  const visibleCols = useMemo(() => rawCols.filter(c => !hidden.includes(c)), [rawCols, hidden])

  const orderedColumns = useMemo(() => {
    if (tableName === 'Productos' && !child) {
      const first = ['id', 'producto', 'precio']
      return [...first, ...visibleCols.filter(c => !first.includes(c))]
    }
    return visibleCols
  }, [visibleCols, tableName, child])

  /* ──────────────── Rel counts y FK (O(1) por fila) ─────────────── */
  const relMeta = useMemo(() => {
    const map: Record<string, { fk: string; counts: Map<string, number> }> = {}
    for (const rel of relationsData) {
      const relRows = rel.data as Row[]
      const fk =
        relRows.length > 0
          ? (Object.keys(relRows[0]).find(
              k =>
                k.toLowerCase().endsWith('id') &&
                k.toLowerCase().includes(tableName.toLowerCase().replace(/s$/, '')),
            ) ?? guessFK(rel.childTable, tableName))
          : guessFK(rel.childTable, tableName)

      const counts = new Map<string, number>()
      if (relRows?.length && fk) {
        for (const r of relRows) {
          const pid = String(r[fk] as IdLike)
          counts.set(pid, (counts.get(pid) ?? 0) + 1)
        }
      }
      map[rel.childTable] = { fk, counts }
    }
    return map
  }, [relationsData, tableName])

  /* ╭─────────────────────────── CRUD ─────────────────────────╮ */
  const refreshAll = useCallback(() => {
    refresh()
    mutate(`/api/admin/resources/${tableName}?page=1&pageSize=50`)
  }, [refresh, tableName])

  const doUpdate = useCallback(
    async (id: IdLike, body: Record<string, Json>) => {
      const url  = `/api/admin/resources/${resource}/${id}`
      const data = sanitize(body)
      const init: RequestInit =
        data.foto instanceof File
          ? { method: 'PUT', body: buildFD(data), headers: csrfHdr() }
          : {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', ...csrfHdr() },
              body: JSON.stringify(data),
            }
      const res = await fetch(url, init)
      const out = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(out.error || 'Error')
    },
    [resource],
  )

  const handleCreate = useCallback(
    async (raw: Record<string, Json>) => {
      try {
        const { id: _discard, ...clean } = sanitize(raw)
        const endpoint = `/api/admin/resources/${resource}`
        const init: RequestInit =
          clean.foto instanceof File
            ? { method: 'POST', body: buildFD(clean), headers: csrfHdr() }
            : {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...csrfHdr() },
                body: JSON.stringify(clean),
              }
        const res = await fetch(endpoint, init)
        const out = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(out.error || 'Error')
        toast.success('Registro creado')
        dispatch({ type: 'openCreate', open: false })
        refreshAll()
      } catch (e: any) {
        toast.error(e.message)
      }
    },
    [resource, refreshAll],
  )

  const handleUpdate = useCallback(
    async (id: IdLike, raw: Record<string, Json>) => {
      try {
        await doUpdate(id, raw)
        toast.success(`Registro ${id} actualizado`)
        dispatch({ type: 'openEdit', row: null })
        refreshAll()
      } catch (e: any) {
        toast.error(e.message)
      }
    },
    [doUpdate, refreshAll],
  )

  const handleBulk = useCallback(
    async (field: string, val: Json) => {
      if (!field) { toast.error('Definí el campo a modificar'); return }
      try {
        const results = await Promise.allSettled(
          ui.selected.map(id => doUpdate(id, { [field]: val }))
        )
        const failed = results.filter(r => r.status === 'rejected')
        if (failed.length) toast.error(`Fallaron ${failed.length} de ${results.length}`)
        else toast.success(`Actualizados ${ui.selected.length} registro(s)`)
        dispatch({ type: 'openEdit', row: null })
        dispatch({ type: 'resetSelect' })
        refreshAll()
      } catch (e: any) {
        toast.error(e.message)
      }
    },
    [ui.selected, doUpdate, refreshAll],
  )

  const deleteOne = useCallback(
    async (id: IdLike, forced?: string) => {
      const tgt = forced || resource
      const res = await fetch(`/api/admin/resources/${tgt}/${id}`, {
        method: 'DELETE',
        headers: csrfHdr(),
      })
      const out = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(out.error || 'Error')
    },
    [resource],
  )

  const confirmDelete = useCallback(async () => {
    if (!ui.confirmRows) return
    try {
      const results = await Promise.allSettled(
        ui.confirmRows.map(r =>
          deleteOne(
            r.id as IdLike,
            child ? child.childTable : undefined,
          ),
        ),
      )
      const failed = results.filter(r => r.status === 'rejected')
      if (failed.length) toast.error(`Fallaron ${failed.length} eliminaciones`)
      else toast.success('Eliminados correctamente')
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      dispatch({ type: 'confirmDelete', rows: null })
      dispatch({ type: 'resetSelect' })
      refreshAll()
    }
  }, [ui.confirmRows, deleteOne, child, refreshAll])

  /* ╭─────────────────────── renderCell ────────────────────────╮ */
  const parsedDatos = useMemo(() => {
    if (resource !== 'Pedidos') return {} as Record<string, any[]>
    const m: Record<string, any[]> = {}
    ;(data as Row[]).forEach(r => {
      const raw = (r as any).datos
      if (!raw) return
      try {
        m[String(r.id)] = typeof raw === 'string' ? JSON.parse(raw) : raw
      } catch {
        m[String(r.id)] = []
      }
    })
    return m
  }, [data, resource])

  const renderCell = useCallback(
    (val: unknown, col: string, rowId: number) => {
      if (val == null) return <span className="text-gray-400">null</span>

      if (resource === 'Pedidos' && col === 'datos') {
        const items = parsedDatos[String(rowId)] ?? []
        if (items.length)
          return (
            <div className="text-sm text-indigo-700 leading-tight">
              {items.slice(0, 5).map((it: any, i: number) => (
                <div key={i}>
                  <span className="font-medium">{it.cant || it.qty || 1}×</span>{' '}
                  {it.name || it.nombre || it.producto || `Ítem ${i + 1}`}
                </div>
              ))}
              {items.length > 5 && (
                <div className="text-xs text-gray-500">
                  … y {items.length - 5} más
                </div>
              )}
            </div>
          )
      }

      if (col === 'foto' && typeof val === 'string' && val.trim())
        return <FotoCell tableName={tableName} childRelation={child} fileName={val} />

      if (val instanceof Date)
        return (
          <span className="flex items-center">
            <HiCalendar className="h-4 w-4 mr-1 text-blue-400" />
            {dateFmt.format(val)}
          </span>
        )

      if (typeof val === 'object')
        return (
          <span className="flex items-center">
            <HiDocumentText className="h-4 w-4 mr-1 text-green-500" />
            {JSON.stringify(val).slice(0, 40)}…
          </span>
        )

      if (typeof val === 'boolean')
        return val ? (
          <HiCheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <HiXCircle className="h-5 w-5 text-red-500" />
        )

      const s = String(val)
      const colLower = col.toLowerCase()
      if (LONG_TEXT_COLS.has(colLower)) {
        return (
          <span
            className="block whitespace-normal break-words text-gray-800"
            style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            title={s}
          >
            {s}
          </span>
        )
      }

      return (
        <span className="block whitespace-normal break-words truncate" title={s}>
          {s}
        </span>
      )
    },
    [tableName, child, resource, parsedDatos],
  )

  /* ╭───────────────────────── UI / Títulos ─────────────────────╮ */
  if (parentError) return <div className="p-4 text-red-500">Error al cargar datos</div>

  const humanize = (s: string) =>
    s.replace(/^Cfg/, '').replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')
     .replace(/\s+/g, ' ').trim().replace(/\b\w/g, (c) => c.toUpperCase())

  const parentRow = (rows as any[]).find(r => r.id === child?.parentId)
  const displayName = parentRow?.producto ?? parentRow?.nombre ?? parentRow?.name ?? `#${child?.parentId}`
  const baseLabel  = humanize(tableName)
  const childLabel = child ? humanize(relationLabels[child.childTable as keyof typeof relationLabels] ?? child.childTable) : ''
  const friendlyTitle = child ? `${childLabel} de ${displayName}` : baseLabel
  const eyebrow       = child ? baseLabel : 'Gestión'

  useEffect(() => {
    const prev = document.title
    document.title = `Admin · ${friendlyTitle}`
    return () => { document.title = prev }
  }, [friendlyTitle])

  const totalPages = Math.max(1, Math.ceil((total ?? 0) / pageSize))
  const toggleSort = (col: string) => {
    setPage(1)
    if (sortBy === col) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortBy(col); setSortDir('asc') }
  }

  /* ╭────────────────────────── RENDER ────────────────────────╮ */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <header className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[18px] uppercase tracking-wide text-indigo-600/80">
            {eyebrow}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {friendlyTitle}
          </h1>
        </div>
        {(loadingParent || validating) && (
          <span className="text-indigo-600 text-sm animate-pulse">cargando…</span>
        )}
      </header>

      {/* BREADCRUMB cuando hay hijo */}
      {child && (
        <div className="flex items-center space-x-4 mb-2">
          <button onClick={() => setChild(null)} className="text-indigo-600 hover:underline">
            ← Volver a {tableName}
          </button>
          <h2 className="text-xl font-semibold">
            {(relationLabels[child.childTable as keyof typeof relationLabels] ?? child.childTable)} de {displayName}
          </h2>
        </div>
      )}

      {/* ╭──────────────────── CARD PRINCIPAL ───────────────────╮ */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl ring-1 ring-indigo-200 p-4 md:p-6 space-y-4">
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Toolbar + Filtros (server-side) */}
        <Toolbar
          readOnly={readOnly}
          selectedCount={ui.selected.length}
          onNew={() => dispatch({ type: 'openCreate', open: true })}
          onDeleteSelected={() =>
            dispatch({
              type: 'confirmDelete',
              rows: (data as Row[]).filter((r: any) => ui.selected.includes(r.id)),
            })
          }
          onBulkEdit={() => dispatch({ type: 'openEdit', row: 'bulk' })}
          search={search}
          setSearch={(v) => { setPage(1); setSearch(v) }}
          pageSize={pageSize}
          setPageSize={(n) => { setPage(1); setPageSize(n) }}
        />

        <FiltersBar
          resource={resource}
          filters={uiFilters}
          setFilters={(f) => { setPage(1); setUIFilters(f) }}
        />

        {/* Tabla */}
        <div className="overflow-x-auto">
          {data.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Sin resultados</div>
          ) : (
            <table className="min-w-full divide-y divide-indigo-100" role="grid">
              <thead className="sticky top-0 bg-indigo-600">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={ui.selected.length === data.length && data.length > 0}
                      onChange={() =>
                        dispatch({
                          type: 'selectAll',
                          ids: (data as Row[]).map(r => r.id as IdLike),
                        })
                      }
                      aria-label="Seleccionar todos"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Acciones
                  </th>

                  {orderedColumns.flatMap(col => {
                    const th = (
                      <th
                        key={col}
                        onClick={() => toggleSort(col)}
                        aria-sort={sortBy === col ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer select-none"
                      >
                        {col}
                        {sortBy === col &&
                          (sortDir === 'asc' ? (
                            <HiSortAscending className="inline h-4 w-4 ml-1 text-white" />
                          ) : (
                            <HiSortDescending className="inline h-4 w-4 ml-1 text-white" />
                          ))}
                      </th>
                    )

                    if (tableName === 'Productos' && !child && col === 'precio') {
                      const relThs = relationsData.map(r => (
                        <th
                          key={'c-' + r.childTable}
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          {relationLabels[r.childTable as keyof typeof relationLabels] ?? r.childTable}
                        </th>
                      ))
                      return [th, ...relThs]
                    }
                    return th
                  })}

                  {tableName !== 'Productos' && !child && relationsData.map(r => (
                    <th
                      key={r.childTable}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      {relationLabels[r.childTable as keyof typeof relationLabels] ?? r.childTable}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-indigo-100">
                {(data as Row[]).map((row: any) => (
                  <tr key={row.id} className="odd:bg-indigo-50 even:bg-white hover:bg-indigo-100 transition">
                    {/* checkbox */}
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={ui.selected.includes(row.id)}
                        onChange={() => dispatch({ type: 'toggleSelect', id: row.id })}
                        aria-label={`Seleccionar fila ${row.id}`}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </td>

                    {/* acciones */}
                    <td className="px-4 py-2 align-middle">
                      <div className="inline-flex items-center gap-3">
                        <button
                          title="Ver"
                          onClick={() => dispatch({ type: 'openDetail', row })}
                          className="p-1 hover:text-indigo-600"
                          aria-label={`Ver fila ${row.id}`}
                        >
                          <HiEye className="h-5 w-5" />
                        </button>

                        <button
                          title="Editar"
                          onClick={() => dispatch({ type: 'openEdit', row })}
                          className="p-1 hover:text-indigo-600"
                          aria-label={`Editar fila ${row.id}`}
                        >
                          <HiPencil className="h-5 w-5" />
                        </button>

                        {!readOnly && (
                          <button
                            title="Eliminar"
                            onClick={() => dispatch({ type: 'confirmDelete', rows: [row] })}
                            className="p-1 hover:text-red-600"
                            aria-label={`Eliminar fila ${row.id}`}
                          >
                            <HiTrash className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>

                    {/* celdas data + relaciones */}
                    {orderedColumns.flatMap(col => {
                      const td = (
                        <td
                          key={col}
                          className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 border-b border-indigo-100 max-w-[220px]"
                        >
                          {renderCell(row[col], col, row.id)}
                        </td>
                      )

                      if (tableName === 'Productos' && !child && col === 'precio') {
                        const childrenTds = relationsData.map(rel => {
                          const meta = relMeta[rel.childTable]
                          const count = meta?.counts.get(String(row.id)) ?? 0
                          return (
                            <td
                              key={'c-' + rel.childTable}
                              className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 border-b border-indigo-100"
                            >
                              <button
                                className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs hover:bg-green-200 transition"
                                onClick={() => setChild({
                                  childTable: rel.childTable,
                                  foreignKey: meta.fk,
                                  parentId: row.id,
                                })}
                                aria-label={`Ver ${
                                  relationLabels[rel.childTable as keyof typeof relationLabels] ?? rel.childTable
                                } de ${row.id}`}
                              >
                                {relationLabels[rel.childTable as keyof typeof relationLabels] ?? rel.childTable} ({count})
                              </button>
                            </td>
                          )
                        })
                        return [td, ...childrenTds]
                      }

                      return td
                    })}

                    {/* relaciones al final para otras tablas */}
                    {tableName !== 'Productos' && !child && relationsData.map(rel => {
                      const meta = relMeta[rel.childTable]
                      const count = meta?.counts.get(String(row.id)) ?? 0
                      return (
                        <td
                          key={rel.childTable}
                          className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 border-b border-indigo-100"
                        >
                          <button
                            className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs hover:bg-green-200 transition"
                            onClick={() => setChild({
                              childTable: rel.childTable,
                              foreignKey: meta.fk,
                              parentId: row.id,
                            })}
                            aria-label={`Ver ${
                              relationLabels[rel.childTable as keyof typeof relationLabels] ?? rel.childTable
                            } de ${row.id}`}
                          >
                            {relationLabels[rel.childTable as keyof typeof relationLabels] ?? rel.childTable} ({count})
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* paginación (server) */}
        {data.length > 0 && (
          <footer className="flex items-center justify-between px-4 py-3 bg-indigo-50/70 rounded-xl ring-1 ring-indigo-100">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border border-indigo-300 rounded disabled:opacity-50 hover:bg-indigo-100 transition"
              aria-label="Página anterior"
            >
              <HiChevronLeft className="inline h-5 w-5 text-indigo-600" />
            </button>
            <span className="text-sm text-gray-700">
              Página {page} de {totalPages} — {total} registro(s)
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border border-indigo-300 rounded disabled:opacity-50 hover:bg-indigo-100 transition"
              aria-label="Página siguiente"
            >
              <HiChevronRight className="inline h-5 w-5 text-indigo-600" />
            </button>
          </footer>
        )}
      </div>

      {/* ╭──────────────────────── MODALES ───────────────────────╮ */}
      {ui.detailRow && (
        <Modal title="Detalle" onClose={() => dispatch({ type: 'openDetail', row: null })}>
          <DetailContent row={ui.detailRow as Row} />
        </Modal>
      )}

      {ui.createOpen && (
        <Modal title="Crear registro" onClose={() => dispatch({ type: 'openCreate', open: false })}>
          <Form
            initial={child ? { [child.foreignKey]: child.parentId } : {}}
            columns={getDefaultColumns(DEFAULT_COLUMNS as Record<string, readonly string[]>, resource) ?? orderedColumns}
            fixedFk={child?.foreignKey}
            onSubmit={handleCreate}
          />
        </Modal>
      )}

      {ui.editRow && ui.editRow !== 'bulk' && (
        <Modal title={`Editar registro ${(ui.editRow as Row).id}`} onClose={() => dispatch({ type: 'openEdit', row: null })}>
          <Form
            initial={ui.editRow as Row}
            columns={getDefaultColumns(DEFAULT_COLUMNS as Record<string, readonly string[]>, resource) ?? orderedColumns}
            fixedFk={child?.foreignKey}
            onSubmit={d => handleUpdate((ui.editRow as Row).id as IdLike, d)}
          />
        </Modal>
      )}

      {ui.editRow === 'bulk' && (
        <Modal title={`Edición masiva (${ui.selected.length})`} onClose={() => dispatch({ type: 'openEdit', row: null })}>
          <BulkForm onSubmit={handleBulk} />
        </Modal>
      )}

      {ui.confirmRows && (
        <ConfirmModal
          items={ui.confirmRows}
          onCancel={() => dispatch({ type: 'confirmDelete', rows: null })}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  )
}
