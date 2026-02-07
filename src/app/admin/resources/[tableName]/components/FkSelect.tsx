'use client'
import React from 'react'
import { HiChevronDown } from 'react-icons/hi'
import { useCatalog } from '../hooks/useCatalog'
import { fkConfig } from '../config'

type FkCfg = { resource: string; labelKey: string; fieldLabel: string }
type FkSelectP = {
  col: string
  value: string
  fixed: boolean
  onChange: (v: string) => void
  error?: boolean
}

export function FkSelect({ col, value, fixed, onChange, error }: FkSelectP) {
  const cfg: FkCfg | undefined = (fkConfig as Record<string, FkCfg>)[col]

  // Hook SIEMPRE llamado (clave vacía => SWR no fetch)
  const { options, isLoading } = useCatalog(cfg?.resource ?? '')
  const safeOptions = Array.isArray(options) ? options : []

  const fixedLabel =
    safeOptions.find((o: { id: string | number }) => String(o.id) === String(value))?.[
      cfg?.labelKey as string
    ] ?? (value || '')

  const baseClass = `flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-colors ${
    error ? 'border-red-500 ring-red-200' : 'border-gray-300'
  }`

  if (!cfg) {
    return (
      <input
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        className={baseClass}
      />
    )
  }

  if (fixed) {
    return (
      <>
        <input type="hidden" name={col} value={value ?? ''} />
        <div className={`bg-gray-100 text-gray-600 ${baseClass}`}>
          {fixedLabel}
        </div>
      </>
    )
  }

  return (
    <div className="relative">
      <select
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        className={baseClass}
        disabled={isLoading}
      >
        <option value="" disabled>
          {isLoading ? 'Cargando datos...' : '— Seleccionar —'}
        </option>
        {safeOptions.map((o: Record<string, unknown>) => (
          <option key={String(o.id)} value={String(o.id)}>
            {String(o[cfg.labelKey])}
          </option>
        ))}
      </select>
      <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
    </div>
  )
}
