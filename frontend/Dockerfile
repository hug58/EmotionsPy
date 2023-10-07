# Usa una imagen base de Node.js
FROM node:20.3.0

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD ["npm", "run", "serve"]
