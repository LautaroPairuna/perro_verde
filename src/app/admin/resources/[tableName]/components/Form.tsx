'use client'
import React, { memo, FormEvent } from 'react'
import { FkSelect } from './FkSelect'
import ImageDropzone from './ImageDropzone'
import { fkConfig } from '../config'

type FormP = {
  initial: Record<string, any>
  columns: string[]
  fixedFk?: string
  onSubmit: (d: any) => void
}

export const Form = memo(function Form({
  initial, columns, fixedFk, onSubmit,
}: FormP) {
  const [form, setForm] = React.useState<Record<string, any>>(() => ({ ...initial }))
  const handle = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))
  const submit = (e: FormEvent) => { e.preventDefault(); onSubmit(form) }

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      autoComplete="off"
    >
      {columns.map(col => {
        if (col in fkConfig) {
          const fixed = fixedFk === col
          return (
            <div key={col} className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">
                {fkConfig[col as keyof typeof fkConfig].fieldLabel}
              </label>
              <FkSelect
                col={col}
                value={form[col] ?? ''}
                fixed={fixed}
                onChange={v => handle(col, v)}
              />
            </div>
          )
        }

        if (col === 'foto')
          return (
            <div key={col} className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Foto</label>
              <ImageDropzone
                value={form[col] ?? null}
                onChange={(file) => handle(col, file)}
              />
            </div>
          )

        return (
          <div key={col} className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">{col}</label>
            <input
              value={form[col] ?? ''}
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
})

/* ───────────────────────────── BulkForm ───────────────────────────── */

type BulkP = { onSubmit: (f: string, v: any) => void }

export const BulkForm = memo(function BulkForm({ onSubmit }: BulkP) {
  const [field, setField] = React.useState('')
  const [value, setValue] = React.useState('')

  const send = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(field, value)
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
