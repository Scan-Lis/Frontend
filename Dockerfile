FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json yarn.lock ./

# Instalar dependencias
RUN yarn install --frozen-lockfile

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN yarn build

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["yarn", "start"]
