'use client'
import useSWR from 'swr'

const fetcher = (u: string) => fetch(u).then(r => {
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
})

export type ServerTableQuery = {
  page: number
  pageSize: number
  sortBy: string
  sortDir: 'asc' | 'desc'
  search: string
  filters: Record<string, string | number | boolean>
}

export function useServerTable(resource: string, q: ServerTableQuery) {
  const params = new URLSearchParams()
  params.set('page', String(q.page))
  params.set('pageSize', String(q.pageSize))
  params.set('sort', `${q.sortBy}:${q.sortDir}`)
  if (q.search) params.set('search', q.search)
  Object.entries(q.filters ?? {}).forEach(([k, v]) => {
    if (v !== '' && v !== undefined && v !== null) {
      params.set(`filters[${k}]`, String(v))
    }
  })

  const url = `/api/admin/resources/${resource}?${params.toString()}`
  const { data, error, isLoading, isValidating, mutate } = useSWR<{
    rows: any[]
    total: number
    page: number
    pageSize: number
    sort: string
    search: string
    filters: Record<string, string>
  }>(url, fetcher, { keepPreviousData: true })

  return {
    url,
    rows: data?.rows ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    validating: isValidating,
    error,
    refresh: () => mutate(),
  }
}
