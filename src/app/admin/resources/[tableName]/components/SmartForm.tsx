'use client'
import React, { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FkSelect } from './FkSelect'
import ImageDropzone from './ImageDropzone'
import { Switch } from './Switch'
import { fkConfig } from '../config'
import { schemaByResource } from '../schemas'
import { folderNames } from '@/lib/adminConstants'

const BOOLEAN_COLS = new Set(['activo', 'destacado', 'permite_cuotas', 'permite_envio'])
import type { Json } from '../types'

type SmartFormProps = {
  initial: Record<string, unknown>
  columns: string[]
  fixedFk?: string
  onSubmit: (d: Record<string, Json>) => void
  resource: string
  isSaving?: boolean
}

export function SmartForm({ initial, columns, fixedFk, onSubmit, resource, isSaving }: SmartFormProps) {
  // Obtener el esquema Zod dinámicamente
  const schema = useMemo(() => {
    const s = schemaByResource[resource]
    if (!s) return z.object({}).passthrough() // Fallback si no hay esquema
    return s
  }, [resource])

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),
    defaultValues: initial,
  })

  // Carpeta para imágenes
  const folderKey = useMemo(() => {
    const r = resource?.trim()
    if (!r) return null
    const map = folderNames as Record<string, string>
    return map[r] ?? r.toLowerCase()
  }, [resource])

  const onValid = (data: Record<string, unknown>) => {
    // Limpieza o transformación final si es necesaria
    onSubmit(data as Record<string, Json>)
  }

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      autoComplete="off"
    >
      {columns.map((col) => {
        // Ocultar ID siempre (es autoincremental/interno)
        if (col === 'id') return null
        
        // Ocultar 'thumbs' en CfgSlider porque se genera automático
        if (resource === 'CfgSlider' && col === 'thumbs') return null

        const error = errors[col]
        const errorMessage = error?.message as string | undefined

        /* FK SELECT */
        if (col in fkConfig) {
          const fixed = fixedFk === col
          return (
            <div key={col} className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">
                {fkConfig[col as keyof typeof fkConfig].fieldLabel}
              </label>
              <Controller
                name={col}
                control={control}
                render={({ field }) => (
                  <FkSelect
                    col={col}
                    value={String(field.value ?? '')}
                    fixed={fixed}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
              {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
            </div>
          )
        }

        /* IMAGE DROPZONE */
        if (col === 'foto') {
          return (
            <div key={col} className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Foto</label>
              <Controller
                name={col}
                control={control}
                render={({ field }) => {
                   const dzValue =
                    field.value instanceof File
                      ? field.value
                      : typeof field.value === 'string'
                      ? field.value
                      : null
                  return (
                    <ImageDropzone
                      value={dzValue}
                      onChange={(file) => field.onChange(file)}
                      resolvePreviewSrc={
                        folderKey
                          ? (s) => `/images/${folderKey}/${s}`
                          : undefined
                      }
                    />
                  )
                }}
              />
               {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
            </div>
          )
        }

        /* BOOLEAN SWITCH */
        if (BOOLEAN_COLS.has(col)) {
          return (
            <div key={col} className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">{col}</label>
              <Controller
                name={col}
                control={control}
                render={({ field }) => {
                  // Manejo robusto de valores truthy/falsy (por si viene "0", 0, "false")
                  const val = field.value
                  const isChecked = val === true || val === 1 || val === '1' || val === 'true'
                  
                  return (
                    <div className="flex items-center h-[42px]">
                      <Switch
                        checked={isChecked}
                        onChange={(val) => field.onChange(val)}
                      />
                      <span className="ml-3 text-sm text-gray-500">
                        {isChecked ? 'Sí' : 'No'}
                      </span>
                    </div>
                  )
                }}
              />
              {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
            </div>
          )
        }

        /* STANDARD INPUT */
        // Tipado básico para input type
        const isNumber = col === 'precio' || col === 'stock' || col === 'orden'
        const type = isNumber ? 'number' : 'text'

        return (
          <div key={col} className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">{col}</label>
            <input
              {...register(col, { valueAsNumber: isNumber })}
              type={type}
              className={`px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errorMessage ? 'border-red-500 ring-red-200' : 'border-gray-300'
              }`}
            />
            {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
          </div>
        )
      })}

      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded transition flex items-center"
        >
          {isSaving && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isSaving ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}
