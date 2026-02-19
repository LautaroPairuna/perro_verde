import { defineConfig } from 'prisma/config';
import "dotenv/config";

export default defineConfig({
  // Ubicación del schema
  schema: 'prisma/schema.prisma',
  
  // Configuración de migraciones y seed
  migrations: {
    seed: 'tsx prisma/seed.ts',
  },
});
