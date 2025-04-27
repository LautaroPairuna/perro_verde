# Stage 1: builder
FROM node:18-alpine AS builder
WORKDIR /app

# 1) Copia solo package.json y lockfile
COPY package*.json ./

# 2) Copia tu esquema de Prisma para prisma generate
COPY prisma ./prisma

# 3) Instala todas las dependencias (incluyendo devDeps)
RUN npm install

# 4) Genera el cliente de Prisma
RUN npx prisma generate

# 5) Copia el resto del código
COPY . .

# 6) Compila tu Next.js
RUN npm run build

# Stage 2: runtime
FROM node:18-alpine AS runtime
WORKDIR /app

# 7) Instala solo deps de producción
COPY package*.json ./
RUN npm install --production

# 8) Copia los artefactos compilados
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/server.js server.js

EXPOSE 3000
CMD ["npm", "start"]
