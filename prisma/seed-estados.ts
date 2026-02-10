
import 'dotenv/config'
import { prisma } from '../src/lib/prisma-client'

async function main() {
  const estados = [
    { id: 'pendiente', descripcion: 'Pendiente de pago/confirmación', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', orden: 1, es_final: false },
    { id: 'approved', descripcion: 'Pago aprobado', color: 'bg-green-100 text-green-800 border-green-200', orden: 2, es_final: false },
    { id: 'pagado', descripcion: 'Pagado (Manual/Otro)', color: 'bg-green-100 text-green-800 border-green-200', orden: 2, es_final: false },
    { id: 'enviado', descripcion: 'Enviado al cliente', color: 'bg-blue-100 text-blue-800 border-blue-200', orden: 3, es_final: false },
    { id: 'entregado', descripcion: 'Entregado y finalizado', color: 'bg-purple-100 text-purple-800 border-purple-200', orden: 4, es_final: true },
    { id: 'rejected', descripcion: 'Pago rechazado', color: 'bg-red-100 text-red-800 border-red-200', orden: 90, es_final: true, es_cancel: true },
    { id: 'cancelado', descripcion: 'Cancelado manualmente', color: 'bg-red-100 text-red-800 border-red-200', orden: 99, es_final: true, es_cancel: true },
  ]

  console.log('Seeding estados...')
  for (const est of estados) {
    await prisma.cfgEstadoPedido.upsert({
      where: { id: est.id },
      update: est,
      create: est,
    })
  }
  console.log('Estados insertados correctamente.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
