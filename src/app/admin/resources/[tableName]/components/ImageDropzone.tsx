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
  // - si hay File => blobUrl
  // - si hay string => usar resolvePreviewSrc si existe, sino la string tal cual
  const previewSrc: string | null =
    value instanceof File
      ? blobUrl
      : (typeof value === 'string' && value
          ? (resolvePreviewSrc ? resolvePreviewSrc(value) : value)
          : null)

  return (
    <div className="flex flex-col gap-3">
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={[
          'w-full border-2 border-dashed rounded px-4 py-6 text-center cursor-pointer transition',
          dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 hover:bg-gray-50'
        ].join(' ')}
        aria-label="Zona para arrastrar y soltar imagen"
      >
        {previewSrc ? (
          <div className="flex items-center justify-center">
            <Image
              src={previewSrc}
              alt="Preview"
              width={160}
              height={160}
              className="rounded border object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="text-gray-600">
            <div className="font-medium">Arrastrá una imagen aquí</div>
            <div className="text-sm text-gray-500">o hacé clic para seleccionar</div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="px-3 py-2 border rounded hover:bg-gray-100 transition"
        >
          Subir archivo
        </button>
        {value ? (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="px-3 py-2 border rounded hover:bg-gray-100 transition text-gray-600"
          >
            Quitar
          </button>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={e => handleFiles(e.currentTarget.files)}
        className="hidden"
      />
    </div>
  )
}
