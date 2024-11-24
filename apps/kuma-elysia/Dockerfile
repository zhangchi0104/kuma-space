FROM oven/bun AS build

WORKDIR /app

# Cache packages installation
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY bun.lockb bun.lockb

RUN bun install
COPY ./prisma ./prisma
RUN bunx prisma generate

COPY ./src ./src

ENV NODE_ENV=production

RUN bun build ./src/index.ts --minify --splitting --outdir=server
FROM oven/bun

WORKDIR /app

COPY --from=build /app/server server
COPY --from=build /app/src/@prisma src/@prisma

ENV NODE_ENV=production

CMD ["bun", "run", "./server/index.js"]

EXPOSE 8000