import { prisma } from '@/lib/prisma'
import { AuditTimelineItem } from './components/AuditTimelineItem'
import { HiClipboardList } from 'react-icons/hi'

export const dynamic = 'force-dynamic'

export default async function AuditPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center space-x-3 border-b border-indigo-100 pb-4 mb-8">
        <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600 shadow-sm">
          <HiClipboardList className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Auditoría del Sistema</h1>
          <p className="text-sm text-gray-500">
            Registro cronológico de las últimas 100 actividades en la plataforma.
          </p>
        </div>
      </div>

      <div className="relative border-l-2 border-indigo-100 ml-4 space-y-8 py-2 pb-12">
        {logs.map((log) => (
          <AuditTimelineItem key={log.id} log={log} />
        ))}
        
        {logs.length === 0 && (
          <div className="pl-8 py-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300 mx-4">
            <p className="text-gray-500 italic">No hay registros de auditoría aún.</p>
          </div>
        )}

        {/* Indicador de fin de timeline si hay logs */}
        {logs.length > 0 && (
          <div className="absolute -left-[5px] bottom-0 w-3 h-3 bg-indigo-200 rounded-full border-2 border-white" />
        )}
      </div>
    </div>
  )
}
