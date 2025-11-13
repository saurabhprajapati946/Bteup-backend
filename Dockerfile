# -------- BASE IMAGE --------
FROM node:18-slim

# -------- INSTALL CHROMIUM + FONTS --------
RUN apt-get update \
    && apt-get install -y \
       chromium \
       chromium-driver \
       ca-certificates \
       fonts-liberation \
       libasound2 \
       libatk-bridge2.0-0 \
       libx11-xcb1 \
       libnss3 \
       libxss1 \
       libxdamage1 \
       libgbm1 \
       libgtk-3-0 \
       wget \
       xdg-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# -------- ENV FOR PUPPETEER-CORE --------
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# -------- WORKDIR --------
WORKDIR /app

# -------- INSTALL NODE MODULES --------
COPY package.json package-lock.json ./

RUN npm install --omit=dev --no-audit --no-fund

# -------- COPY EVERYTHING --------
COPY . .

# -------- EXPOSE PORT --------
ENV PORT=3000
EXPOSE 3000

# -------- START SERVER --------
CMD ["node", "server.js"]
