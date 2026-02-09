import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import util from "node:util";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function serializeError(err: unknown) {
  // Evita perder propiedades no enumerables (como cause)
  const anyErr = err as any;

  const message =
    anyErr?.message ? String(anyErr.message) : typeof err === "string" ? err : "Unknown error";

  const name = anyErr?.name ? String(anyErr.name) : "Error";

  // Prisma/adapter a veces trae cause como string u objeto
  const cause =
    anyErr?.cause?.message
      ? String(anyErr.cause.message)
      : anyErr?.cause
        ? String(anyErr.cause)
        : undefined;

  // Para debug en logs: inspección profunda
  const debug = util.inspect(err, { depth: 10, colors: false });

  // Y por si hay props no enumerables:
  const props = anyErr && typeof anyErr === "object"
    ? Object.getOwnPropertyNames(anyErr)
    : [];

  return { name, message, cause, debug, props };
}

export async function GET() {
  const t0 = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      {
        status: "ok",
        database: "connected",
        ms: Date.now() - t0,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    const info = serializeError(error);

    // Logs del servidor (estos son los que nos interesan)
    console.error("Health Check Failed:", info.debug);
    console.error("Health Check Error Props:", info.props);
    if (info.cause) console.error("Health Check Cause:", info.cause);

    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        ms: Date.now() - t0,
        error: info.message,
        // Devolvemos cause si existe (útil), pero sin debug completo al cliente
        cause: info.cause,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
