// src/app/api/webhooks/mercadopago/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const event = await request.json()

    if (event.type === 'payment') {
      const paymentId = String(event.data.id)

      // Llamada directa a la API de MercadoPago
      const mpRes = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          },
        }
      )
      if (!mpRes.ok) throw new Error('Error al consultar MP')

      const payment = await mpRes.json()
      const status  = payment.status

      // Actualizar todos los pedidos que tengan ese mp_payment_id
      await prisma.pedidos.updateMany({
        where: { mp_payment_id: paymentId },
        data:  { estado: status },
      })
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'webhook_failed' }, { status: 500 })
  }
}
