'use client'
import React, { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
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

  const onInvalid = (errors: any) => {
    console.error('Errores de validación:', errors)
    toast.error('Por favor revisa los campos marcados en rojo')
  }

  return (
    <form
      onSubmit={handleSubmit(onValid, onInvalid)}
      className="flex flex-col h-full"
      autoComplete="off"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 p-1">
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
              <div key={col} className="flex flex-col space-y-2">
                <label className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                      error={!!errorMessage}
                    />
                  )}
                />
                {errorMessage && <span className="text-red-500 text-xs font-medium">{errorMessage}</span>}
              </div>
            )
          }

          /* IMAGE DROPZONE */
          if (col === 'foto') {
            return (
              <div key={col} className="flex flex-col space-y-2 md:col-span-2">
                <label className="text-sm font-medium leading-none text-gray-700">Foto</label>
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
                 {errorMessage && <span className="text-red-500 text-xs font-medium">{errorMessage}</span>}
              </div>
            )
          }

          /* BOOLEAN SWITCH */
          if (BOOLEAN_COLS.has(col)) {
            return (
              <div key={col} className="flex flex-col space-y-2">
                <label className="text-sm font-medium leading-none text-gray-700 capitalize">{col.replace(/_/g, ' ')}</label>
                <Controller
                  name={col}
                  control={control}
                  render={({ field }) => {
                    // Manejo robusto de valores truthy/falsy
                    const val = field.value
                    const isChecked = val === true || val === 1 || val === '1' || val === 'true'
                    
                    return (
                      <div className="flex items-center h-10 p-2 border border-transparent">
                        <Switch
                          checked={isChecked}
                          onChange={(val) => field.onChange(val)}
                        />
                        <span className="ml-3 text-sm text-gray-600 font-medium">
                          {isChecked ? 'Activado' : 'Desactivado'}
                        </span>
                      </div>
                    )
                  }}
                />
                {errorMessage && <span className="text-red-500 text-xs font-medium">{errorMessage}</span>}
              </div>
            )
          }

          /* STANDARD INPUT */
          const isNumber = col === 'precio' || col === 'stock' || col === 'orden'
          const type = isNumber ? 'number' : 'text'

          return (
            <div key={col} className="flex flex-col space-y-2">
              <label className="text-sm font-medium leading-none text-gray-700 capitalize">
                {col.replace(/_/g, ' ')}
              </label>
              <input
                {...register(col, { valueAsNumber: isNumber })}
                type={type}
                className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
                  errorMessage ? 'border-red-500 ring-red-200' : 'border-gray-300'
                }`}
              />
              {errorMessage && <span className="text-red-500 text-xs font-medium">{errorMessage}</span>}
            </div>
          )
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-gray-100 sticky bottom-0 bg-white/95 backdrop-blur z-10 flex justify-end gap-3 pb-2">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}))} // Hack to close modal via escape
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all flex items-center"
        >
          {isSaving && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  )
}
