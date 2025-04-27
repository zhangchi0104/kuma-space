# syntax=docker/dockerfile:1

FROM oven/bun:latest AS  build
WORKDIR /app
COPY package.json package.json
COPY bun.lockb bun.lockb
COPY . .
ENV NODE_ENV=production
RUN bun install
RUN bun turbo run "kuma-elysia#build"

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/apps/kuma-elysia/dist/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 8000