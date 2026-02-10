// scripts/db-check.cjs
/**
 * Prisma 7 + MySQL (Driver Adapters) DB check
 *
 * - CommonJS (porque no tenés "type": "module")
 * - Loguea causa real (cause) y props no-enumerables
 * - Soporta Prisma Client generado con output custom (../generated/prisma/client)
 *   y también el default (@prisma/client) si existe.
 */

const util = require("node:util");
const path = require("node:path");

function dumpError(err) {
  console.error("=== Prisma DB CHECK ERROR ===");

  try {
    console.error("name:", err?.name);
    console.error("message:", err?.message);
    console.error("code:", err?.code);
    console.error("clientVersion:", err?.clientVersion);
    console.error("digest:", err?.digest);

    // cause puede venir como string, Error u objeto
    const causeMsg =
      err?.cause?.message
        ? err.cause.message
        : err?.cause
          ? String(err.cause)
          : undefined;

    if (causeMsg) console.error("cause:", causeMsg);

    // props no-enumerables (muy útil en errores del adapter)
    const props = err && typeof err === "object" ? Object.getOwnPropertyNames(err) : [];
    if (props.length) {
      console.error("ownProps:", props);
      const picked = {};
      for (const k of props) picked[k] = err[k];
      console.error("ownProps values:", util.inspect(picked, { depth: 10, colors: false }));
    }
  } catch (metaErr) {
    console.error("Error while extracting error metadata:", metaErr);
  }

  // Dump completo
  console.error("full:", util.inspect(err, { depth: 15, colors: false }));

  // Dump del cause anidado (si es objeto)
  if (err?.cause && typeof err.cause === "object") {
    console.error("nested cause full:", util.inspect(err.cause, { depth: 15, colors: false }));
  }

  console.error("=== END ERROR ===");
}

function loadPrismaClientCtor() {
  // 1) Usar siempre el default client (@prisma/client)
  // eslint-disable-next-line global-require
  const mod = require("@prisma/client");
  if (!mod?.PrismaClient) {
    throw new Error("PrismaClient not found. Did you run `prisma generate`?");
  }
  return mod.PrismaClient;
}

async function main() {
  let PrismaClient;
  try {
    PrismaClient = loadPrismaClientCtor();
  } catch (e) {
    // Este es el error que vos viste: ".prisma/client/default" no existe
    dumpError(e);
    process.exit(1);
  }

  let PrismaMariaDb;
  try {
    // eslint-disable-next-line global-require
    ({ PrismaMariaDb } = require("@prisma/adapter-mariadb"));
  } catch (e) {
    console.error("Missing dependency: @prisma/adapter-mariadb");
    dumpError(e);
    process.exit(1);
  }

  const raw = process.env.DATABASE_URL;
  if (!raw) {
    console.error("DATABASE_URL missing");
    process.exit(1);
  }

  let url;
  try {
    url = new URL(raw);
  } catch (e) {
    console.error("DATABASE_URL is not a valid URL:", raw);
    dumpError(e);
    process.exit(1);
  }

  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username || ""),
    password: decodeURIComponent(url.password || ""),
    database: url.pathname.replace(/^\//, ""),
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || "2"),
  });

  const prisma = new PrismaClient({
    adapter,
    log: ["error"],
  });

  try {
    // Query simple y barato
    await prisma.$queryRaw`SELECT 1`;
    console.log("Prisma DB OK");
    process.exit(0);
  } catch (e) {
    dumpError(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect().catch(() => {});
  }
}

main().catch((e) => {
  dumpError(e);
  process.exit(1);
});
