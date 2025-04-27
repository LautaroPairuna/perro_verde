// perro_verde/server.js
import express from 'express'
import next    from 'next'
import { createProxyMiddleware } from 'http-proxy-middleware'

const dev    = process.env.NODE_ENV !== 'production'
const app    = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Proxy: todas las peticiones a /AdministracionPV/**
  // van al servicio interno que corre AdminJS en el puerto 8080
  server.use(
    '/AdministracionPV',
    createProxyMiddleware({
      target: 'http://administracion:8080',
      changeOrigin: true,
      pathRewrite: {},  // mantenemos el path tal cual, AdminJS monta en /AdministracionPV
    })
  )

  // Next.js para todo lo demás
  server.all('*', (req, res) => handle(req, res))

  const port = parseInt(process.env.PORT, 10) || 3000
  server.listen(port, () => {
    console.log(`> Next+Proxy escuchando en http://localhost:${port}`)
  })
})
