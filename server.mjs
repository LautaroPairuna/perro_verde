// perro_verde/server.js
import express                         from 'express'
import next                            from 'next'
import { createProxyMiddleware }      from 'http-proxy-middleware'

const dev    = process.env.NODE_ENV !== 'production'
const app    = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // 1) Proxy de /admin → tu AdminJS públicamente desplegado
  server.use(
    '/admin',
    createProxyMiddleware({
      target: 'https://perro-verde-administracion.aslxla.easypanel.host', 
      changeOrigin: true,
      secure: true,      // usa false sólo si tienes problemas con TLS
      pathRewrite: {},   // dejamos /admin intacto porque AdminJS monta en /admin
    })
  )

  // 2) Next.js para todo lo demás
  server.all('*', (req, res) => handle(req, res))

  const port = parseInt(process.env.PORT, 10) || 3000
  server.listen(port, () => {
    console.log(`→ Next+Proxy escuchando en http://localhost:${port}`)
    console.log(`   • Ecommerce en http://localhost:${port}/`)
    console.log(`   • AdminJS proxyado en http://localhost:${port}/admin`)
  })
})
