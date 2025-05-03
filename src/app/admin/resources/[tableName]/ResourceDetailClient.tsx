/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
  'use client'

  import React, {
    useState, useEffect, useMemo, useCallback, memo,
  } from 'react'
  import useSWR, { mutate } from 'swr'
  import {
    HiChevronLeft, HiChevronRight,
    HiCheckCircle, HiXCircle, HiCalendar, HiDocumentText,
    HiPencil, HiTrash, HiEye,
    HiSortAscending, HiSortDescending,
    HiPlus, HiAdjustments,
  } from 'react-icons/hi'
  import { ToastContainer, toast } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'
  
  // ---------------------------------------------------------------------------
  // CONFIGURACIÓN
  // ---------------------------------------------------------------------------
  
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  
  const READ_ONLY_RESOURCES = ['Pedidos'] // 🔸 Solo ver / editar
  
  const relationMap: Record<string, string[]> = {
    Productos: ['ProductoFotos', 'ProductoVersiones', 'ProductoEspecificaciones'],
  }
  const relationLabels: Record<string, string> = {
    ProductoFotos: 'Fotos',
    ProductoVersiones: 'Versiones',
    ProductoEspecificaciones: 'Especificaciones',
  }
  
  /* ---------------------------------------------------------------------------
   COLUMNAS QUE NO QUEREMOS MOSTRAR EN TABLAS (mismo que tenías)
  --------------------------------------------------------------------------- */
  const HIDDEN_COLUMNS: Record<string, string[]> = {
    Productos:                ['marca_id', 'rubro_id', 'moneda_id'],
    ProductoFotos:            ['producto_id'],
    ProductoVersiones:        ['producto_id'],
    ProductoEspecificaciones: ['producto_id'],
  }

  /* ---------------------------------------------------------------------------
    MAPA COMPLETO DE COLUMNAS POR TABLA  (basado en schema.prisma)
  --------------------------------------------------------------------------- */
  const DEFAULT_COLUMNS: Record<string, string[]> = {
    CfgMarcas: [
      'id', 'marca', 'keywords', 'foto', 'activo',
    ],
    CfgRubros: [
      'id', 'rubro', 'condiciones', 'keywords', 'foto', 'activo',
    ],
    CfgFormasPagos: [
      'id', 'forma_pago', 'descripcion', 'permite_cuotas', 'activo',
    ],
    CfgMonedas: [
      'id', 'moneda', 'moneda_des', 'activo',
    ],
    CfgSlider: [
      'id', 'titulo', 'thumbs', 'foto', 'orden', 'activo',
    ],
    Productos: [
      'id', 'marca_id', 'rubro_id', 'moneda_id',
      'producto', 'descripcion', 'foto', 'precio',
      'stock', 'destacado', 'activo', 'visitas',
    ],
    ProductoFotos: [
      'id', 'producto_id', 'epigrafe', 'foto', 'orden', 'activo',
    ],
    ProductoVersiones: [
      'id', 'producto_id', 'version', 'detalle', 'orden', 'activo',
    ],
    ProductoEspecificaciones: [
      'id', 'producto_id', 'categoria', 'especificaciones', 'orden', 'activo',
    ],
    Pedidos: [
      'id', 'datos', 'total', 'estado', 'metodo_pago',
      'comprador_nombre', 'comprador_email', 'comprador_telefono',
      'direccion_envio',
      'mp_payment_id', 'transferencia_ref',
      'tarjeta_last4', 'tarjeta_payment_method',
      'mp_error_code', 'mp_error_message', 'mp_response',
      'createdAt', 'updatedAt',
    ],
  }
  
  const fkConfig: Record<
    string,
    { resource: string; labelKey: string; fieldLabel: string }
  > = {
    marca_id: { resource: 'CfgMarcas', labelKey: 'marca', fieldLabel: 'Marca' },
    rubro_id: { resource: 'CfgRubros', labelKey: 'rubro', fieldLabel: 'Rubro' },
    forma_pago_id: {
      resource: 'CfgFormasPagos',
      labelKey: 'descripcion',
      fieldLabel: 'Forma de Pago',
    },
    moneda_id: { resource: 'CfgMonedas', labelKey: 'moneda_des', fieldLabel: 'Moneda' },
    producto_id: {
      resource: 'Productos',
      labelKey: 'producto',
      fieldLabel: 'Producto',
    },
  }
  
  // ---------------------------------------------------------------------------
  // useTable – filtro, orden, paginación
  // ---------------------------------------------------------------------------
  function useTable(data: any[], opts?: { initialSort?: [string, 'asc' | 'desc'] }) {
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState<string>(opts?.initialSort?.[0] || '')
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>(opts?.initialSort?.[1] || 'asc')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
  
    const filtered = useMemo(() => {
      if (!search) return data
      const term = search.toLowerCase()
      return data.filter(row =>
        Object.values(row).some(v => String(v).toLowerCase().includes(term)),
      )
    }, [data, search])
  
    const sorted = useMemo(() => {
      if (!sortBy) return filtered
      return [...filtered].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortDir === 'asc' ? -1 : 1
        if (a[sortBy] > b[sortBy]) return sortDir === 'asc' ? 1 : -1
        return 0
      })
    }, [filtered, sortBy, sortDir])
  
    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
    const pageData = sorted.slice((page - 1) * pageSize, page * pageSize)
  
    const toggleSort = useCallback(
      (col: string) => {
        setPage(1)
        if (sortBy === col) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
        else {
          setSortBy(col)
          setSortDir('asc')
        }
      },
      [sortBy],
    )
  
    return {
      search,
      setSearch,
      sortBy,
      sortDir,
      toggleSort,
      page,
      setPage,
      totalPages,
      pageSize,
      setPageSize,
      pageData,
    }
  }
  
  // ---------------------------------------------------------------------------
  // Utilidades
  // ---------------------------------------------------------------------------
  function buildFormData(data: Record<string, any>): FormData {
    const fd = new FormData()
    Object.entries(data).forEach(([k, v]) => {
      if (v instanceof File) fd.append(k, v)
      else fd.append(k, typeof v === 'object' ? JSON.stringify(v) : v)
    })
    return fd
  }
  
  // ---------------------------------------------------------------------------
  // Hook auxiliar — carga relaciones SIN violar rules‑of‑hooks
  // ---------------------------------------------------------------------------
  function useRelations(relations: string[]) {
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    return relations.map(childTable => {
      const { data = [] } = useSWR<any[]>(`/api/admin/resources/${childTable}`, fetcher)
      return { childTable, data }
    })
  }

  // -----------------------------------------------------------------------------
  // helpers locales
  // -----------------------------------------------------------------------------
  type JsonValue = string | number | boolean | null | Blob | File

  /** Convierte '1' → 1, 'true' → true, etc.  */
  const normalizeValue = (v: JsonValue): JsonValue => {
    if (typeof v !== 'string') return v
    if (/^\d+$/.test(v))       return Number(v)
    if (v === 'true')          return true
    if (v === 'false')         return false
    return v
  }

  /** Normaliza números/booleanos y quita claves vacías/undefined */
  function sanitize<T extends Record<string, JsonValue>>(obj: T) {
    const out: Record<string, JsonValue> = {}
    Object.entries(obj).forEach(([k, v]) => {
      if (v === undefined) return
      out[k] = normalizeValue(v)
    })
    return out
  }
  
  // ---------------------------------------------------------------------------
  // Componente principal
  // ---------------------------------------------------------------------------
  export default function ResourceDetailClient({ tableName }: { tableName: string }) {
     /* ------------- hooks principales ---------------- */
    const readOnly = READ_ONLY_RESOURCES.includes(tableName)
    const { data: rows = [], error: parentError } = useSWR<any[]>(
      `/api/admin/resources/${tableName}`, fetcher)

    /* Early‑return por error/carga ANTES de cualquier useMemo extra */
    if (parentError) return <div className="p-4 text-red-500">Error al cargar datos</div>
    if (!rows)       return <div className="p-4 text-gray-600">Cargando…</div>
  
    // -------------------------------- relaciones hijo
    const [childRelation, setChildRelation] = useState<{
      childTable: string
      foreignKey: string
      parentId: any
    } | null>(null)
  
    const allRelations = relationMap[tableName] || []
    const relationDataArray = useRelations(allRelations) // ✅ sin hook en loops
  
    const rawChild = useMemo(() => {
      if (!childRelation) return []
      const relObj = relationDataArray.find(r => r.childTable === childRelation.childTable)
      return relObj ? relObj.data : []
    }, [childRelation, relationDataArray])
  
    const childData = useMemo(() => {
      if (!childRelation) return []
      return rawChild.filter(r => r[childRelation.foreignKey] === childRelation.parentId)
    }, [rawChild, childRelation])
  
    // -------------------------------- tabla activa
    const tableData = childRelation ? childData : rows
  
    /* ---------- columnas base detectadas ---------- */
    const rawColumns = useMemo<string[]>(
      () => Object.keys(tableData[0] || {}),
      [tableData],
    )

    /* ---------- columnas visibles ---------- */
    const visibleCols = useMemo<string[]>(() => {
      const hidden = HIDDEN_COLUMNS[tableName] ?? []

      if (rawColumns.length > 0) {
        // con filas: inferimos de los datos
        return rawColumns.filter(c => !hidden.includes(c))
      }

      // tabla vacía: usamos DEFAULT_COLUMNS
      const base = DEFAULT_COLUMNS[tableName] ?? ['id']
      const cols = base.filter(c => !hidden.includes(c))

      // Si es una vista hija vacía asegúrate de incluir la FK
      if (childRelation && !cols.includes(childRelation.foreignKey)) {
        return ['id', childRelation.foreignKey, ...cols.filter(c => c !== 'id')]
      }

      return cols
    }, [rawColumns, tableName, childRelation])

    /* ---------- orden especial para Productos ---------- */
    const columns = useMemo<string[]>(() => {
      if (tableName === 'Productos' && !childRelation) {
        const first = ['id', 'producto', 'precio']
        const rest  = visibleCols.filter(c => !first.includes(c))
        return [...first, ...rest]
      }
      return visibleCols
    }, [visibleCols, tableName, childRelation])
  
    // -------------------------------- useTable
    const {
      search,
      setSearch,
      sortBy,
      sortDir,
      toggleSort,
      page,
      setPage,
      totalPages,
      pageSize,
      setPageSize,
      pageData,
    } = useTable(tableData, { initialSort: ['id', 'asc'] })
  
    // -------------------------------- recargas SWR
    const refreshParent = useCallback(
      () => mutate(`/api/admin/resources/${tableName}`),
      [tableName],
    )
    const refreshChild = useCallback(() => {
      if (!childRelation) return
      mutate(`/api/admin/resources/${childRelation.childTable}`)
    }, [childRelation])
  
    // -------------------------------- selección y modales
    const [selected, setSelected] = useState<any[]>([])
    const [confirmItems, setConfirmItems] = useState<any[] | null>(null)
    const [detailRow, setDetailRow] = useState<any | null>(null)
    const [editRow, setEditRow] = useState<any | 'bulk' | null>(null)
    const [createOpen, setCreateOpen] = useState(false)
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  
    useEffect(() => setSelected([]), [childRelation, tableName])
  
    const toggleSelect = useCallback(
      (id: any) => {
        setSelected(s => (s.includes(id) ? s.filter(x => x !== id) : [...s, id]))
      },
      [],
    )
    const toggleSelectAll = useCallback(() => {
      const allIds = tableData.map(r => r.id)
      setSelected(s => (s.length === allIds.length ? [] : allIds))
    }, [tableData])

    /** Decide a qué recurso golpear según contexto */
    const pickResource = (
      tableName: string,
      childRelation: { childTable: string } | null
    ) => childRelation?.childTable ?? tableName

    // -----------------------------------------------------------------------------
    // CREATE
    // -----------------------------------------------------------------------------
    const handleCreate = useCallback(
      async (rawData: Record<string, JsonValue>) => {
        const resource  = pickResource(tableName, childRelation)
        const endpoint  = `/api/admin/resources/${resource}`

        /** 🚩  Nunca enviamos id: se autoincrementa en la DB  */
        const { id: _discard, ...clean } = sanitize(rawData)
        const hasFile = clean.foto instanceof File

        const init: RequestInit = hasFile
          ? { method: 'POST', body: buildFormData(clean) }
          : {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(clean),
            }

        const res     = await fetch(endpoint, init)
        const payload = await res.json()

        if (!res.ok) {
          toast.error(payload.error || 'Error al crear')
          return
        }

        toast.success('Registro creado')
        setCreateOpen(false)

        // ⚡️ refrescamos la lista correcta
        childRelation ? refreshChild() : refreshParent()
      },
      [tableName, childRelation, refreshChild, refreshParent]
    )

    // -----------------------------------------------------------------------------
    // UPDATE
    // -----------------------------------------------------------------------------
    const handleUpdate = useCallback(
      async (id: number | string, raw: Record<string, JsonValue>) => {
        const resource = pickResource(tableName, childRelation)
        const url      = `/api/admin/resources/${resource}/${id}`

        // Clonamos, limpiamos keys no deseadas y normalizamos tipos
        const data        = sanitize({ ...raw })
        delete data.producto                  // nunca enviamos nombre “virtual”
        const hasNewFile  = data.foto instanceof File

        const init: RequestInit = hasNewFile
          ? { method: 'PUT', body: buildFormData(data) }
          : {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            }

        const res     = await fetch(url, init)
        const payload = await res.json()

        if (!res.ok) {
          toast.error(payload.error || `Error al actualizar ${resource}`)
          return
        }

        toast.success(`Registro ${id} actualizado`)
        setEditRow(null)

        // ⚡️ refrescamos ambas vistas si corresponde
        mutate(`/api/admin/resources/${resource}`)
        if (childRelation) {
          refreshParent()
        }
      },
      [tableName, childRelation, refreshParent]
    )

    // -----------------------------------------------------------------------------
    // DELETE
    // -----------------------------------------------------------------------------
    const handleDelete = useCallback(
      async (id: number | string, forcedResource?: string) => {
        /** Si el botón llega con resource explícito lo respetamos;
         *  si no, usamos el contexto actual                     */
        const target = forcedResource ?? pickResource(tableName, childRelation)
        const url    = `/api/admin/resources/${target}/${id}`

        const res     = await fetch(url, { method: 'DELETE' })
        const payload = await res.json()

        if (!res.ok) {
          toast.error(payload.error || `Error al eliminar en ${target}`)
          return
        }

        toast.success(`Registro ${id} eliminado`)
        setConfirmItems(null)
        setSelected([])

        // ⚡️ refrescamos tabla afectada y, si era hija, también padre
        mutate(`/api/admin/resources/${target}`)
        if (forcedResource || childRelation) refreshParent()
      },
      [tableName, childRelation, refreshParent, normalizeValue]
    )
  
    // -----------------------------------------------------------------------------
    // BULK UPDATE
    // -----------------------------------------------------------------------------
    const handleBulkUpdate = useCallback(
      async (field: string, rawValue: JsonValue) => {
        if (!field || selected.length === 0) return

        const resource   = pickResource(tableName, childRelation)
        const value      = normalizeValue(rawValue)    // 1 → number, 'true' → boolean
        const body       = JSON.stringify({ [field]: value })

        // Lanzamos todas las peticiones en paralelo
        await Promise.all(
          selected.map(id =>
            fetch(`/api/admin/resources/${resource}/${id}`, {
              method : 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body,
            }),
          )
        )

        toast.success(`Actualizados ${selected.length} registro(s)`)
        setEditRow(null)
        setSelected([])

        // ⚡️ refrescamos el recurso afectado y, si es hijo, también el padre
        if (childRelation) {
          refreshParent()
        }
      },
      [selected, tableName, childRelation, refreshParent, normalizeValue]
    )
  
    const selectedRows = useMemo(
      () => tableData.filter(r => selected.includes(r.id)),
      [selected, tableData],
    )
  
    // -------------------------------------------------------------------------
    // Render de celdas (Pedidos: datos mejorados)
    // -------------------------------------------------------------------------
    const renderCell = useCallback(
      (val: any, col: string) => {
        if (val == null) return <span className="text-gray-400">null</span>
  
        // Pedidos – columna DATOS
        if (tableName === 'Pedidos' && col.toLowerCase() === 'datos') {
          let items: any[] = []
  
          if (typeof val === 'string') {
            try {
              items = JSON.parse(val)
            } catch {
              items = []
            }
          } else if (Array.isArray(val)) {
            items = val
          }
  
          if (items.length) {
            return (
              <div className="text-sm text-indigo-700 leading-tight space-y-0.5">
                {items.slice(0, 5).map((it, idx) => {
                  const nombre = it.name || it.nombre || it.producto || `Ítem ${idx + 1}`
                  const cant = it.cantidad ?? it.qty ?? it.quantity ?? it.cant ?? 1
                  return (
                    <div key={idx}>
                      <span className="font-medium">{cant}×</span> {nombre}
                    </div>
                  )
                })}
                {items.length > 5 && (
                  <div className="text-xs text-gray-500">… y {items.length - 5} más</div>
                )}
              </div>
            )
          }
        }
  
        if (val instanceof Date) {
          return (
            <div className="flex items-center text-sm text-gray-700">
              <HiCalendar className="h-4 w-4 text-blue-400 mr-1" />
              {val.toLocaleDateString()}
            </div>
          )
        }
  
        if (typeof val === 'object') {
          const json = JSON.stringify(val)
          return (
            <div className="flex items-center text-sm text-gray-700">
              <HiDocumentText className="h-4 w-4 text-green-400 mr-1" />
              {json.length > 40 ? json.slice(0, 40) + '…' : json}
            </div>
          )
        }
  
        if (typeof val === 'boolean') {
          return val ? (
            <HiCheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <HiXCircle className="h-5 w-5 text-red-500" />
          )
        }
  
        const str = String(val)
        return (
          <span className="text-sm text-gray-700">
            {str.length > 50 ? str.slice(0, 50) + '…' : str}
          </span>
        )
      },
      [tableName],
    )
  
    // -------------------------------------------------------------------------
    // Estados de carga / error
    // -------------------------------------------------------------------------
    if (parentError) return <div className="p-4 text-red-500">Error al cargar datos</div>
    if (!rows) return <div className="p-4 text-gray-600">Cargando...</div>
  
    // nombre padre (vista hijo)
    const parentRow = rows.find(r => r.id === childRelation?.parentId)
    const displayName =
      parentRow?.nombre || parentRow?.name || `${tableName} #${childRelation?.parentId}`
  
    const nextId = useMemo(() => {
      const source = childRelation ? rawChild : rows
      if (!source.length) return 1
      const maxId = Math.max(...source.map(r => typeof r.id === 'number' ? r.id : 0))
      return maxId + 1
    }, [rows])

  // -------------------------------------------------------------------------
  // UI
  // -------------------------------------------------------------------------
  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Gestión de {tableName}</h1>
        <p className="text-sm text-gray-600">Aquí puedes crear, editar y eliminar registros.</p>
      </header>

      {childRelation && (
        <div className="mb-4 flex items-center space-x-4">
          <button
            onClick={() => setChildRelation(null)}
            className="text-indigo-600 hover:underline focus:outline-none"
          >
            ← Volver a {tableName}
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {(relationLabels[childRelation.childTable] || childRelation.childTable)} de {displayName}
          </h2>
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-4 space-y-4">
        <ToastContainer position="top-right" autoClose={3000} />

        {/* -------------------------------------------------------------------
           Toolbar
        ------------------------------------------------------------------- */}
        <div className="flex flex-wrap items-center justify-between mb-4 space-y-2">
          <div className="flex space-x-2">
            {!readOnly && (
              <button
                onClick={() => setCreateOpen(true)}
                className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
              >
                <HiPlus className="mr-2" /> Nuevo
              </button>
            )}

            {/* Eliminar y bulk editar deshabilitados en readOnly */}
            {!readOnly && selected.length > 0 && (
              <>
                <button
                  onClick={() => setConfirmItems(selectedRows)}
                  className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                >
                  <HiTrash className="mr-2" /> Eliminar ({selected.length})
                </button>
                <button
                  onClick={() => setEditRow('bulk')}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                >
                  <HiAdjustments className="mr-2" /> Editar ({selected.length})
                </button>
              </>
            )}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <select
              value={pageSize}
              onChange={e => setPageSize(+e.target.value)}
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {[5, 10, 25, 50].map(n => (
                <option key={n} value={n}>{n} filas</option>
              ))}
            </select>
          </div>
        </div>


        {/* -------------------------------------------------------------------
           Tabla
        ------------------------------------------------------------------- */}
        <div className="overflow-x-auto">
          {pageData.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Sin resultados</div>
          ) : (
            <table className="min-w-full divide-y divide-indigo-100">
              <thead className="sticky top-0 bg-indigo-600">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.length === pageData.length && pageData.length > 0}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      aria-label="Seleccionar todos"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Acciones</th>

                  {/* columnas + inserción de relaciones justo después de PRECIO */}
                  {columns.flatMap((col: string) => {
                    const th = (
                      <th
                        key={col}
                        onClick={() => toggleSort(col)}
                        aria-sort={
                          sortBy === col
                            ? (sortDir === 'asc' ? 'ascending' : 'descending')
                            : 'none'
                        }
                        className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer select-none"
                      >
                        {col}
                        {sortBy === col && (
                          sortDir === 'asc'
                            ? <HiSortAscending className="inline h-4 w-4 ml-1 text-white" />
                            : <HiSortDescending className="inline h-4 w-4 ml-1 text-white" />
                        )}
                      </th>
                    )

                    if (tableName === 'Productos' && !childRelation && col === 'precio') {
                      const childThs = allRelations.map(ct => (
                        <th
                          key={`c-${ct}`}
                          className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          {relationLabels[ct] || ct}
                        </th>
                      ))
                      return [th, ...childThs]
                    }
                    return th
                  })}

                  {/* para otras tablas (no Productos) seguimos agregando relaciones al final */}
                  {tableName !== 'Productos' && !childRelation && allRelations.map(ct => (
                    <th
                      key={ct}
                      className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      {relationLabels[ct] || ct}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-indigo-100">
                {pageData.map((row) => (
                  <tr key={row.id} className="odd:bg-indigo-50 even:bg-white hover:bg-indigo-100 transition">
                    {/* checkbox */}
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selected.includes(row.id)}
                        onChange={() => toggleSelect(row.id)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        aria-label={`Seleccionar fila ${row.id}`}
                      />
                    </td>

                    {/* acciones */}
                    <td className="px-4 py-2 flex space-x-3 items-center *:justify-center *:text-center ">
                      <button
                        title="Ver"
                        onClick={() => { setDetailRow(row); setEditRow(null); setConfirmItems(null) }}
                        className="p-1 hover:text-indigo-600 transition"
                        aria-label={`Ver fila ${row.id}`}
                      >
                        <HiEye className="h-5 w-5" />
                      </button>
                      <button
                        title="Editar"
                        onClick={() => setEditRow(row)}
                        className="p-1 hover:text-indigo-600 transition"
                        aria-label={`Editar fila ${row.id}`}
                      >
                        <HiPencil className="h-5 w-5" />
                      </button>

                      {!readOnly && (
                        <button
                          title="Eliminar"
                          onClick={() => setConfirmItems([row])}
                          className="p-1 hover:text-red-600 transition"
                          aria-label={`Eliminar fila ${row.id}`}
                        >
                          <HiTrash className="h-5 w-5" />
                        </button>
                      )}
                    </td>

                    {/* celdas */}
                    {columns.flatMap((col: string) => {
                      const td = (
                        <td
                          key={col}
                          className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 border-b border-indigo-100"
                        >
                          {renderCell(row[col], col)}
                        </td>
                      )

                      if (tableName === 'Productos' && !childRelation && col === 'precio') {
                        const childTds = allRelations.map(ct => {
                          const relObj = relationDataArray.find(r => r.childTable === ct)
                          const relRows = relObj ? relObj.data : []
                          if (!relRows.length) return <td key={`c-${ct}`} />
                          const fk = Object.keys(relRows[0]).find(k =>
                            k.toLowerCase().endsWith('id') &&
                            k.toLowerCase().includes(tableName.toLowerCase().replace(/s$/, ''))
                          )
                          const count = fk ? relRows.filter(r => r[fk] === row.id).length : 0
                          return (
                            <td key={`c-${ct}`} className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 border-b border-indigo-100">
                              <button
                                className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs hover:bg-green-200 transition"
                                onClick={() => setChildRelation({ childTable: ct, foreignKey: fk!, parentId: row.id })}
                                aria-label={`Ver ${relationLabels[ct] || ct} de ${row.id}`}
                              >
                                {(relationLabels[ct] || ct)} ({count})
                              </button>
                            </td>
                          )
                        })
                        return [td, ...childTds]
                      }

                      return td
                    })}

                    {/* otras tablas (no Productos) → conteo de hijos al final */}
                    {tableName !== 'Productos' && !childRelation && allRelations.map(ct => {
                      const relObj = relationDataArray.find(r => r.childTable === ct)
                      const relRows = relObj ? relObj.data : []
                      if (!relRows.length) return <td key={ct} />

                      const fk = Object.keys(relRows[0]).find(k =>
                        k.toLowerCase().endsWith('id') &&
                        k.toLowerCase().includes(tableName.toLowerCase().replace(/s$/, ''))
                      )
                      const count = fk ? relRows.filter(r => r[fk] === row.id).length : 0

                      return (
                        <td key={ct} className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 border-b border-indigo-100">
                          <button
                            className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs hover:bg-green-200 transition"
                            onClick={() => setChildRelation({ childTable: ct, foreignKey: fk!, parentId: row.id })}
                            aria-label={`Ver ${relationLabels[ct] || ct} de ${row.id}`}
                          >
                            {(relationLabels[ct] || ct)} ({count})
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

        {/* paginación */}
        {pageData.length > 0 && (
          <footer className="flex items-center justify-between px-4 py-3 bg-indigo-50 border-t border-indigo-200">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border border-indigo-300 rounded disabled:opacity-50 hover:bg-indigo-100 transition"
              aria-label="Página anterior"
            >
              <HiChevronLeft className="inline h-5 w-5 text-indigo-600" />
            </button>
            <span className="text-sm text-gray-700">
              Página {page} de {totalPages}
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

      {/* ---------------------------------------------------------------------
         MODALES
      --------------------------------------------------------------------- */}
      {detailRow && (
        <Modal title="Detalle" onClose={() => setDetailRow(null)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campos primitivos en dos columnas */}
            {Object.entries(detailRow)
            .filter(([__unused, v]) => v == null || ['string','number','boolean'].includes(typeof v))
            .map(([k, v]) => (
              <div key={k} className="flex">
                <span className="font-semibold w-40 text-gray-700">
                  {k.replace(/_/g,' ')}:
                </span>
                <span className="text-gray-800">{String(v)}</span>
              </div>
            ))}

            {/* Secciones colapsables ocupan ambas columnas */}
            {Object.entries(detailRow)
              .filter(([__unused, v]) => v && typeof v === 'object')
              .map(([k, v]) => (
                <div key={k} className="md:col-span-2 border-t pt-4">
                  <button
                    onClick={() => setOpenSections(s => ({ ...s, [k]: !s[k] }))}
                    className="w-full flex justify-between items-center text-left text-gray-700 font-medium hover:text-gray-900"
                  >
                    <span>{k.replace(/_/g,' ')}</span>
                    <span>{openSections[k] ? '▲' : '▼'}</span>
                  </button>
                  {openSections[k] && (
                    <div className="mt-3 text-gray-800 text-sm space-y-2">
                      {/* Array de objetos: mini-tabla */}
                      {Array.isArray(v as any[]) && (v as any[]).length > 0 && typeof (v as any[])[0] === 'object' && (
                        <table className="w-full text-sm border-collapse">
                          <thead className="bg-indigo-100">
                            <tr>
                              <th className="border px-2 py-1 text-left text-indigo-700">ID</th>
                              <th className="border px-2 py-1 text-left text-indigo-700">Nombre</th>
                              <th className="border px-2 py-1 text-right text-indigo-700">Precio</th>
                              <th className="border px-2 py-1 text-right text-indigo-700">Cantidad</th>
                              {/* si hay más campos, puedes agregarlos aquí con su traducción */}
                            </tr>
                          </thead>
                          <tbody>
                            {(v as any[]).map((row, i) => (
                              <tr
                                key={i}
                                className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                              >
                                <td className="border px-2 py-1">{row.id}</td>
                                <td className="border px-2 py-1">{row.name}</td>
                                <td className="border px-2 py-1 text-right">${row.price}</td>
                                <td className="border px-2 py-1 text-right">{row.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}

                      {/* Array de primitivos: lista */}
                      {Array.isArray(v as any[]) && (v as any[]).every(e => ['string','number','boolean'].includes(typeof e)) && (
                        <ul className="list-disc list-inside pl-4">
                          {(v as any[]).map((item, j) => <li key={j}>{String(item)}</li>)}
                        </ul>
                      )}

                      {/* Objeto simple: lista de definiciones */}
                      {!Array.isArray(v as any[]) && (
                        <dl className="space-y-1">
                          {Object.entries(v as Record<string, any>).map(([prop, val]) => (
                            <div key={prop} className="flex">
                              <dt className="font-semibold w-36">{prop.replace(/_/g,' ')}:</dt>
                              <dd className="flex-1">{String(val)}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>
                  )}
                </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Modal Crear */}
      {createOpen && (
        <Modal title="Crear registro" onClose={() => setCreateOpen(false)}>
          {(() => {
            const base = childRelation
              ? { id: nextId, [childRelation.foreignKey]: childRelation.parentId }
              : { id: nextId }

            // Determina el recurso: si hay childRelation, es la tabla hija; si no, la tabla padre
            const resource = childRelation ? childRelation.childTable : tableName
            // Toma las columnas por defecto de ese recurso
            const defaults = DEFAULT_COLUMNS[resource] ?? []
            // Usa defaults si existen, sino visibleCols, sino las keys de base
            const colsForForm = defaults.length > 0
              ? defaults
              : visibleCols.length > 0
                ? visibleCols
                : Object.keys(base)

            return (
              <Form
                initial={base}
                columns={colsForForm}
                fixedFk={childRelation ? childRelation.foreignKey : undefined}
                onSubmit={handleCreate}
              />
            )
          })()}
        </Modal>
      )}

      {/* Modal Editar */}
      {editRow && editRow !== 'bulk' && (
        <Modal title={`Editar registro ${editRow.id}`} onClose={() => setEditRow(null)}>
          {(() => {
            const base = childRelation
              ? { ...editRow, [childRelation.foreignKey]: childRelation.parentId }
              : editRow

            const resource = childRelation ? childRelation.childTable : tableName
            const defaults = DEFAULT_COLUMNS[resource] ?? []
            const colsForForm = defaults.length > 0
              ? defaults
              : visibleCols.length > 0
                ? visibleCols
                : Object.keys(base)

            return (
              <Form
                initial={base}
                columns={colsForForm}
                fixedFk={childRelation ? childRelation.foreignKey : undefined}
                onSubmit={d => handleUpdate(editRow.id, d)}
              />
            )
          })()}
        </Modal>
      )}

      {/* 🔸 modal bulk */}
      {editRow === 'bulk' && (
        <Modal title={`Edición masiva (${selected.length})`} onClose={() => setEditRow(null)}>
          <BulkForm onSubmit={(field, value) => handleBulkUpdate(field, value)} />
        </Modal>
      )}

      {!readOnly && confirmItems && (
        <ConfirmModal
          items={confirmItems}
          onCancel={() => setConfirmItems(null)}
          onConfirm={() => {
            // para cada item, le indico explícitamente el childTable si existe
            confirmItems.forEach(it =>
              handleDelete(
                it.id,
                childRelation
                  ? childRelation.childTable
                  : tableName
              )
            );
            setConfirmItems(null);
            setSelected([]);
          }}
        />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------
type ModalProps = { title: string; onClose: () => void; children: React.ReactNode }
const Modal = memo(function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden">
        <header className="flex justify-between items-center px-6 py-3 bg-gray-100 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          >
            ✕
          </button>
        </header>
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
})

// ---------------------------------------------------------------------------
// ConfirmModal
// ---------------------------------------------------------------------------
type ConfirmModalProps = { items: any[]; onConfirm: () => void; onCancel: () => void }
const ConfirmModal = memo(function ConfirmModal({ items, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <Modal title="Confirmar eliminación" onClose={onCancel}>
      <p className="text-gray-700 mb-4">
        Vas a eliminar <span className="font-medium text-red-600">{items.length}</span> registro(s):
      </p>
      <ul className="list-disc list-inside max-h-40 overflow-y-auto border rounded p-4 bg-gray-50 mb-6">
        {items.map((it, idx) => (
          <li key={idx} className="text-gray-600">{it.producto || it.id}</li>
        ))}
      </ul>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
        >
          Eliminar
        </button>
      </div>
    </Modal>
  )
})

// ---------------------------------------------------------------------------
// Form  (creación / edición) – bloquea FK fijo con nombre del padre
// ---------------------------------------------------------------------------
type FormProps = { initial: Record<string, any>; columns: string[]; fixedFk?: string; onSubmit: (d: any) => void }

const Form = memo(function Form({ initial, columns, fixedFk, onSubmit }: FormProps) {
  const [form, setForm] = useState<Record<string, any>>(() => {
    const copy = { ...initial }
    if (fixedFk && copy[fixedFk] != null) copy[fixedFk] = String(copy[fixedFk])
    return copy
  })

  const handleChange = (key: string, value: any) =>
    setForm(f => ({ ...f, [key]: value }))

  // cargamos opciones FK
  const swrData = Object.fromEntries(
    Object.entries(fkConfig).map(([col, cfg]) => {
      /* eslint-disable-next-line react-hooks/rules-of-hooks */
      const { data = [] } = useSWR<any[]>(`/api/admin/resources/${cfg.resource}`, fetcher)
      return [col, data]
    })
  ) as Record<string, any[]>

  return (
    <form
      onSubmit={e => { e.preventDefault(); onSubmit(form) }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {columns.map(col => {
        const cfg = fkConfig[col as keyof typeof fkConfig]

        // -------------------- SELECT FK
        if (cfg) {
          const opciones = swrData[col] || []
          const isFixed  = fixedFk === col

          // buscamos etiqueta para mostrar si está fijo
          const fixedLabel = isFixed
            ? opciones.find(o => String(o.id) === form[col])?.[cfg.labelKey] ?? form[col]
            : null

          return (
            <div key={col} className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">{cfg.fieldLabel}</label>

              {isFixed ? (
                <>
                  <input type="hidden" name={col} value={form[col]} />
                  <input
                    value={fixedLabel}
                    disabled
                    className="px-3 py-2 border rounded bg-gray-100 text-gray-600"
                  />
                </>
              ) : (
                <select
                  value={form[col] ?? ''}
                  onChange={e => handleChange(col, e.target.value)}
                  className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">— Selecciona —</option>
                  {opciones.map(opt => (
                    <option key={opt.id} value={String(opt.id)}>
                      {opt[cfg.labelKey]}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )
        }

        if (col in fkConfig) {
          const cfg = fkConfig[col as keyof typeof fkConfig];
          const opciones = swrData[col] as Array<{ id: number; [key: string]: any }>;
      
          // isFixed sólo será true cuando fixedFk === col, y fixedFk solo se pasa en hijos
          const isFixed = fixedFk === col;
      
          // Si está fijo (hijo), mostramos el nombre; si no, un select normal
          const fixedLabel = isFixed
            ? opciones.find(o => String(o.id) === form[col])?.[cfg.labelKey] ?? ''
            : null;
      
          return (
            <div key={col} className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">
                {cfg.fieldLabel}
              </label>
      
              {isFixed ? (
                <>
                  {/* En hijos: input hidden + campo deshabilitado */}
                  <input type="hidden" name={col} value={form[col]} />
                  <input
                    value={fixedLabel}
                    disabled
                    className="px-3 py-2 border rounded bg-gray-100 text-gray-600"
                  />
                </>
              ) : (
                /* En padre (o cualquier otro FK en tablas principales): select normal */
                <select
                  value={form[col] ?? ''}
                  onChange={e => handleChange(col, e.target.value)}
                  className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">— Selecciona —</option>
                  {opciones.map(opt => (
                    <option key={opt.id} value={String(opt.id)}>
                      {opt[cfg.labelKey]}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        }
      

        // -------------------- input file
        if (col === 'foto') {
          return (
            <div key={col} className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">{col}</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => handleChange('foto', e.target.files?.[0] ?? null)}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          )
        }

        // -------------------- input texto
        return (
          <div key={col} className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">{col}</label>
            <input
              value={form[col] ?? ''}
              onChange={e => handleChange(col, e.target.value)}
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        )
      })}

      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Guardar
        </button>
      </div>
    </form>
  )
})

// ---------------------------------------------------------------------------
// BulkForm
// ---------------------------------------------------------------------------
type BulkFormProps = { onSubmit: (f: string, v: any) => void }

const BulkForm = memo(function BulkForm({ onSubmit }: BulkFormProps) {
  const [field, setField] = useState('')
  const [value, setValue] = useState('')

  return (
    <form
      onSubmit={e => { e.preventDefault(); onSubmit(field, value) }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium">Campo a editar</label>
        <input
          value={field}
          onChange={e => setField(e.target.value)}
          placeholder="nombreDelCampo"
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium">Nuevo valor</label>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Aplicar
        </button>
      </div>
    </form>
  )
})
