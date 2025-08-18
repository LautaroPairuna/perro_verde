'use client'
import React from 'react'

type Props = {
  value?: File | null
  onChange: (file: File | null) => void
  accept?: string
}

export default function ImageDropzone({ value, onChange, accept = 'image/*' }: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = React.useState(false)
  const [preview, setPreview]   = React.useState<string | null>(null)

  // Genera/limpia URL de preview cuando cambia el File
  React.useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
    setPreview(null)
  }, [value])

  const handleFiles = (files: FileList | null) => {
    const f = files?.[0]
    if (f) onChange(f)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

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
        {preview ? (
          <div className="flex items-center justify-center">
            {/* preview de la imagen cargada */}
            {/* Nota: usamos <img> para evitar restricciones de next/image en inputs locales */}
            {/* Mantiene look & feel simple acorde a tus formularios */}
            {/* Si preferís next/image, habrá que manejar loader personalizado */}
            {/* y no funciona con blob: por defecto */}
            <img
              src={preview}
              alt="Vista previa"
              className="h-32 w-32 object-cover rounded shadow"
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
