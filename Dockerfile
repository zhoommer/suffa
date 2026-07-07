# ── Stage 1: Build ────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first (layer cache)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .

RUN DATABASE_URL=build \
    CLIENT_ID=build \
    CLIENT_SECRET=build \
    ISSUER=build \
    BETTER_AUTH_SECRET=build \
    BETTER_AUTH_URL=build \
    npx prisma generate && \
    npx svelte-kit sync && \
    npx vite build

# ── Stage 2: Production ────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled server output
COPY --from=builder /app/build ./build

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
    CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["node", "build"]
