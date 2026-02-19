/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { schemaByResource }          from '@/app/admin/resources/[tableName]/schemas'
import {prisma}                       from '@/lib/prisma'
import { auth }                      from '@/auth'
import { logAudit }                  from '@/lib/audit'
import { ImageService }              from '@/lib/services/imageService'

const models: Record<string, any> = {
  CfgMarcas:                 prisma.cfgMarcas,
  CfgRubros:                 prisma.cfgRubros,
  CfgFormasPagos:            prisma.cfgFormasPagos,
  CfgMonedas:                prisma.cfgMonedas,
  CfgSlider:                 prisma.cfgSlider,
  Productos:                 prisma.productos,
  ProductoFotos:             prisma.productoFotos,
  ProductoVersiones:         prisma.productoVersiones,
  ProductoEspecificaciones:  prisma.productoEspecificaciones,
  Pedidos:                   prisma.pedidos,
  AuditLog:                  prisma.auditLog, 
}

// Campos booleanos
const BOOLEAN_FIELDS = ['activo', 'destacado'] as const
const FILE_FIELD     = 'foto'

function isFileLike(v: unknown): v is Blob {
  return (
    typeof v === 'object' &&
    v !== null &&
    typeof (v as Blob).arrayBuffer === 'function'
  )
}

function normalizeBooleans(obj: Record<string, unknown>) {
  for (const key of BOOLEAN_FIELDS) {
    if (key in obj) {
      const v = obj[key]
      obj[key] = v === true || v === 'true' || v === '1' || v === 1
    }
  }
}



/* ───────────────────────── GET (server-side table) ───────────────────────── */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ tableName: string }> }
) {
  const { tableName } = await context.params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const url      = new URL(req.url)
  const page     = Math.max(1, Number(url.searchParams.get('page') ?? 1))
  const pageSize = Math.max(1, Math.min(200, Number(url.searchParams.get('pageSize') ?? 10)))
  const sortBy   = url.searchParams.get('sortBy') ?? 'id'
  const sortDir  = (url.searchParams.get('sortDir') ?? 'asc') === 'desc' ? 'desc' : 'asc'
  const q        = (url.searchParams.get('q') ?? '').trim()

  // 1) Filtros: soportar JSON en ?filters= y también pares sueltos en el QS
  const CONTROL_KEYS = new Set(['page', 'pageSize', 'sortBy', 'sortDir', 'q', 'qFields', 'filters'])
  const where: Record<string, any> = {}

  // a) pares sueltos (marca_id=3&activo=true)
  for (const [k, v] of url.searchParams.entries()) {
    if (CONTROL_KEYS.has(k)) continue
    const all = url.searchParams.getAll(k)
    const norm = (s: string): string | number | boolean => {
      if (s === 'true' || s === 'false' || s === '1' || s === '0') return s === 'true' || s === '1'
      return /^\d+(\.\d+)?$/.test(s) ? Number(s) : s
    }
    if (all.length > 1) where[k] = { in: all.map(norm) }
    else if (v !== '')  where[k] = norm(v)
  }

  // b) JSON plano en ?filters={}
  const filtersRaw = url.searchParams.get('filters')
  if (filtersRaw) {
    try {
      const obj = JSON.parse(filtersRaw) as Record<string, unknown>
      for (const [k, v] of Object.entries(obj)) {
        if (v == null || v === '') continue
        if (Array.isArray(v)) where[k] = { in: v }
        else if (v === 'true' || v === 'false') where[k] = v === 'true'
        else if (typeof v === 'string' && /^\d+(\.\d+)?$/.test(v)) where[k] = Number(v)
        else where[k] = v
      }
    } catch {
      // ignore JSON malformado
    }
  }

  // 2) Búsqueda q: usar qFields si vienen; si no, default razonable por tabla
  const qFieldsParam = (url.searchParams.get('qFields') ?? '')
    .split(',').map(s => s.trim()).filter(Boolean)

  const DEFAULT_Q_FIELDS: Record<string, string[]> = {
    CfgMarcas: ['marca', 'keywords'],
    CfgRubros: ['rubro', 'condiciones', 'keywords'],
    CfgFormasPagos: ['forma_pago', 'descripcion'],
    CfgMonedas: ['moneda', 'moneda_des'],
    CfgSlider: ['titulo'],
    Productos: ['producto', 'descripcion'],
    ProductoFotos: ['epigrafe', 'foto'],
    ProductoVersiones: ['version', 'detalle'],
    ProductoEspecificaciones: ['categoria', 'especificaciones'],
    Pedidos: [
      'comprador_nombre', 'comprador_email', 'comprador_telefono',
      'direccion_envio', 'metodo_pago', 'estado'
    ],
    AuditLog: ['entity', 'entityId', 'action', 'user', 'field'],
  }

  const qFields = qFieldsParam.length
    ? qFieldsParam
    : (DEFAULT_Q_FIELDS[tableName] ?? [])

  if (q && qFields.length) {
    const like = { contains: q, mode: 'insensitive' as const }
    where.OR = qFields.map(f => ({ [f]: like }))
  }

  // 3) Orden con fallback
  let orderBy: Record<string, 'asc' | 'desc'> | undefined
  if (sortBy) orderBy = { [sortBy]: sortDir }

  const skip = (page - 1) * pageSize
  
  // Include para contadores en Productos
  let include: Record<string, any> | undefined
  if (tableName === 'Productos') {
    include = {
      _count: {
        select: {
          fotos: true,
          versiones: true,
          especificaciones: true
        }
      }
    }
  }

  try {
    const [total, rows] = await Promise.all([
      model.count({ where }),
      model.findMany({ where, orderBy, skip, take: pageSize, include }),
    ])
    return NextResponse.json({ rows, total, page, pageSize, sortBy, sortDir })
  } catch {
    try {
      const [total, rows] = await Promise.all([
        model.count({ where }),
        model.findMany({ where, orderBy: { id: sortDir }, skip, take: pageSize, include }),
      ])
      return NextResponse.json({ rows, total, page, pageSize, sortBy: 'id', sortDir })
    } catch (err) {
      console.error(err)
      return NextResponse.json({ error: 'Error al leer datos' }, { status: 500 })
    }
  }
}


/* ───────────────────────── POST (sin cambios funcionales) ───────────────────────── */
export async function POST(req: NextRequest,
  context: { params: Promise<{ tableName: string }> }
) {
  const { tableName } = await context.params
  const model = models[tableName]
  if (!model) {
    return NextResponse.json({ error: `Recurso “${tableName}” no existe` }, { status: 404 })
  }

  const ct = req.headers.get('content-type') || ''
  let data: Record<string, any> = {}
  let file: Blob | null = null

  if (ct.includes('multipart/form-data')) {
    const form = await req.formData()
    for (const [k, v] of form.entries()) {
      if (k === FILE_FIELD && isFileLike(v)) {
        file = v
      } else if (typeof v === 'string') {
        data[k] = /^\d+$/.test(v) ? Number(v) : v
      }
    }
    delete data.id
    normalizeBooleans(data)

    if (file) {
      const hint = data.titulo ?? data.producto ?? tableName
      const fileName = await ImageService.save(file, tableName, String(hint))

      data.foto = fileName
      if (tableName === 'CfgSlider') {
        data.thumbs = fileName
      }
    }
  } else {
    data = await req.json()
    delete data.id
    for (const k in data) {
      if (typeof data[k] === 'string' && /^\d+$/.test(data[k])) data[k] = Number(data[k])
    }
    normalizeBooleans(data)
  }

  try {
    const schema = schemaByResource[tableName]
    const validated = schema ? schema.parse(data) : data

    const created = await model.create({ data: validated })

    if (tableName !== 'AuditLog') {
       const session = await auth()
       await logAudit({
          entity: tableName,
          entityId: created.id,
          action: 'CREATE',
          user: session?.user?.email,
          newValue: validated
       })
    }

    return NextResponse.json(created, { status: 201 })
  } catch (e: any) {
    console.error(e)
    const msg = e?.issues?.[0]?.message ?? e?.message ?? 'Error al crear registro'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
