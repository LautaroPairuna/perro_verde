'use client'
import useSWR from 'swr'

const fetcher = (u: string) => fetch(u).then(r => r.json())

const relationMap: Record<string, readonly string[]> = {
  Productos: ['ProductoFotos', 'ProductoVersiones', 'ProductoEspecificaciones'],
}

type RelationResult<T = any> = {
  childTable: string
  data: T[]
}

export function useRelations(parent: string): RelationResult[] {
  const children = relationMap[parent] ?? []

  return children.map((child) => {
    const { data = [] } = useSWR<any[]>(
      `/api/admin/resources/${child}`,
      fetcher,
      { revalidateOnFocus: false, keepPreviousData: true }
    )

    return { childTable: child, data }
  })
}
