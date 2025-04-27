FROM node:18-alpine
WORKDIR /app

# 1) Copia deps y las instala
COPY package*.json ./
RUN npm install --production

# 2) Copia el resto del código
COPY . .

# 3) Expone el puerto donde tu server.js arranca AdminJS
#    (coincide con process.env.PORT o el valor por defecto 8080)
EXPOSE 8080

# 4) Lanza el servidor de AdminJS
CMD ["node", "server.js"]
