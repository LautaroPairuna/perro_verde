FROM node:18-alpine
WORKDIR /app

# 1) Instala todo para poder compilar Tailwind y PostCSS
COPY package*.json ./
RUN npm install

# 2) Copia el código y genera el build
COPY . .
RUN npm run build

# 3) (Opcional) limpia devDependencies para producción
RUN npm prune --production

EXPOSE 3000
CMD ["npm","start"]
