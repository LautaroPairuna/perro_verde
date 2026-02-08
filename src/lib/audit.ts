import {prisma} from '@/lib/prisma'

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE'

interface AuditParams {
  entity: string
  entityId: string | number
  action: AuditAction
  field?: string
  oldValue?: any
  newValue?: any
  user?: string | null // Email del usuario
  ip?: string | null
}

export async function logAudit({
  entity,
  entityId,
  action,
  field,
  oldValue,
  newValue,
  user,
  ip
}: AuditParams) {
  try {
    // Evitar loggear si no hubo cambios reales en updates
    if (action === 'UPDATE' && JSON.stringify(oldValue) === JSON.stringify(newValue)) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma as any).auditLog.create({
      data: {
        entity,
        entityId: String(entityId),
        action,
        field,
        oldValue: oldValue !== undefined ? JSON.stringify(oldValue) : null,
        newValue: newValue !== undefined ? JSON.stringify(newValue) : null,
        user: user || 'system',
        ip,
      }
    })
  } catch (error) {
    console.error('Error writing audit log:', error)
    // No fallamos la request principal si falla el log, pero lo reportamos
  }
}
