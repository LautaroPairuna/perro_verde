// server.mjs
import express                      from 'express'
import next                         from 'next'
import { createProxyMiddleware }   from 'http-proxy-middleware'

const dev    = process.env.NODE_ENV !== 'production'
const app    = next({ dev })
const handle = app.getRequestHandler()
const ADMIN_URL = 'https://perro-verde-administracion.aslxla.easypanel.host'

app.prepare().then(() => {
  const server = express()

  // ✅ monta el proxy en /admin,
  //    y target apunta a la URL pública de EasyPanel
  server.use(
    '/admin',
    createProxyMiddleware({
      target: ADMIN_URL,
      changeOrigin: true,
      secure: true,
    })
  )

  server.all('*', (req, res) => handle(req, res))

  server.listen(3000, () =>
    console.log('Listening on http://localhost:3000')
  )
})
