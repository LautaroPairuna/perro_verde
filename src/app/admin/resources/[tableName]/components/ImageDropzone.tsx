'use client'
import React from 'react'
import Image from 'next/image'

type Props = {
  /** Puede venir un File nuevo o un string (ruta/nombre existente) */
  value?: File | string | null
  /** Siempre devolvemos File (o null) al cambiar */
  onChange: (file: File | null) => void
  accept?: string
  /**
   * (Opcional) Resolver la ruta cuando `value` es string.
   * Ej: (s) => `/images/productos/${s}` o a tu endpoint /api/disk-images/...
   */
  resolvePreviewSrc?: (src: string) => string
}

export default function ImageDropzone({
  value,
  onChange,
  accept = 'image/*',
  resolvePreviewSrc,
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver]   = React.useState(false)
  const [blobUrl, setBlobUrl]     = React.useState<string | null>(null)

  // Genera / limpia URL blob cuando value es File
  React.useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value)
      setBlobUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setBlobUrl(null)
    return
  }, [value])

  const handleFiles = (files: FileList | null) => {
    const f = files?.[0] ?? null
    onChange(f)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  // Resuelve el src a mostrar:
  const previewSrc: string | null =
    value instanceof File
      ? blobUrl
      : (typeof value === 'string' && value
          ? (resolvePreviewSrc ? resolvePreviewSrc(value) : value)
          : null)

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      className={[
        'relative w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 group overflow-hidden',
        dragOver 
          ? 'border-indigo-500 bg-indigo-50 shadow-inner' 
          : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
      ].join(' ')}
      aria-label="Zona para arrastrar y soltar imagen"
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={e => handleFiles(e.target.files)}
        className="hidden"
      />

      {previewSrc ? (
        <div className="relative flex items-center justify-center">
          <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white p-1">
             <Image
              src={previewSrc}
              alt="Preview"
              width={200}
              height={200}
              className="object-contain max-h-48 w-auto rounded"
              unoptimized
            />
          </div>
          
          {/* Overlay con botón al hacer hover sobre la imagen ya cargada */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity rounded-lg">
             <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium shadow-lg transform scale-95 group-hover:scale-100 transition-transform">
               Cambiar imagen
             </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-4 text-gray-500">
           <div className="mb-3 p-3 bg-gray-100 rounded-full text-gray-400 group-hover:text-indigo-500 group-hover:bg-indigo-100 transition-colors">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
           </div>
           <p className="text-base font-medium text-gray-700">
             Arrastrá tu imagen aquí
           </p>
           <p className="text-sm mt-1 mb-4">
             o hacé clic para seleccionar
           </p>
           
           <button
             type="button"
             className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors pointer-events-none"
           >
             Seleccionar archivo
           </button>
        </div>
      )}

      {/* Info de peso máximo (absoluto abajo) */}
      <div className="mt-4 text-xs text-gray-400">
        Máximo 5MB · Formatos: JPG, PNG, WEBP
      </div>
    </div>
  )
}
