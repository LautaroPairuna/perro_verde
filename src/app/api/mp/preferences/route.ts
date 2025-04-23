// src/app/api/mp/preferences/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,  // tu token privado
});

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    // Creamos el servicio de preferencias
    const preferenceService = new Preference(mpClient);

    // Generamos la preferencia incluyendo el campo `id` en cada ítem
    const response = await preferenceService.create({
      body: {
        items: [
          {
            id: 'prod-1',                           // obligatorio según Items :contentReference[oaicite:0]{index=0}
            title: 'Compra Perro Verde',
            quantity: 1,
            currency_id: 'ARS',
            unit_price: amount,
          },
        ],
      },
    });

    // Extraemos el ID de la preferencia directamente (no via `body`) :contentReference[oaicite:1]{index=1}
    const preferenceId = response.id!;

    return NextResponse.json({ preferenceId });
  } catch (error) {
    console.error('MP Preference Error:', error);
    return NextResponse.json(
      { error: 'Error creando preferencia de pago' },
      { status: 500 }
    );
  }
}
