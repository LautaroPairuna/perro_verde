// server.mjs  (o server.js si en package.json pones "type": "module")
import express                        from 'express'
import next                           from 'next'
import { createProxyMiddleware }     from 'http-proxy-middleware'

const dev    = process.env.NODE_ENV !== 'production'
const app    = next({ dev })
const handle = app.getRequestHandler()

// Tu URL pública de AdminJS
const ADMIN_URL = 'https://perro-verde-administracion.aslxla.easypanel.host'

app.prepare().then(() => {
  const server = express()

  // Montamos el proxy en la ruta INTERNA "/admin"
  // y SOLO dentro de target ponemos la URL remota
  server.use(
    '/admin',
    createProxyMiddleware({
      target: ADMIN_URL,
      changeOrigin: true,
      secure: true,    // o false si tu certificado es self-signed
      pathRewrite: {}, // dejamos /admin tal cual
    })
  )

  // Todo lo demás lo deja Next.js
  server.all('*', (req, res) => handle(req, res))

  const port = parseInt(process.env.PORT, 10) || 3000
  server.listen(port, () => {
    console.log(`Next+Proxy corriendo en http://localhost:${port}`)
    console.log(`• Ecommerce: http://localhost:${port}/`)
    console.log(`• AdminJS:   http://localhost:${port}/admin`)
  })
})
