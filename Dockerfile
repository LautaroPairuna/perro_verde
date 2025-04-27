FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./

# 1) Instala todo (incluye devDeps para que next build funcione)
RUN npm install

# 2) Genera el cliente de Prisma para que @prisma/client refleje tu esquema
RUN npx prisma generate

# 3) Copia el resto del código y compila
COPY . .
RUN npm run build

# 4) Runtime minimal
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/server.js server.js
EXPOSE 3000
CMD ["npm","start"]
