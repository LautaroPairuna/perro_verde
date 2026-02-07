'use client'

import { useState } from 'react'
import { 
  HiPlus, HiPencil, HiTrash, HiChevronDown, HiChevronUp, 
  HiDesktopComputer, HiShoppingCart, HiTag, HiCog, HiShieldCheck, HiUser 
} from 'react-icons/hi'
import type { AuditLog } from '../../../../../generated/prisma/client'

// Mapeo de acciones a colores e iconos
const ACTION_CONFIG: Record<string, { color: string; icon: any; label: string }> = {
  CREATE: { color: 'bg-green-100 text-green-700 border-green-200', icon: HiPlus, label: 'Creación' },
  UPDATE: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: HiPencil, label: 'Edición' },
  DELETE: { color: 'bg-red-100 text-red-700 border-red-200', icon: HiTrash, label: 'Eliminación' },
  LOGIN:  { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: HiDesktopComputer, label: 'Acceso' },
}

// Helper para categorizar recursos
const getResourceCategory = (entity: string) => {
  if (entity === 'Pedidos') return { label: 'VENTAS', color: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: HiShoppingCart }
  if (entity.startsWith('Producto')) return { label: 'CATÁLOGO', color: 'bg-orange-100 text-orange-700 border-orange-200', icon: HiTag }
  if (entity.startsWith('Cfg')) return { label: 'CONFIG', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: HiCog }
  if (entity === 'AuditLog') return { label: 'SEGURIDAD', color: 'bg-slate-100 text-slate-700 border-slate-200', icon: HiShieldCheck }
  return { label: 'SISTEMA', color: 'bg-gray-100 text-gray-600 border-gray-200', icon: HiCog }
}

export function AuditTimelineItem({ log }: { log: AuditLog }) {
  const [expanded, setExpanded] = useState(false)
  
  // Default config if action is unknown
  let config = ACTION_CONFIG[log.action] ?? { 
    color: 'bg-gray-100 text-gray-600 border-gray-200', 
    icon: HiPencil, 
    label: log.action 
  }

  // Overrides específicos por entidad
  if (log.entity === 'Pedidos') {
    if (log.action === 'CREATE') {
      config = { 
        color: 'bg-emerald-100 text-emerald-700 border-emerald-200', 
        icon: HiShoppingCart, 
        label: 'NUEVA ORDEN' 
      }
    } else if (log.action === 'UPDATE' && log.field === 'estado') {
      config = {
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        icon: HiPencil,
        label: 'CAMBIO ESTADO'
      }
    }
  }

  const Icon = config.icon
  const resourceInfo = getResourceCategory(log.entity)
  const ResourceIcon = resourceInfo.icon
  
  const dateStr = new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(new Date(log.createdAt))

  const hasChanges = log.oldValue || log.newValue
  const isSystem = !log.user

  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Bullet Point */}
      <div className={`
        absolute -left-[9px] top-0 
        w-5 h-5 rounded-full border-2 border-white shadow-sm
        flex items-center justify-center z-10
        ${config.color.split(' ')[0]} ${config.color.split(' ')[1]}
      `}>
        <Icon className="w-3 h-3" />
      </div>

      {/* Línea vertical conectora */}
      <div className="absolute left-0 top-5 bottom-0 w-0.5 bg-gray-100 -ml-[0.5px] last:hidden" />

      {/* Card Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 transition hover:shadow-md hover:border-indigo-200 group">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
          <div className="space-y-2">
            
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Badge Acción */}
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider border ${config.color}`}>
                {config.label}
              </span>

              {/* Badge Recurso */}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider border ${resourceInfo.color}`}>
                <ResourceIcon className="w-3 h-3" />
                {resourceInfo.label}
              </span>

              {/* Badge Origen */}
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${isSystem ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-sky-50 text-sky-700 border-sky-200'}`}>
                {isSystem ? <HiCog className="w-3 h-3" /> : <HiUser className="w-3 h-3" />}
                {isSystem ? 'AUTO' : 'WEB'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-gray-900">
                {log.entity} <span className="text-gray-400 font-normal">#{log.entityId}</span>
              </span>
            </div>
          </div>

          <time className="text-xs text-gray-400 whitespace-nowrap bg-gray-50 px-2 py-1 rounded border border-gray-100 font-mono" title={log.createdAt.toString()}>
            {dateStr}
          </time>
        </div>

        <div className="text-sm text-gray-600 mb-3 flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold">
            {(log.user || 'S').charAt(0).toUpperCase()}
          </div>
          <span className="font-medium text-gray-900">{log.user || 'Sistema'}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500">{log.field ? `Modificó campo: ${log.field}` : 'Registro de actividad'}</span>
        </div>

        {hasChanges && (
          <div className="mt-3 border-t border-gray-100 pt-3">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800 transition select-none group-hover:underline"
            >
              {expanded ? <HiChevronUp className="mr-1 w-4 h-4" /> : <HiChevronDown className="mr-1 w-4 h-4" />}
              {expanded ? 'Ocultar detalles técnicos' : 'Ver detalles del cambio'}
            </button>

            {expanded && (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                {log.oldValue && (
                  <div className="bg-red-50/50 rounded-lg border border-red-100 overflow-hidden">
                    <div className="px-3 py-1.5 bg-red-100/50 border-b border-red-100 text-red-700 text-xs font-bold uppercase flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400"></span>
                      Valor Anterior
                    </div>
                    <div className="p-3 overflow-x-auto">
                      <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap break-words">{log.oldValue}</pre>
                    </div>
                  </div>
                )}
                {log.newValue && (
                  <div className="bg-green-50/50 rounded-lg border border-green-100 overflow-hidden">
                    <div className="px-3 py-1.5 bg-green-100/50 border-b border-green-100 text-green-700 text-xs font-bold uppercase flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      Nuevo Valor
                    </div>
                    <div className="p-3 overflow-x-auto">
                      <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap break-words">{log.newValue}</pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

