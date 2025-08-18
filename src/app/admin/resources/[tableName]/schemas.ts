import { z } from 'zod'

/** Coerciones y normalizaciones */
const zBool = z.union([z.boolean(), z.string()]).transform(v => {
  if (typeof v === 'boolean') return v
  const s = v.trim().toLowerCase()
  return s === 'true' || s === '1' || s === 'on' || s === 'yes'
})

const zInt = z.coerce.number().int().finite(); // entero y finito

/** Cfg* */
export const CfgMarcasSchema = z.object({
  id: zInt.optional(),
  marca: z.string().min(1),
  keywords: z.string().optional().nullable(),
  foto: z.string().optional().nullable(),
  activo: zBool.default(true),
}).strict()

export const CfgRubrosSchema = z.object({
  id: zInt.optional(),
  rubro: z.string().min(1),
  condiciones: z.string().optional().nullable(),
  keywords: z.string().optional().nullable(),
  foto: z.string().optional().nullable(),
  activo: zBool.default(true),
}).strict()

export const CfgFormasPagosSchema = z.object({
  id: zInt.optional(),
  forma_pago: z.string().min(1),
  descripcion: z.string().optional().nullable(),
  permite_cuotas: zBool.default(false),
  activo: zBool.default(true),
}).strict()

export const CfgMonedasSchema = z.object({
  id: zInt.optional(),
  moneda: z.string().min(1),
  moneda_des: z.string().min(1),
  activo: zBool.default(true),
}).strict()

export const CfgSliderSchema = z.object({
  id: zInt.optional(),
  titulo: z.string().min(1),
  thumbs: z.string().optional().nullable(),
  foto: z.string().optional().nullable(),
  orden: zInt.optional(),
  activo: zBool.default(true),
}).strict()

/** Productos + hijas */
export const ProductosSchema = z.object({
  id: zInt.optional(),
  marca_id: zInt,
  rubro_id: zInt,
  moneda_id: zInt,
  producto: z.string().min(2),
  descripcion: z.string().optional().nullable(),
  foto: z.string().optional().nullable(),
  precio: zInt.nonnegative().default(0),
  stock: zInt.nonnegative().default(0),
  destacado: zBool.default(false),
  activo: zBool.default(true),
  visitas: zInt.optional(),
}).strict()

export const ProductoFotosSchema = z.object({
  id: zInt.optional(),
  producto_id: zInt,
  epigrafe: z.string().optional().nullable(),
  foto: z.string().min(1),
  orden: zInt.optional(),
  activo: zBool.default(true),
}).strict()

export const ProductoVersionesSchema = z.object({
  id: zInt.optional(),
  producto_id: zInt,
  version: z.string().min(1),
  detalle: z.string().optional().nullable(),
  orden: zInt.optional(),
  activo: zBool.default(true),
}).strict()

export const ProductoEspecificacionesSchema = z.object({
  id: zInt.optional(),
  producto_id: zInt,
  categoria: z.string().min(1),
  especificaciones: z.string().optional().nullable(),
  orden: zInt.optional(),
  activo: zBool.default(true),
}).strict()

/** Mapa de schemas por recurso (OJO: AnyZodObject para habilitar omit/partial) */
export const schemaByResource: Record<string, z.AnyZodObject> = {
  CfgMarcas: CfgMarcasSchema,
  CfgRubros: CfgRubrosSchema,
  CfgFormasPagos: CfgFormasPagosSchema,
  CfgMonedas: CfgMonedasSchema,
  CfgSlider: CfgSliderSchema,
  Productos: ProductosSchema,
  ProductoFotos: ProductoFotosSchema,
  ProductoVersiones: ProductoVersionesSchema,
  ProductoEspecificaciones: ProductoEspecificacionesSchema,
}

/** Campos texto usados en búsqueda global (server-side) */
export const searchStringFieldsByResource: Record<string, string[]> = {
  CfgMarcas: ['marca', 'keywords'],
  CfgRubros: ['rubro', 'condiciones', 'keywords'],
  CfgFormasPagos: ['forma_pago', 'descripcion'],
  CfgMonedas: ['moneda', 'moneda_des'],
  CfgSlider: ['titulo'],
  Productos: ['producto', 'descripcion'],
  ProductoFotos: ['epigrafe', 'foto'],
  ProductoVersiones: ['version', 'detalle'],
  ProductoEspecificaciones: ['categoria', 'especificaciones'],
}
