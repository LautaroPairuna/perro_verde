'use client'
import React from 'react'
import { useCatalog } from '../hooks/useCatalog'
import { fkConfig } from '../config'

type FkCfg = { resource: string; labelKey: string; fieldLabel: string }
type FkSelectP = {
  col: string
  value: string
  fixed: boolean
  onChange: (v: string) => void
}

export function FkSelect({ col, value, fixed, onChange }: FkSelectP) {
  const cfg: FkCfg | undefined = (fkConfig as Record<string, FkCfg>)[col]

  // Hook SIEMPRE llamado (clave vacía => SWR no fetch)
  const { options, isLoading } = useCatalog(cfg?.resource ?? '')
  const safeOptions = Array.isArray(options) ? options : []

  const fixedLabel =
    safeOptions.find((o: { id: string | number }) => String(o.id) === String(value))?.[
      cfg?.labelKey as string
    ] ?? (value || '')

  if (!cfg) {
    return (
      <input
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    )
  }

  if (fixed) {
    return (
      <>
        <input type="hidden" name={col} value={value ?? ''} />
        <input
          disabled
          value={fixedLabel}
          className="px-3 py-2 border rounded bg-gray-100 text-gray-600"
        />
      </>
    )
  }

  return (
    <select
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
    >
      <option value="" disabled={isLoading}>
        {isLoading ? 'Cargando…' : '— Selecciona —'}
      </option>
      {safeOptions.map((o: Record<string, unknown>) => (
        <option key={String(o.id)} value={String(o.id)}>
          {String(o[cfg.labelKey])}
        </option>
      ))}
    </select>
  )
}
