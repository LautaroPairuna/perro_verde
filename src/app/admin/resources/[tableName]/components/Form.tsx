'use client'
import React, { memo, FormEvent } from 'react'
import { FkSelect } from './FkSelect'
import ImageDropzone from './ImageDropzone'
import { fkConfig } from '../config'
import type { Json } from '../types'
import { folderNames } from '@/lib/adminConstants'

type FormP = {
  initial: Record<string, unknown>
  columns: string[]
  fixedFk?: string
  onSubmit: (d: Record<string, Json>) => void
  /** ← nuevo: nombre del recurso, ej. "Productos" */
  resource?: string
}

export function Form({ initial, columns, fixedFk, onSubmit, resource }: FormP) {
  const [form, setForm] = React.useState<Record<string, unknown>>({ ...initial })

  const handle = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(form as Record<string, Json>)
  }

  // Resolvemos la carpeta para previews cuando value sea string (foto existente)
  const folderKey = React.useMemo(() => {
    const r = resource?.trim()
    if (!r) return null
    const map = folderNames as Record<string, string>
    return map[r] ?? r.toLowerCase()
  }, [resource])

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      autoComplete="off"
    >
      {columns.map(col => {
        /* FK */
        if (col in fkConfig) {
          const fixed = fixedFk === col
          return (
            <div key={col} className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">
                {fkConfig[col as keyof typeof fkConfig].fieldLabel}
              </label>
              <FkSelect
                col={col}
                value={String(form[col] ?? '')}
                fixed={fixed}
                onChange={v => handle(col, v)}
              />
            </div>
          )
        }

        /* FILE */
        if (col === 'foto') {
          const raw = form[col]
          const dzValue =
            raw instanceof File
              ? raw
              : typeof raw === 'string'
              ? raw
              : null

          return (
            <div key={col} className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Foto</label>
              <ImageDropzone
                value={dzValue}                      // <-- ahora acepta File | string | null
                onChange={(file) => handle(col, file)}
                resolvePreviewSrc={
                  folderKey
                    ? (s) => `/images/${folderKey}/${s}` // también podrías usar /api/disk-images/${folderKey}/${s}
                    : undefined
                }
              />
            </div>
          )
        }

        /* OTHER */
        return (
          <div key={col} className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">{col}</label>
            <input
              value={String(form[col] ?? '')}
              onChange={e => handle(col, e.target.value)}
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        )
      })}

      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
        >
          Guardar
        </button>
      </div>
    </form>
  )
}

/* ───────────────────────────── BulkForm ───────────────────────────── */

type BulkValue = string | number | boolean
type BulkP = { onSubmit: (field: string, value: BulkValue) => void }

export const BulkForm = memo(function BulkForm({ onSubmit }: BulkP) {
  const [field, setField] = React.useState<string>('')
  const [value, setValue] = React.useState<string>('')

  const send = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(field, value) // parseo (num/bool) lo hacés en el handler del padre
  }

  return (
    <form onSubmit={send} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium">Campo</label>
        <input
          value={field}
          onChange={e => setField(e.target.value)}
          placeholder="nombreCampo"
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium">Valor</label>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>
      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
        >
          Aplicar
        </button>
      </div>
    </form>
  )
})
