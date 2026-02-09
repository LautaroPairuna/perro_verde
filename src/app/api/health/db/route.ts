export const runtime = "nodejs";

import { NextResponse } from "next/server";
import {prisma} from "../../../../lib/prisma";
import util from "node:util";

export async function GET() {
  const t0 = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, ms: Date.now() - t0 });
  } catch (e) {
    // Esto es lo que te va a mostrar el "cause" real del driver adapter
    const debug = util.inspect(e, { depth: 10 });
    console.error("DB HEALTHCHECK ERROR:", debug);

    return NextResponse.json(
      { ok: false, ms: Date.now() - t0, error: String((e as any)?.message ?? e) },
      { status: 500 }
    );
  }
}
