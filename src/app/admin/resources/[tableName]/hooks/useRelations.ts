'use client'

import useSWRImmutable from 'swr/immutable'
import { relationMap } from '../config'

type Row = Record<string, unknown>

export type RelationResult<T extends Row = Row> = {
  childTable: string
  data: T[]
}

const fetchJson = async <T>(url: string): Promise<T> => {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`HTTP ${r.status} al cargar ${url}`)
  return (await r.json()) as T
}

/** Vista indexable del relationMap sin perder readonly en los arrays */
type RelationMapIndexable = Record<string, readonly string[]>
const REL_MAP = relationMap as unknown as RelationMapIndexable

/**
 * Carga en un solo hook SWR todas las relaciones definidas para `parent`.
 * - Sin `any`
 * - Sin hooks en bucles/condicionales (usamos key = null para deshabilitar)
 * - Tipado estricto
 */
export function useRelations(parent: string): RelationResult[] {
  const children: readonly string[] = REL_MAP[parent] ?? []

  // Key para SWR: si no hay relaciones, pasamos null (no fetch) pero el hook se llama igual.
  const swrKey = children.length ? (['relations', parent, ...children] as const) : null

  const { data } = useSWRImmutable<RelationResult[]>(
    swrKey,
    async () => {
      const results = await Promise.all(
        children.map(async (child) => {
          const rows = await fetchJson<Row[]>(`/api/admin/resources/${child}`)
          return { childTable: child, data: rows }
        })
      )
      return results
    },
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  )

  // Shape estable mientras carga o cuando no hay relaciones
  return data ?? children.map((child) => ({ childTable: child, data: [] as Row[] }))
}
