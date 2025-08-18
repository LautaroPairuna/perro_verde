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

/** Forzamos una vista indexable del relationMap sin perder readonly en los arrays */
type RelationMapIndexable = Record<string, readonly string[]>
const REL_MAP = relationMap as unknown as RelationMapIndexable

/**
 * Carga en un solo hook SWR todas las relaciones definidas para `parent`.
 * - Sin `any`
 * - Sin hooks en bucles (rules-of-hooks OK)
 * - Tipado estricto
 */
export function useRelations(parent: string): RelationResult[] {
  const children = REL_MAP[parent] ?? []

  // Cuando no hay relaciones, devolvemos estructura vacía SIN montar SWR
  if (children.length === 0) return []

  const swrKey = ['relations', parent, ...children] as const

  const { data } = useSWRImmutable<RelationResult[]>(
    swrKey,
    async () => {
      const results = await Promise.all(
        children.map(async (child) => {
          const rows = await fetchJson<Row[]>(`/api/admin/resources/${child}`)
          return { childTable: child, data: rows }
        }),
      )
      return results
    },
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    },
  )

  // Shape estable durante carga
  return data ?? children.map((child) => ({ childTable: child, data: [] as Row[] }))
}
