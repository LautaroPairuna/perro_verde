# AdministracionPV/Dockerfile

# 1) Builder stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copiamos sólo package.json para instalar deps
COPY package*.json ./

# Copiamos el directorio prisma (donde está schema.prisma)
COPY prisma ./prisma

# Instalamos TODO (incluye devDeps)
RUN npm install

# Generamos el cliente de Prisma
RUN npx prisma generate

# Copiamos el resto del código
COPY . .

# No necesitamos build step si tu AdminJS no requiere bundling
# (si lo necesitara, aquí harías npm run build-admin u otro script)

# 2) Runtime stage
FROM node:18-alpine AS runtime
WORKDIR /app

# Instalamos sólo deps de producción
COPY package*.json ./
RUN npm install --production

# Traemos todo desde el builder
COPY --from=builder /app ./

# Exponemos el puerto en que arranca server.js (p. ej. 8080)
EXPOSE 8080

# Arrancamos tu servidor de AdminJS
CMD ["node", "server.js"]
