'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useCatalog } from '../hooks/useCatalog'
import { fkConfig } from '../config' // Asegurate de exportar fkConfig desde config.ts

type FkSelectP = {
  col: string
  value: string
  fixed: boolean
  onChange: (v: string) => void
}

export function FkSelect({ col, value, fixed, onChange }: FkSelectP) {
  const cfg = (fkConfig as Record<string, { resource: string; labelKey: string; fieldLabel: string }>)[col]
  // Si no hay config de FK, caemos a un input estándar (failsafe)
  if (!cfg) {
    return (
      <>
        <input
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </>
    )
  }

  const { options, isLoading } = useCatalog(cfg.resource)
  const safeOptions = Array.isArray(options) ? options : []

  // label para fixed
  const fixedLabel =
    safeOptions.find(o => String(o.id) === String(value))?.[cfg.labelKey] ??
    (value || '')

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
      {safeOptions.map((o: any) => (
        <option key={o.id} value={String(o.id)}>
          {o[cfg.labelKey]}
        </option>
      ))}
    </select>
  )
}
