
# Usa una imagen base de Node.js con soporte completo de dependencias
FROM node:20-slim

# Instala librerías necesarias para Electron
RUN apt-get update && apt-get install -y \
    libgtk-3-0 libnss3 libxss1 libasound2 \
    libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 \
    libxi6 libxtst6 libxrandr2 libgbm1 libxshmfence1 \
    && rm -rf /var/lib/apt/lists/*

# Crea el directorio de trabajo
WORKDIR /app

# Copia dependencias
COPY package*.json ./
RUN npm install

# Desactiva telemetría de Next
RUN npx next telemetry disable

# Copia el resto de archivos
COPY . .

# Exponer puerto (para Next.js en dev) 
# EXPOSE 3000


ENV NODE_ENV=production

# Comando por defecto: ejecuta Electron (que lanza Next en dev y abre la GUI)
CMD ["npm", "run", "electron:prod"]
