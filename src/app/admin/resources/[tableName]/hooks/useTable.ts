'use client'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { smartCompare } from '../utils/compare'

function useDebouncedValue<T>(value: T, delay = 220) {
  const [v, setV] = useState(value)
  useEffect(() => { const t = setTimeout(() => setV(value), delay); return () => clearTimeout(t) }, [value, delay])
  return v
}

export function useTable<T extends Record<string, unknown>>(
  data: T[],
  opts?: { initialSort?: [string, 'asc' | 'desc'] }
) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState(opts?.initialSort?.[0] ?? '')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(opts?.initialSort?.[1] ?? 'asc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const debouncedSearch = useDebouncedValue(search)

  useEffect(() => { setPage(1) }, [debouncedSearch, data, pageSize])

  const filtered = useMemo(() => {
    if (!debouncedSearch) return data
    const term = debouncedSearch.toLowerCase()
    return data.filter(r => Object.values(r).some(v => String(v ?? '').toLowerCase().includes(term)))
  }, [data, debouncedSearch])

  const sorted = useMemo(() => {
    if (!sortBy) return filtered
    return [...filtered].sort((a, b) => {
      const res = smartCompare((a as any)[sortBy], (b as any)[sortBy])
      return sortDir === 'asc' ? res : -res
    })
  }, [filtered, sortBy, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const pageData   = sorted.slice((page - 1) * pageSize, page * pageSize)

  const toggleSort = useCallback((col: string) => {
    setPage(1)
    if (sortBy === col) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortBy(col); setSortDir('asc') }
  }, [sortBy])

  return { search, setSearch, sortBy, sortDir, toggleSort, page, setPage, totalPages, pageSize, setPageSize, pageData }
}
