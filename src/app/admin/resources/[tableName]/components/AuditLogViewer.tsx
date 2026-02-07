'use client'

import React from 'react'
import { HiUser, HiClock, HiPlus, HiPencil, HiTrash, HiArrowRight } from 'react-icons/hi'

interface AuditLog {
  id: number
  entity: string
  entityId: string
  action: string
  field?: string
  oldValue?: string | null
  newValue?: string | null
  user?: string | null
  ip?: string | null
  createdAt: string | Date
}

export default function AuditLogViewer({ data }: { data: AuditLog[] }) {
  if (!data.length) {
    return (
      <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-xl">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <HiClock className="h-full w-full" />
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No hay registros</h3>
        <p className="mt-1 text-sm text-gray-500">No se encontraron eventos de auditoría.</p>
      </div>
    )
  }

  return (
    <div className="relative border-l border-gray-200 ml-3 space-y-6">
      {data.map((log) => {
        const isCreate = log.action === 'CREATE'
        const isDelete = log.action === 'DELETE'
        const isUpdate = log.action === 'UPDATE'

        const dateObj = new Date(log.createdAt)
        const dateStr = new Intl.DateTimeFormat('es-AR', {
          day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        }).format(dateObj)

        return (
          <div key={log.id} className="ml-6 relative group">
            <span className={`
              absolute -left-9 top-1 h-6 w-6 rounded-full ring-4 ring-white flex items-center justify-center
              ${isCreate ? 'bg-green-100 text-green-600' : ''}
              ${isDelete ? 'bg-red-100 text-red-600' : ''}
              ${isUpdate ? 'bg-blue-100 text-blue-600' : ''}
            `}>
              {isCreate && <HiPlus className="w-4 h-4" />}
              {isDelete && <HiTrash className="w-4 h-4" />}
              {isUpdate && <HiPencil className="w-4 h-4" />}
            </span>

            <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{log.user || 'Sistema'}</span>
                    <span className="text-gray-500 text-sm">
                      {isCreate ? 'creó' : isDelete ? 'eliminó' : 'modificó'}
                    </span>
                    <span className="font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs">
                      {log.entity} #{log.entityId}
                    </span>
                  </div>
                </div>
                <time className="text-xs text-gray-400 flex items-center whitespace-nowrap">
                  <HiClock className="w-3 h-3 mr-1" />
                  {dateStr}
                </time>
              </div>

              {isUpdate && log.field && (
                <div className="mt-3 bg-gray-50 rounded p-3 text-sm border border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1 uppercase tracking-wide">
                    <span>{log.field}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-red-50 text-red-700 px-2 py-1 rounded line-through opacity-70 break-all">
                      {formatValue(log.oldValue)}
                    </div>
                    <HiArrowRight className="text-gray-400 flex-shrink-0" />
                    <div className="flex-1 bg-green-50 text-green-700 px-2 py-1 rounded font-medium break-all">
                      {formatValue(log.newValue)}
                    </div>
                  </div>
                </div>
              )}
              
              {!isUpdate && (
                <div className="mt-2 text-xs text-gray-400 font-mono flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${log.user ? 'bg-blue-400' : 'bg-gray-400'}`}></span>
                  {log.user ? 'Web User' : 'Sistema'}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function formatValue(val: string | null | undefined) {
  if (val === null || val === undefined) return 'null'
  if (val === '') return '""'
  return val
}
