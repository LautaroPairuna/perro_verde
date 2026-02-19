/**
 * Función centralizada para obtener la URL de la base de datos.
 * Útil si necesitas lógica dinámica, rotación de secrets,
 * o simplemente para no hardcodear process.env.DATABASE_URL en todos lados.
 */
export const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL no está definida en las variables de entorno");
  }
  return url;
};

/**
 * Configuración base para instanciar PrismaClient
 */
export const prismaConfig = {
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
  log: (process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]) as any,
};
