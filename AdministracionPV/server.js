// server.js
import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import path from 'path'
import fs from 'fs'
import fsExtra from 'fs-extra'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
import sharp from 'sharp'
import slugify from 'slugify'

import AdminJS, { ComponentLoader } from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource, getModelByName } from '@adminjs/prisma'
import uploadFeature, { LocalProvider } from '@adminjs/upload'

import * as PrismaModule from '@prisma/client'
const { PrismaClient } = PrismaModule
import { PrismaSessionStore } from '@quixo3/prisma-session-store'

/* ────────── Para ESM: definir __dirname ────────── */
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

/* ────────── Env check ────────── */
;['ADMIN_EMAIL','ADMIN_PASSWORD','COOKIE_SECRET','ADMIN_HOST'].forEach(key => {
  if (!process.env[key]) {
    console.error(`❌ Missing env var ${key}`)
    process.exit(1)
  }
})
const {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  COOKIE_SECRET,
  ADMIN_HOST,
  NODE_ENV = 'development'
} = process.env

/* ────────── Prisma Client & DMMF memo ────────── */
const prisma = new PrismaClient({
  log: NODE_ENV === 'development' ? ['warn','error'] : ['error']
})
await prisma.$connect()

const dmmfModels = PrismaModule.Prisma.dmmf.datamodel.models
  .reduce((acc, m) => { acc[m.name] = m; return acc }, {})

const scalarFieldsMap = Object.fromEntries(
  Object.entries(dmmfModels).map(([modelName, m]) => [
    modelName,
    m.fields.filter(f => f.kind === 'scalar').map(f => f.name),
  ])
)

/* ────────── AdminJS Adapter & Components ────────── */
AdminJS.registerAdapter({ Database, Resource })

const loader = new ComponentLoader()
const REDIRECT_DASHBOARD = loader.add(
  'RedirectDashboard',
  path.resolve(__dirname, 'components', 'RedirectDashboard.jsx')
)
const CHILD_LINK     = loader.add('ChildLink',     path.resolve(__dirname, 'components', 'ChildLink.jsx'))
const JSON_VIEWER    = loader.add('JsonViewer',    path.resolve(__dirname, 'components', 'JsonViewer.jsx'))
const ACTIONS_COLUMN = loader.add('ActionsColumn', path.resolve(__dirname, 'components', 'ActionsColumn.jsx'))

/* ────────── Helpers & Caches ────────── */
const bucketBase  = path.join(__dirname, '..', 'public', 'images')
const createdDirs = new Set()
const ensureDir = dir => {
  if (!createdDirs.has(dir)) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    createdDirs.add(dir)
  }
}

const timestampAR = () => {
  const [date, time] = new Date()
    .toLocaleString('sv-SE', { timeZone:'America/Argentina/Salta', hour12:false })
    .split(' ')
  return `${date.replace(/-/g,'')}-${time.replace(/:/g,'')}`
}

/* ────────── Custom Storage Provider ────────── */
class CrossDriveProvider extends LocalProvider {
  async upload(file, key) {
    const dest = this.path(key)
    console.log('Uploading →', dest)
    await fsExtra.ensureDir(path.dirname(dest))
    await fsExtra.move(file.path, dest, { overwrite:true })
  }
  async delete(key, bucket) {
    await super.delete(key, bucket)
    const thumb = path.join(bucket, 'thumbs', `thumb_${path.basename(key)}`)
    if (fs.existsSync(thumb)) await fs.promises.unlink(thumb)
  }
}

/* ────────── Virtual actions property ────────── */
const actionsProperty = {
  isVisible: { list:true, filter:false, show:false, edit:false, new:false },
  components: { list: ACTIONS_COLUMN },
  label: 'Acciones',
  position: 999
}

/* ────────── Resource Factory con Upload ────────── */
function resourceWithUpload({ modelName, folder, titleField }) {
  const dir    = path.join(bucketBase, folder)
  const thumbs = path.join(dir, 'thumbs')
  ensureDir(dir); ensureDir(thumbs)

  const scalarFields = scalarFieldsMap[modelName] || []
  // Filtrar FKs que no queremos mostrar en listProperties
  const listProps = scalarFields.filter(name => {
    if (modelName === 'Productos') {
      return !['marca_id','rubro_id','moneda_id'].includes(name)
    }
    if (['ProductoFotos','ProductoVersiones','ProductoEspecificaciones'].includes(modelName)) {
      return name !== 'producto_id'
    }
    return true
  })

  const properties = {
    [titleField]: { isTitle: true },
    foto:         { isVisible:{ list:true, show:true, edit:false, new:false } },
    uploadedFile: { isVisible:{ list:false, show:false, edit:true, new:true } },
    thumbs:       { isVisible:{ list:true, show:true, edit:false, new:false } }
  }

  const features = [
    uploadFeature({
      componentLoader: loader,
      provider: new CrossDriveProvider({
        bucket: dir,
        baseUrl: `${ADMIN_HOST}/images/${folder}`
      }),
      properties: { key:'foto', file:'uploadedFile' },
      validation: { mimeTypes:['image/png','image/jpeg','image/webp'] },
      uploadPath: (rec, originalFilename) => {
        const raw  = rec?.params?.[titleField] || path.parse(originalFilename).name
        const base = slugify(raw, { lower:true, strict:true })
        const ext  = path.extname(originalFilename).toLowerCase() || '.jpg'
        return rec?.params?.foto
          ? `${base}-${timestampAR()}${ext}`
          : `${base}${ext}`
      },
      hooks: {
        before: async (req, ctx) => {
          if (req.method==='post' && req.payload?.uploadedFile && ctx.record?.params?.foto) {
            await ctx.uploadOptions.provider.delete(ctx.record.params.foto, dir)
          }
          return req
        },
        after: async (response, _req, ctx) => {
          const { record, resource } = ctx
          if (!record?.isValid() || !record.params.foto) return response

          const inPath    = path.join(dir, record.params.foto)
          const thumbName = `thumb_${path.basename(record.params.foto)}`
          const outPath   = path.join(thumbs, thumbName)
          try {
            await sharp(inPath).resize({ width:400 }).toFile(outPath)
            await resource.update({ id:record.params.id, data:{ thumbs: thumbName } })
          } catch(e) {
            console.error('Thumbnail error', e)
          }
          return response
        }
      }
    })
  ]

  let actions = {}

  if (modelName === 'Productos') {
    // Agrego contadores de hijos
    listProps.push('photosCount','versionsCount','specsCount')
    properties.photosCount   = { components:{ list:CHILD_LINK }, isVisible:{ list:true,show:true,edit:false,new:false }, label:'Fotos' }
    properties.versionsCount = { components:{ list:CHILD_LINK }, isVisible:{ list:true,show:true,edit:false,new:false }, label:'Versiones' }
    properties.specsCount    = { components:{ list:CHILD_LINK }, isVisible:{ list:true,show:true,edit:false,new:false }, label:'Especificaciones' }

    actions.list = {
      after: async response => {
        const ids = response.records.map(r => r.params.id)
        const [photos, versions, specs] = await Promise.all([
          prisma.productoFotos.groupBy({ by:['producto_id'], _count:{_all:true}, where:{ producto_id:{ in:ids } } }),
          prisma.productoVersiones.groupBy({ by:['producto_id'], _count:{_all:true}, where:{ producto_id:{ in:ids } } }),
          prisma.productoEspecificaciones.groupBy({ by:['producto_id'], _count:{_all:true}, where:{ producto_id:{ in:ids } } }),
        ])
        const toMap = arr => Object.fromEntries(arr.map(c => [c.producto_id, c._count._all]))
        const photosMap   = toMap(photos)
        const versionsMap = toMap(versions)
        const specsMap    = toMap(specs)

        response.records.forEach(rec => {
          const id = rec.params.id
          rec.params.photosCount   = photosMap[id]   || 0
          rec.params.versionsCount = versionsMap[id] || 0
          rec.params.specsCount    = specsMap[id]    || 0
        })
        return response
      }
    }
  }

  // Siempre agrego la columna de acciones
  listProps.push('actionsColumn')
  properties.actionsColumn = { ...actionsProperty }

  return {
    resource: { model: getModelByName(modelName, PrismaModule), client: prisma },
    options: {
      listProperties: listProps,
      navigation: ['ProductoFotos','ProductoVersiones','ProductoEspecificaciones'].includes(modelName) ? false : undefined,
      properties,
      actions
    },
    features
  }
}

/* ────────── Static Resource Factory ────────── */
function staticResource(modelName, opts = {}) {
  const scalarFields = scalarFieldsMap[modelName] || []
  // Oculto FKs en lista de Productos
  const listProps = scalarFields
    .filter(name => modelName === 'Productos'
      ? !['marca_id','rubro_id','moneda_id'].includes(name)
      : true
    )
  listProps.push('actionsColumn')

  return {
    resource: { model: getModelByName(modelName, PrismaModule), client: prisma },
    options: {
      ...opts,
      listProperties: listProps,
      properties: { actionsColumn: { ...actionsProperty } }
    }
  }
}

/* ────────── Definición de recursos ────────── */
const resources = [
  resourceWithUpload({ modelName:'CfgMarcas',                 folder:'marcas',            titleField:'marca' }),
  resourceWithUpload({ modelName:'CfgRubros',                 folder:'rubros',            titleField:'rubro' }),
  resourceWithUpload({ modelName:'CfgSlider',                 folder:'slider',            titleField:'titulo' }),
  resourceWithUpload({ modelName:'Productos',                 folder:'productos',         titleField:'producto' }),
  resourceWithUpload({ modelName:'ProductoFotos',             folder:'productos/fotos',   titleField:'epigrafe' }),
  resourceWithUpload({ modelName:'ProductoVersiones',         folder:'productos/versiones', titleField:'version' }),
  resourceWithUpload({ modelName:'ProductoEspecificaciones',  folder:'productos/specs',   titleField:'categoria' }),

  staticResource('CfgFormasPagos', { navigation:false }),
  staticResource('CfgMonedas',     { navigation:false }),

  {
    resource: { model: getModelByName('Pedidos', PrismaModule), client: prisma },
    options: {
      navigation: 'Ventas',
      listProperties: [ ...scalarFieldsMap['Pedidos'], 'actionsColumn' ],
      properties: {
        datos:       { type:'mixed', isVisible:{ list:true, show:true, edit:false,new:false }, components:{ list:JSON_VIEWER, show:JSON_VIEWER } },
        mp_response: { type:'mixed', isVisible:{ list:false, show:true, edit:false,new:false }, components:{ show:JSON_VIEWER } },
        actionsColumn: { ...actionsProperty }
      },
      actions: {
        list: {
          after: async response => {
            const rows = await prisma.pedidos.findMany({
              where: { id:{ in: response.records.map(r=>r.params.id) } },
              select: { id:true, datos:true, mp_response:true }
            })
            const map = Object.fromEntries(rows.map(r=>[r.id, r]))
            response.records.forEach(rec => {
              const r = map[rec.params.id]
              rec.params.datos       = r?.datos ?? null
              rec.params.mp_response = r?.mp_response ?? null
            })
            return response
          }
        }
      },
      showProperties: [
        'id','datos','mp_response','total','estado',
        'metodo_pago','comprador_nombre','comprador_email',
        'comprador_telefono','direccion_envio','createdAt','updatedAt'
      ]
    }
  },

  staticResource('Session')
]

/* ────────── Express & AdminJS Setup ────────── */
const app = express()

// Servir imágenes
const imagesPath = path.join(__dirname, '..', 'public', 'images')
console.log('⮕ Servir imágenes desde:', imagesPath)

app.use(
  '/images',
  express.static(imagesPath, { maxAge: '1d', etag: false }),
)

// Servir CSS personalizado
app.use(
  '/admin-custom.css',
  express.static(path.join(__dirname, 'public', 'admin-custom.css'), { maxAge:'1d', etag:false })
)

const adminJs = new AdminJS({
  componentLoader: loader,
  resources,
  rootPath: '/admin',
  dashboard: { component: REDIRECT_DASHBOARD },
  assets: { styles: ['/admin-custom.css'] },
  defaultTheme: 'dark',
  locale: {
    language: 'es',
    availableLanguages: ['es'],
    translations: {
      es: {
        properties: {
          photosCount:   'Fotos',
          versionsCount: 'Versiones',
          specsCount:    'Especificaciones',
          actionsColumn: 'Acciones',
        }
      }
    },
  }
})

await adminJs.initialize()

// Debug: lista todos los IDs conocidos
console.log(
  'AdminJS Resource IDs:',
  adminJs.resources.map(r => r.id())
)

// Sesiones con Prisma
const store = new PrismaSessionStore(prisma, { checkPeriod: 120_000 })
app.use(session({
  secret: COOKIE_SECRET,
  store,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly:true, sameSite:'lax', secure: NODE_ENV==='production' }
}))

// Router autenticado
const router = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async(email, pw) =>
      email === ADMIN_EMAIL && await bcrypt.compare(pw, ADMIN_PASSWORD)
        ? { email }
        : null,
    cookieName: 'adminjs',
    cookiePassword: COOKIE_SECRET
  },
  null,
  { store, resave:false, saveUninitialized:false }
)
app.use(adminJs.options.rootPath, router)

// Error handler global
app.use((err,_req,res,_next)=>{
  console.error(err)
  res.status(500).send('internal-error')
})

// Graceful shutdown
process.on('SIGINT',  async()=>{ await prisma.$disconnect(); process.exit(0) })
process.on('SIGTERM', async()=>{ await prisma.$disconnect(); process.exit(0) })

// Arranque
const port = parseInt(process.env.PORT,10) || 8080
app.listen(port, ()=>console.log(`AdminJS → http://localhost:${port}${adminJs.options.rootPath}`))
