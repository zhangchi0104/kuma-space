FROM oven/bun AS  build
WORKDIR /app
COPY package.json package.json
COPY . .
ENV NODE_ENV=production
RUN bun install


RUN  cd apps/kuma-elysia && bun run build 
FROM oven/bun

WORKDIR /app

COPY --from=build /app/apps/kuma-elysia/server server
COPY --from=build /app/apps/kuma-elysia/src/@prisma apps/kuma-elysia/src/@prisma

ENV NODE_ENV=production

CMD ["bun", "run", "./server/index.js"]

EXPOSE 8000