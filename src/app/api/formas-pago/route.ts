// src/app/api/formas-pago/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const formas = await prisma.cfgFormasPagos.findMany({
      where: { activo: true },
      orderBy: { id: 'asc' },
      select: {
        id: true,
        forma_pago: true,
        descripcion: true,
        permite_cuotas: true,
        activo: true,
      },
    });
    return NextResponse.json(formas, { status: 200 });
  } catch (error) {
    console.error('Error al leer formas de pago:', error);
    return NextResponse.json(
      { error: 'no_se_pudo_recuperar_formas' },
      { status: 500 }
    );
  }
}
