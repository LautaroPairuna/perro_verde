// src/app/admin/resources/[tableName]/hooks/useServerTable.ts
'use client'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type Primitive = string | number | boolean
export type FilterValue = Primitive | Primitive[]
export type Filters = Record<string, FilterValue>

export type ServerTableParams = {
  page: number
  pageSize: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  search?: string
  qFields?: string[]
  filters?: Filters
}

export type ServerTableResult<T extends Record<string, unknown>> = {
  rows: T[]
  total: number
  validating: boolean
  refresh: () => void
}

const fetcher = async <T,>(u: string): Promise<T> => {
  const r = await fetch(u)
  if (!r.ok) throw new Error(`HTTP ${r.status} al cargar ${u}`)
  return (await r.json()) as T
}

// stringify estable: misma key si el contenido no cambió (aunque cambie orden de claves)
function stableStringify(obj: unknown): string {
  if (Array.isArray(obj)) return `[${obj.map(stableStringify).join(',')}]`
  if (obj && typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>).sort(([a],[b]) => a.localeCompare(b))
    return `{${entries.map(([k,v]) => JSON.stringify(k)+':'+stableStringify(v)).join(',')}}`
  }
  return JSON.stringify(obj)
}

export function useServerTable<T extends Record<string, unknown>>(
  resource: string,
  { page, pageSize, sortBy, sortDir, search, qFields, filters = {} }: ServerTableParams
): ServerTableResult<T> {
  const qs = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...(sortBy ? { sortBy } : {}),
    ...(sortDir ? { sortDir } : {}),
    ...(search ? { q: search } : {}),
    ...(qFields && qFields.length ? { qFields: qFields.join(',') } : {}),
  })

  // El API lee `filters` como JSON ⇒ lo enviamos así
  const filtersJson = Object.keys(filters).length ? stableStringify(filters) : ''
  if (filtersJson) qs.set('filters', filtersJson)

  const endpoint = resource
    ? `/api/admin/resources/${encodeURIComponent(resource)}?${qs.toString()}`
    : null

  const { data, isFetching, refetch } = useQuery<{ rows: T[]; total: number }>({
    queryKey: ['resource', resource, qs.toString()],
    queryFn: () => fetcher(endpoint!),
    enabled: !!endpoint,
    placeholderData: keepPreviousData,
  })

  return {
    rows: data?.rows ?? [],
    total: data?.total ?? 0,
    validating: isFetching,
    refresh: () => { void refetch() },
  }
}
