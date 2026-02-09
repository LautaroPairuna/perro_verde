import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  engine: "classic",
  schema: 'prisma/schema.prisma',
  migrations:{
    seed: './prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
