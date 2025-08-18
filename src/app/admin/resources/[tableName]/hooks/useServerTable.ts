'use client'
import useSWR from 'swr'

export type ServerTableParams = {
  page: number
  pageSize: number
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  search?: string
  filters?: Record<string, string | number | boolean>
}

export type ServerTableResult<T extends Record<string, unknown>> = {
  rows: T[]
  total: number
  validating: boolean
  refresh: () => void
}

const fetcher = (u: string) => fetch(u).then(r => r.json())

export function useServerTable<T extends Record<string, unknown>>(
  resource: string,
  { page, pageSize, sortBy, sortDir, search, filters = {} }: ServerTableParams
): ServerTableResult<T> {
  const qs = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...(sortBy ? { sortBy } : {}),
    ...(sortDir ? { sortDir } : {}),
    ...(search ? { q: search } : {}),
    ...(Object.fromEntries(Object.entries(filters).map(([k, v]) => [k, String(v)]))),
  })
  const key = `/api/admin/resources/${resource}?${qs.toString()}`

  const { data, isValidating, mutate } = useSWR<{ rows: T[]; total: number }>(key, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  })

  return {
    rows: data?.rows ?? [],
    total: data?.total ?? 0,
    validating: isValidating,
    refresh: () => { void mutate() },
  }
}
