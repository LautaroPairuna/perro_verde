// src/app/api/mp/preferences/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!, // tu token privado
});

export async function POST(request: NextRequest) {
  try {
    const { amount } = (await request.json()) as { amount: number };

    // Cliente de preferencias
    const preferenceService = new Preference(mpClient);

    // Creamos la preferencia
    const { id: preferenceId } = await preferenceService.create({
      body: {
        items: [
          {
            id: `pv-${Date.now()}`,       // id obligatorio por ítem
            title: 'Compra Perro Verde',
            quantity: 1,
            currency_id: 'ARS',
            unit_price: amount,
          },
        ],
      },
    });

    return NextResponse.json({ preferenceId });
  } catch (error) {
    console.error('Error creando preferencia MP:', error);
    return NextResponse.json(
      { error: 'Error creando preferencia de pago' },
      { status: 500 }
    );
  }
}
