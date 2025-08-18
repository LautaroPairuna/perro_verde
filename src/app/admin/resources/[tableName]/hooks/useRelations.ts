'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from 'swr'

const fetcher = (u: string) => fetch(u).then(r => r.json())

const relationMap: Record<string, readonly string[]> = {
  Productos: ['ProductoFotos', 'ProductoVersiones', 'ProductoEspecificaciones'],
}

function toList(data: any): any[] {
  if (!data) return []
  if (Array.isArray(data)) return data
  if (Array.isArray(data.rows)) return data.rows
  return []
}

export function useRelations(parent: string) {
  const children = relationMap[parent] ?? []
  const key = children.length ? ['relations', ...children] : null as unknown as readonly [string, ...string[]] | null

  const { data, error, isLoading } = useSWR(key, async (_tag: string, ...tables: string[]) => {
    const results = await Promise.all(
      tables.map(t => fetcher(`/api/admin/resources/${t}?page=1&pageSize=1000`))
    )
    return results
  }, { revalidateOnFocus: false })

  const out = (children).map((child, i) => ({
    childTable: child,
    data: toList(data?.[i]),
  }))

  return out
}
