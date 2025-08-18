'use client'
import useSWR from 'swr'
import { relationMap } from '../config'

const fetcher = (u: string) => fetch(u).then(r => {
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
})

export function useRelations(parent: string) {
  const children = relationMap[parent as keyof typeof relationMap] ?? []
  return children.map(child => {
    const { data = [] } = useSWR<any[]>(
      `/api/admin/resources/${child}`,
      fetcher,
      { revalidateOnFocus: false, keepPreviousData: true, dedupingInterval: 1500 }
    )
    return { childTable: child, data }
  })
}
