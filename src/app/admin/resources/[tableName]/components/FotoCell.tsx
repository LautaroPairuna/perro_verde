'use client'
import React from 'react'
import Image from 'next/image'
import { folderNames } from '@/lib/adminConstants'

/** Placeholder inline (no depende del filesystem ni del rewrite /api/disk-images) */
const PLACEHOLDER_SVG = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
  <rect width="100%" height="100%" fill="#e5e7eb"/>
  <g fill="#9ca3af">
    <rect x="10" y="42" width="44" height="12" rx="2"/>
    <circle cx="20" cy="22" r="10"/>
    <path d="M10 44 L26 28 L36 36 L54 18 L54 44 Z" fill="#d1d5db"/>
  </g>
</svg>
`)
const PLACEHOLDER_DATA_URL = `data:image/svg+xml;utf8,${PLACEHOLDER_SVG}`

export function FotoCell({
  tableName,
  childRelation,
  fileName,
}: {
  tableName: string
  childRelation?: { childTable: string } | null
  fileName: string
}) {
  const key      = (folderNames as Record<string, string>)[childRelation?.childTable ?? tableName]
  const thumbSrc = `/images/${key}/thumbs/${fileName}`
  const fullSrc  = `/images/${key}/${fileName}`

  const [src, setSrc]       = React.useState<string>(thumbSrc)
  const [isPlaceholder, setIsPlaceholder] = React.useState(false)

  React.useEffect(() => {
    // si cambia el fileName/tabla, reseteamos el ciclo (thumb → full → placeholder)
    setSrc(thumbSrc)
    setIsPlaceholder(false)
  }, [thumbSrc])

  const handleErr = React.useCallback(() => {
    setSrc(prev => {
      if (prev === thumbSrc) {
        // 1) si falla el thumb, probamos el archivo original
        return fullSrc
      }
      if (prev === fullSrc) {
        // 2) si también falla el original, usamos placeholder inline
        setIsPlaceholder(true)
        return PLACEHOLDER_DATA_URL
      }
      // 3) si (muy raro) falla el placeholder inline, mantenemos último valor
      return prev
    })
  }, [thumbSrc, fullSrc])

  return (
    <div className="flex items-center space-x-2">
      <Image
        src={src}
        alt={isPlaceholder ? `Sin imagen (${fileName})` : fileName}
        width={64}
        height={64}
        className="object-cover rounded shadow flex-shrink-0"
        onError={handleErr}
        // Para data URLs, Next optimiza igual; si querés evitarlo:
        // unoptimized={src.startsWith('data:')}
      />
      <span className="text-xs text-gray-600 truncate" style={{ maxWidth: 100 }}>
        {fileName}
      </span>
    </div>
  )
}
