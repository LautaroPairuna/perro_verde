'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { HiCloudUpload, HiPhotograph } from 'react-icons/hi'

interface AdminDropzoneProps {
  currentImage?: string | null
  resourceName: string
  resourceId: string | number
  onSuccess?: (newUrl: string) => void
  className?: string
  children?: React.ReactNode
}

export default function AdminDropzone({
  currentImage,
  resourceName,
  resourceId,
  onSuccess,
  className = '',
  children
}: AdminDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null) // Solo para upload preview

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length === 0) return

    const file = files[0]
    if (!file.type.startsWith('image/')) {
      toast.error('Solo se permiten imágenes')
      return
    }

    // Optimistic preview
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    setUploading(true)

    const formData = new FormData()
    formData.append('foto', file)

    try {
      const res = await fetch(`/api/admin/resources/${resourceName}/${resourceId}`, {
        method: 'PUT',
        body: formData,
      })

      if (!res.ok) throw new Error('Error al subir imagen')

      const data = await res.json()
      toast.success('Imagen actualizada')
      setPreview(null) // Limpiar preview para volver a mostrar el componente hijo actualizado
      if (onSuccess && data.foto) onSuccess(data.foto)
      
    } catch (error) {
      console.error(error)
      toast.error('Falló la subida')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }, [resourceName, resourceId, onSuccess])

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative rounded-lg transition-all cursor-pointer group inline-block
        ${isDragging ? 'ring-2 ring-blue-500 bg-blue-50 z-10' : ''}
        ${uploading ? 'opacity-50 pointer-events-none' : ''}
        ${className}
      `}
      title="Arrastra una imagen aquí para actualizar"
    >
      {preview ? (
        <div className="w-16 h-16 relative">
             <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded"
            />
        </div>
      ) : (
        children || (
           <div className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded">
              <HiPhotograph className="w-6 h-6 text-gray-400" />
           </div>
        )
      )}

      {/* Overlay al hacer hover con archivo (drag) */}
      <div className={`
        absolute inset-0 bg-blue-500/20 flex items-center justify-center transition-opacity rounded
        ${isDragging ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <HiCloudUpload className="w-8 h-8 text-blue-600 drop-shadow-md" />
      </div>

      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded">
          <div className="w-4 h-4 border-2 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}
