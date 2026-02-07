/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps */
'use client'

/* ────────────────────────────── 1. IMPORTS ─────────────────────────────── */
import React, { useMemo, useCallback, useReducer, useEffect } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
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
import { BulkForm } from './components/Form'
import { SmartForm } from './components/SmartForm'
import { Toolbar } from './components/Toolbar'
import { FiltersBar, FiltersSummary } from './components/FiltersBar'
import AdminDropzone from './components/AdminDropzone'
import AuditLogViewer from './components/AuditLogViewer'

import {
  DEFAULT_COLUMNS, HIDDEN_COLUMNS, READ_ONLY_RESOURCES, relationLabels,
} from './config'

/* ──────────────────────── COMPONENTES UI EDITABLES ──────────────────────── */

const EditableNumber = ({
  value,
  id,
  field,
  onUpdate,
  min = 0,
  warningThreshold,
}: {
  value: number
  id: number | string
  field: string
  onUpdate: (id: string | number, data: Record<string, any>) => void
  min?: number
  warningThreshold?: number
}) => {
  const [local, setLocal] = React.useState<string>(String(value ?? 0))
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => setLocal(String(value ?? 0)), [value])

  const save = async () => {
    const num = parseFloat(local)
    if (isNaN(num) || num === value) return
    
    setLoading(true)
    try {
      // Optimizamos la UI asumiendo éxito (optimistic update local ya hecho)
      onUpdate(id, { [field]: num })
    } catch (e) {
      setLocal(String(value)) // Revertir en error
      toast.error('Error al actualizar')
    } finally {
      setLoading(false)
    }
  }

  // Clases semánticas para stock
  let statusClass = 'text-gray-900 bg-white'
  if (field === 'stock' && warningThreshold !== undefined) {
    const n = parseFloat(local)
    if (n <= warningThreshold) statusClass = 'text-red-700 font-bold bg-red-50 border-red-200'
    else if (n <= warningThreshold * 2) statusClass = 'text-yellow-700 font-medium bg-yellow-50 border-yellow-200'
    else statusClass = 'text-green-700 bg-green-50 border-green-200'
  }

  return (
    <div className="relative group">
      <input
        type="number"
        value={local}
        onChange={e => setLocal(e.target.value)}
        onBlur={save}
        onKeyDown={e => e.key === 'Enter' && save()}
        min={min}
        className={`
          w-24 px-2 py-1 text-right border rounded transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none
          ${statusClass} ${loading ? 'opacity-50 cursor-wait' : ''}
        `}
        disabled={loading}
      />
      {loading && <div className="absolute right-1 top-1/2 -translate-y-1/2 animate-spin h-3 w-3 border-2 border-indigo-600 rounded-full border-t-transparent"></div>}
    </div>
  )
}

const EditableToggle = ({
  value,
  id,
  field,
  onUpdate,
}: {
  value: boolean
  id: number | string
  field: string
  onUpdate: (id: string | number, data: Record<string, any>) => void
}) => {
  const [loading, setLoading] = React.useState(false)

  const toggle = async () => {
    if (loading) return
    setLoading(true)
    try {
      await onUpdate(id, { [field]: !value })
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        ${value ? 'bg-green-500' : 'bg-gray-200'}
        ${loading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
      `}
      title={value ? 'Activo' : 'Inactivo'}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${value ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  )
}

/* ────────────────────────────────────────────────────────────────────────── */

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

// columnas largas → clamp
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
type UIFilters = Record<string, string | number | boolean | undefined | null>
const compactFilters = (o: UIFilters): Record<string, string | number | boolean> =>
  Object.fromEntries(
    Object.entries(o).filter(([, v]) => v !== '' && v !== undefined && v !== null)
  ) as Record<string, string | number | boolean>

/* ╭────────────────────── 5. MAIN COMPONENT ────────────────────╮ */
export default function ResourceDetailClient({ tableName }: { tableName: string }) {
  const readOnly = READ_ONLY_RESOURCES.includes(tableName)

  // Para “friendlyTitle” en vista hija necesitamos el parent
  const { data: parentResp, isError: parentError, isFetching: loadingParent } = useQuery({
    queryKey: ['resource', tableName, 'all-for-parent'],
    queryFn: () => fetcher(`/api/admin/resources/${tableName}?page=1&pageSize=50`),
    staleTime: 60000,
  })
  const parentRows: any[] = Array.isArray(parentResp) ? parentResp : (parentResp?.rows ?? [])

  // Relaciones (solo nombres)
  const relations = useRelations(tableName)
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

  const compact = (o: Record<string, unknown>) =>
    Object.fromEntries(
      Object.entries(o ?? {}).filter(([, v]) => v !== '' && v !== undefined && v !== null)
  );

  const shallowEqual = (a: Record<string, unknown>, b: Record<string, unknown>) => {
    const A = compact(a);
    const B = compact(b);
    const aKeys = Object.keys(A);
    const bKeys = Object.keys(B);
    if (aKeys.length !== bKeys.length) return false;
    for (const k of aKeys) if (A[k] !== B[k]) return false;
    return true;
  };

  useEffect(() => { dispatch({ type: 'resetSelect' }) }, [tableName, child])

  const resource = child ? child.childTable : tableName

  /* ──────────────── Tabla server-side ─────────────── */
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [sortBy, setSortBy] = React.useState('id')
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc')
  const [search, setSearch] = React.useState('')
  const [uiFilters, setUIFilters] = React.useState<UIFilters>({})
  const [showFilters, setShowFilters] = React.useState(false)

  React.useEffect(() => {
    setPage(1)
  }, [resource])

  const baseClean = useMemo(() => compactFilters(uiFilters), [uiFilters])
  const effectiveFilters = useMemo(
    () => (child ? { ...baseClean, [child.foreignKey]: child.parentId } : baseClean),
    [baseClean, child]
  )

  const setFiltersSmart = React.useCallback(
    (next: UIFilters) => {
      setUIFilters(prev => {
        const prevClean = compactFilters(prev)
        const nextClean = compactFilters(next)
        if (!shallowEqual(prevClean, nextClean)) setPage(1)
        return next
      })
    },
    [] // shallowEqual y compactFilters son estables/puros
  )

  const { rows: data, total, validating } = useServerTable<Row>(resource, {
    page, pageSize, sortBy, sortDir,
    search,
    qFields: resource === 'Productos' ? ['producto','descripcion'] : undefined,
    filters: effectiveFilters, // tu objeto limpio
  })

  /* ──────────────── columnas visibles ─────────────── */
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

  /* ╭─────────────────────────── CRUD ─────────────────────────╮ */
  const queryClient = useQueryClient()

  const invalidateAll = useCallback(() => {
    // Invalida la query principal del recurso
    queryClient.invalidateQueries({ queryKey: ['resource', resource] })
  }, [queryClient, resource])

  const createMutation = useMutation({
    mutationFn: async (raw: Record<string, Json>) => {
      const clean = (() => {
        const c = sanitize(raw)
        delete c.id
        return c
      })()
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
      return out
    },
    onSuccess: () => {
      toast.success('Registro creado')
      dispatch({ type: 'openCreate', open: false })
      invalidateAll()
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, body }: { id: IdLike; body: Record<string, Json> }) => {
      const url = `/api/admin/resources/${resource}/${id}`
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
      return out
    },
    onSuccess: (_, vars) => {
      // Si estamos editando un registro único, cerramos el modal y notificamos
      // Para bulk updates, manejaremos la UI en handleBulk
      // Usamos String() para evitar problemas de tipos (number vs string)
      if (ui.editRow && ui.editRow !== 'bulk' && String((ui.editRow as Row).id) === String(vars.id)) {
        toast.success(`Registro actualizado`)
        dispatch({ type: 'openEdit', row: null })
        invalidateAll()
      }
    },
    onError: (e: Error) => {
      // Solo mostramos error aquí si es edición simple. Bulk maneja sus errores.
      if (ui.editRow && ui.editRow !== 'bulk') toast.error(e.message)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async ({ id, forced }: { id: IdLike; forced?: string }) => {
      const tgt = forced || resource
      const res = await fetch(`/api/admin/resources/${tgt}/${id}`, {
        method: 'DELETE',
        headers: csrfHdr(),
      })
      const out = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(out.error || 'Error')
      return out
    },
  })

  // Handlers para UI
  const handleCreate = (raw: Record<string, Json>) => createMutation.mutate(raw)
  
  const handleUpdate = (id: IdLike, raw: Record<string, Json>) => 
    updateMutation.mutate({ id, body: raw })

  const handleBulk = useCallback(
    async (field: string, val: Json) => {
      if (!field) { toast.error('Definí el campo a modificar'); return }
      try {
        // Usamos mutateAsync para esperar resultados
        const results = await Promise.allSettled(
          ui.selected.map(id => updateMutation.mutateAsync({ id, body: { [field]: val } }))
        )
        const failed = results.filter(r => r.status === 'rejected')
        if (failed.length) toast.error(`Fallaron ${failed.length} de ${results.length}`)
        else toast.success(`Actualizados ${ui.selected.length} registro(s)`)
        
        dispatch({ type: 'openEdit', row: null })
        dispatch({ type: 'resetSelect' })
        invalidateAll()
      } catch (e: any) {
        toast.error(e.message)
      }
    },
    [ui.selected, updateMutation, invalidateAll],
  )

  const confirmDelete = useCallback(async () => {
    if (!ui.confirmRows) return
    try {
      const results = await Promise.allSettled(
        ui.confirmRows.map(r =>
          deleteMutation.mutateAsync({
            id: r.id as IdLike,
            forced: child ? child.childTable : undefined
          })
        )
      )
      const failed = results.filter(r => r.status === 'rejected')
      if (failed.length) toast.error(`Fallaron ${failed.length} eliminaciones`)
      else toast.success('Eliminados correctamente')
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      dispatch({ type: 'confirmDelete', rows: null })
      dispatch({ type: 'resetSelect' })
      invalidateAll()
    }
  }, [ui.confirmRows, deleteMutation, child, invalidateAll])

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

      if (col === 'foto') {
        return (
          <div onClick={e => e.stopPropagation()}>
            <AdminDropzone 
              resourceName={resource}
              resourceId={rowId}
              onSuccess={() => invalidateAll()}
            >
              {typeof val === 'string' && val.trim() ? (
                <FotoCell tableName={tableName} childRelation={child} fileName={val} />
              ) : null}
            </AdminDropzone>
          </div>
        )
      }

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
    (s || '').replace(/^Cfg/, '').replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')
     .replace(/\s+/g, ' ').trim().replace(/\b\w/g, (c) => c.toUpperCase())

  const getRecordName = (r: any) => {
    if (!r) return ''
    const candidates = ['producto', 'nombre', 'name', 'titulo', 'marca', 'rubro', 'descripcion', 'email']
    for (const k of candidates) {
      const val = r[k]
      if (val && typeof val === 'string') return val
    }
    return `#${r.id}`
  }

  const parentRow = (parentRows as any[]).find(r => r.id === child?.parentId)
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

  const setSearchSafe = React.useCallback((next: string) => {
  setSearch(prev => {
    if (prev === next) return prev;  // no cambió => no resetear page
    setPage(1);
    return next;
  });
}, []);

  const setPageSizeSafe = React.useCallback((next: number) => {
    setPageSize(prev => {
      if (prev === next) return prev;
      setPage(1);
      return next;
    });
  }, []);

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
          setSearch={setSearchSafe}
          pageSize={pageSize}
          setPageSize={setPageSizeSafe}
          onToggleFilters={() => setShowFilters(true)}
          activeFiltersCount={Object.keys(baseClean).length}
        />

        <FiltersSummary filters={uiFilters} setFilters={setFiltersSmart} />

        {showFilters && (
          <Modal title="Filtros" onClose={() => setShowFilters(false)}>
            <FiltersBar
              resource={resource}
              filters={uiFilters}
              setFilters={setFiltersSmart}
              variant="modal"
              onClose={() => setShowFilters(false)}
            />
          </Modal>
        )}

        {/* Tabla */}
        <div className="overflow-x-auto">
          {data.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Sin resultados</div>
          ) : resource === 'AuditLog' ? (
            <AuditLogViewer data={data as any[]} />
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
                      const relThs = relations.map(r => (
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

                  {tableName !== 'Productos' && !child && relations.map(r => (
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
                        const childrenTds = relations.map(rel => {
                          const relLabel = relationLabels[rel.childTable as keyof typeof relationLabels] ?? rel.childTable
                          const countKeyMap: Record<string, string> = {
                            ProductoFotos: 'fotos',
                            ProductoVersiones: 'versiones',
                            ProductoEspecificaciones: 'especificaciones'
                          }
                          const countVal = (row as any)._count?.[countKeyMap[rel.childTable]]

                          return (
                            <td
                              key={'c-' + rel.childTable}
                              className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 border-b border-indigo-100"
                            >
                              <button
                                className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs hover:bg-green-200 transition flex items-center gap-1"
                                onClick={() => setChild({
                                  childTable: rel.childTable,
                                  foreignKey: guessFK(rel.childTable, tableName),
                                  parentId: row.id,
                                })}
                                aria-label={`Ver ${relLabel} de ${row.id}`}
                              >
                                {relLabel}
                                {countVal !== undefined && (
                                  <span className="bg-white/40 px-1.5 rounded-full text-[10px] font-bold min-w-[1.2em] text-center">
                                    {countVal}
                                  </span>
                                )}
                              </button>
                            </td>
                          )
                        })
                        return [td, ...childrenTds]
                      }

                      return td
                    })}

                    {/* relaciones al final para otras tablas */}
                    {tableName !== 'Productos' && !child && relations.map(rel => (
                      <td
                        key={rel.childTable}
                        className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 border-b border-indigo-100"
                      >
                        <button
                          className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs hover:bg-green-200 transition"
                          onClick={() => setChild({
                            childTable: rel.childTable,
                            foreignKey: guessFK(rel.childTable, tableName),
                            parentId: row.id,
                          })}
                          aria-label={`Ver ${
                            relationLabels[rel.childTable as keyof typeof relationLabels] ?? rel.childTable
                          } de ${row.id}`}
                        >
                          {relationLabels[rel.childTable as keyof typeof relationLabels] ?? rel.childTable}
                        </button>
                      </td>
                    ))}
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
          <SmartForm
            resource={resource}
            initial={child ? { [child.foreignKey]: child.parentId } : {}}
            columns={getDefaultColumns(DEFAULT_COLUMNS as Record<string, readonly string[]>, resource) ?? orderedColumns}
            fixedFk={child?.foreignKey}
            onSubmit={handleCreate}
            isSaving={createMutation.isPending}
          />
        </Modal>
      )}

      {ui.editRow && ui.editRow !== 'bulk' && (
        <Modal title={`Editar: ${getRecordName(ui.editRow)}`} onClose={() => dispatch({ type: 'openEdit', row: null })}>
          <SmartForm
            resource={resource}
            initial={ui.editRow as Row}
            columns={getDefaultColumns(DEFAULT_COLUMNS as Record<string, readonly string[]>, resource) ?? orderedColumns}
            fixedFk={child?.foreignKey}
            onSubmit={d => handleUpdate((ui.editRow as Row).id as IdLike, d)}
            isSaving={updateMutation.isPending}
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
