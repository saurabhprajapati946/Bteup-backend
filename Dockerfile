FROM node:18-slim

RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxkbcommon0 \
    libdrm2 \
    libxcb1 \
    libnss3 \
    libxss1 \
    libxtst6 \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY . .

ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"
ENV PORT=3000

EXPOSE 3000
CMD ["node", "server.js"]
