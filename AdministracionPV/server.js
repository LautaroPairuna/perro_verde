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

/* ────────── Utils ────────── */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
;['ADMIN_EMAIL','ADMIN_PASSWORD','COOKIE_SECRET'].forEach(key => {
  if (!process.env[key]) {
    console.error(`❌ Missing env var ${key}`)
    process.exit(1)
  }
})
const {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  COOKIE_SECRET,
  NODE_ENV = 'development'
} = process.env

/* ────────── Prisma & AdminJS Setup ────────── */
const prisma = new PrismaClient({
  log: NODE_ENV === 'development' ? ['error','warn'] : ['error']
})
AdminJS.registerAdapter({ Database, Resource })

const loader = new ComponentLoader()
const REDIRECT_DASHBOARD = loader.add(
  'RedirectDashboard',
  path.resolve(__dirname, 'components', 'RedirectDashboard.jsx')
)
const CHILD_LINK = loader.add(
  'ChildLink',
  path.resolve(__dirname, 'components', 'ChildLink.jsx')
)
const JSON_VIEWER = loader.add(
  'JsonViewer',
  path.resolve(__dirname, 'components', 'JsonViewer.jsx')
)
const ACTIONS_COLUMN = loader.add(
  'ActionsColumn',
  path.resolve(__dirname, 'components', 'ActionsColumn.jsx')
)

/* ────────── Helpers ────────── */
const projectRoot = path.resolve(process.cwd(), '..')
const bucketBase = path.join(projectRoot, 'public', 'images')
const ensureDir = dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive:true }) }
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

/* ────────── Resource Factory with Upload ────────── */
function resourceWithUpload({ modelName, folder, titleField }) {
  const dir = path.join(bucketBase, folder)
  const thumbsDir = path.join(dir, 'thumbs')
  ensureDir(dir); ensureDir(thumbsDir)

  const dmmfModel = PrismaModule.Prisma.dmmf.datamodel.models.find(m => m.name === modelName)
  const scalarFields = dmmfModel.fields.filter(f => f.kind === 'scalar').map(f => f.name)

  const listProps = [...scalarFields]
  const properties = {
    [titleField]: { isTitle:true },
    foto: { isVisible:{ list:true, show:true, edit:false, new:false } },
    uploadedFile: { isVisible:{ list:false, show:false, edit:true, new:true } },
    thumbs: { isVisible:{ list:true, show:true, edit:false, new:false } }
  }

  let actions = {}
  if (modelName === 'Productos') {
    listProps.push('photosCount','versionsCount','specsCount')
    properties.photosCount = {
      components: { list: CHILD_LINK },
      isVisible: { list:true, show:true, edit:false, new:false },
      label: 'Fotos'
    }
    properties.versionsCount = {
      components: { list: CHILD_LINK },
      isVisible: { list:true, show:true, edit:false, new:false },
      label: 'Versiones'
    }
    properties.specsCount = {
      components: { list: CHILD_LINK },
      isVisible: { list:true, show:true, edit:false, new:false },
      label: 'Especificaciones'
    }
    actions.list = {
      after: async response => {
        await Promise.all(response.records.map(async record => {
          const id = record.params.id
          record.params.photosCount = await prisma.productoFotos.count({ where:{ producto_id:id } })
          record.params.versionsCount = await prisma.productoVersiones.count({ where:{ producto_id:id } })
          record.params.specsCount = await prisma.productoEspecificaciones.count({ where:{ producto_id:id } })
        }))
        return response
      }
    }
  }

  listProps.push('actionsColumn')
  properties.actionsColumn = { ...actionsProperty }

  return {
    resource: { model:getModelByName(modelName, PrismaModule), client:prisma },
    options: {
      listProperties: listProps,
      navigation: ['ProductoFotos','ProductoVersiones','ProductoEspecificaciones'].includes(modelName) ? false : undefined,
      properties,
      actions
    },
    features: [
      uploadFeature({
        componentLoader: loader,
        provider: new CrossDriveProvider({ bucket: dir, baseUrl: `/images/${folder}` }),
        properties: { key:'foto', file:'uploadedFile' },
        validation: { mimeTypes:['image/png','image/jpeg','image/webp'] },
        uploadPath: (rec, fn) => {
          const raw = rec?.params?.[titleField] || path.parse(fn).name
          const base = slugify(raw, { lower:true, strict:true })
          const ext = path.extname(fn).toLowerCase() || '.jpg'
          return rec?.params?.foto ? `${base}-${timestampAR()}${ext}` : `${base}${ext}`
        },
        hooks: {
          before: async (req, ctx) => {
            if (req.method==='post' && req.payload?.uploadedFile) {
              const { record, uploadOptions } = ctx
              if (record?.params?.foto) await uploadOptions.provider.delete(record.params.foto, dir)
            }
            return req
          },
          after: async (res, _req, ctx) => {
            const { record, resource } = ctx
            if (!record?.isValid() || !record.params.foto) return res
            const inPath = path.join(dir, record.params.foto)
            const thumbName = `thumb_${path.basename(record.params.foto)}`
            const outPath = path.join(thumbsDir, thumbName)
            try {
              await sharp(inPath).resize({ width:400 }).toFile(outPath)
              await resource.update({ id:record.params.id, data:{ thumbs: thumbName } })
            } catch(e) {
              console.error('Thumbnail error', e)
            }
            return res
          }
        }
      })
    ]
  }
}

/* ────────── Static Resource Helper ────────── */
function staticResource(modelName, opts={}) {
  const dmmfModel = PrismaModule.Prisma.dmmf.datamodel.models.find(m => m.name === modelName)
  const allFields = dmmfModel.fields.filter(f => f.kind === 'scalar').map(f => f.name)
  const listProperties = [...allFields, 'actionsColumn']
  const properties = { actionsColumn: { ...actionsProperty } }
  return { resource:{ model:getModelByName(modelName, PrismaModule), client:prisma }, options:{ ...opts, listProperties, properties } }
}

/* ────────── Define resources ────────── */
const resources = [
  resourceWithUpload({ modelName:'CfgMarcas', folder:'marcas', titleField:'marca' }),
  resourceWithUpload({ modelName:'CfgRubros', folder:'rubros', titleField:'rubro' }),
  resourceWithUpload({ modelName:'CfgSlider', folder:'slider', titleField:'titulo' }),
  resourceWithUpload({ modelName:'Productos', folder:'productos', titleField:'producto' }),
  resourceWithUpload({ modelName:'ProductoFotos', folder:'productos/fotos', titleField:'epigrafe' }),
  resourceWithUpload({ modelName:'ProductoVersiones', folder:'productos/versiones', titleField:'version' }),
  resourceWithUpload({ modelName:'ProductoEspecificaciones', folder:'productos/specs', titleField:'categoria' }),
  staticResource('CfgFormasPagos', { navigation:false }),
  staticResource('CfgMonedas',     { navigation:false }),
  {
    resource: { model:getModelByName('Pedidos',PrismaModule), client:prisma },
    options: {
      navigation:'Ventas',
      listProperties: PrismaModule.Prisma.dmmf.datamodel.models
        .find(m => m.name==='Pedidos')
        .fields.filter(f => f.kind==='scalar').map(f => f.name)
        .concat(['actionsColumn']),
      properties: {
        datos:      { type:'mixed', isVisible:{ list:true, show:true, edit:false,new:false }, components:{ list:JSON_VIEWER, show:JSON_VIEWER } },
        mp_response:{ type:'mixed', isVisible:{ list:false, show:true, edit:false,new:false }, components:{ show:JSON_VIEWER } },
        actionsColumn:{ ...actionsProperty }
      },
      actions: {
        list:{ after: async response => {
          await Promise.all(response.records.map(async record => {
            const row = await prisma.pedidos.findUnique({ where:{ id: record.params.id }, select:{ datos:true, mp_response:true } })
            record.params.datos = row?.datos ?? null
            record.params.mp_response = row?.mp_response ?? null
          }))
          return response
        }}},
      showProperties:['id','datos','mp_response','total','estado','metodo_pago','comprador_nombre','comprador_email','comprador_telefono','direccion_envio','createdAt','updatedAt']
    }
  },
  staticResource('Session')
]

/* ────────── AdminJS & Server ────────── */
const app = express()

// Servir carpetas de imágenes y CSS personalizado
app.use(
  '/images',
  express.static(path.join(projectRoot, 'public', 'images'))
)
app.use(
  '/admin-custom.css',
  express.static(path.join(__dirname, 'public', 'admin-custom.css'))
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
    translations: {
      resources: {
        Productos: {
          properties: {
            photosCount: 'Fotos',
            versionsCount: 'Versiones',
            specsCount: 'Especificaciones',
            actionsColumn: 'Acciones',
          }
        }
      }
    }
  }
})

// Inicialización siempre
await adminJs.initialize()

// Sesiones con Prisma
const store = new PrismaSessionStore(prisma, { checkPeriod: 120_000 })
app.use(session({
  secret: COOKIE_SECRET,
  store,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: NODE_ENV === 'production' }
}))

// Router autenticado montado en /admin
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
  { store, resave: false, saveUninitialized: false }
)
app.use(adminJs.options.rootPath, router)

// Manejo de errores
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).send('internal-error')
})

// Desconectar Prisma y cerrar servidor limpio
process.on('unhandledRejection', r => console.error('Rejection:', r))
process.on('uncaughtException', e => console.error('Exception:', e))

// Arranque con el puerto inyectado
const port = parseInt(process.env.PORT, 10) || 8080
app.listen(port, () =>
  console.log(`AdminJS → http://localhost:${port}${adminJs.options.rootPath}`)
)

process.on('SIGINT', async() => { await prisma.$disconnect(); process.exit(0) })
process.on('SIGTERM', async() => { await prisma.$disconnect(); process.exit(0) })
