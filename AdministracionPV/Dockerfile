# AdministracionPV/Dockerfile

# ────────── Stage 1: Builder ──────────
FROM node:18-slim AS builder
WORKDIR /app

# Copiamos sólo package.json y lockfile para instalar deps
COPY package*.json ./

# Copiamos el esquema Prisma para prisma generate
COPY prisma ./prisma

# Instalamos todas las deps (incluyendo devDependencies)
RUN npm install

# Generamos el cliente de Prisma (crea node_modules/.prisma/client con el engine linux-gnu)
RUN npx prisma generate

# Copiamos el resto del código
COPY . .

# No hay paso de "build" específico para AdminJS, pero si tuvieras assets:
# RUN npm run build:admin

# ────────── Stage 2: Runtime ──────────
FROM node:18-slim AS runtime
WORKDIR /app

# Instalamos sólo deps de producción
COPY package*.json ./
RUN npm install --production

# Copiamos todo lo que necesitamos del builder
COPY --from=builder /app ./

# Exponemos el puerto en que arranca tu server.js (ajusta si usas otro)
EXPOSE 8080

# Arrancamos tu servidor de AdminJS
CMD ["node", "server.js"]
