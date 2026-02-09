// scripts/db-check.cjs
const util = require("node:util");

function dumpError(err) {
  console.error("=== Prisma DB CHECK ERROR ===");
  console.error("message:", err?.message);
  console.error("name:", err?.name);
  console.error("code:", err?.code);
  console.error("clientVersion:", err?.clientVersion);
  console.error("digest:", err?.digest);

  // cause puede venir como string, Error u objeto
  const causeMsg =
    err?.cause?.message ? err.cause.message : err?.cause ? String(err.cause) : undefined;
  if (causeMsg) console.error("cause:", causeMsg);

  // Algunas veces el adapter guarda info útil en props no-enumerables
  try {
    const props = Object.getOwnPropertyNames(err || {});
    console.error("ownProps:", props);

    const picked = {};
    for (const k of props) picked[k] = err[k];
    console.error("ownProps values:", util.inspect(picked, { depth: 10, colors: false }));
  } catch {}

  // Dump completo
  console.error("full:", util.inspect(err, { depth: 15, colors: false }));

  // Si hay error anidado
  if (err?.cause && typeof err.cause === "object") {
    console.error("nested cause full:", util.inspect(err.cause, { depth: 15, colors: false }));
  }

  console.error("=== END ERROR ===");
}

async function main() {
  const { PrismaClient } = require("@prisma/client");
  const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

  const raw = process.env.DATABASE_URL;
  if (!raw) {
    console.error("DATABASE_URL missing");
    process.exit(1);
  }

  const url = new URL(raw);

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
