# syntax=docker/dockerfile:1

ARG DATABASE_TRANSACTION_URL
ARG DATABASE_DIRECT_URL
FROM oven/bun:latest AS  build
WORKDIR /app
COPY package.json package.json
COPY bun.lockb bun.lockb
COPY . .
ENV NODE_ENV=production
RUN bun install
RUN --mount=type=secret,id=database_direct_url,env=DATABASE_DIRECT_URL \
 --mount=type=secret,id=database_transaction_url,env=DATABASE_TRANSACTION_URL \
 bun install && bun turbo run "kuma-elysia#build"

FROM oven/bun:latest AS run

WORKDIR /app

COPY --from=build /app/apps/kuma-elysia/dist/* .
COPY --from=build /app/node_modules/.prisma/client ./node_modules/.prisma/client

ENV NODE_ENV=production

CMD ["bun", "run", "./index.js"]

EXPOSE 8000