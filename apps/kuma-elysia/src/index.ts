import { Elysia } from 'elysia';
import { HttpError } from './errors';
import { postsRoutes } from './routes/posts/(with-prisma)';
import { hitokotoRoutes } from './routes/hitokoto';
import logger from './plugins/requestLogger';
import { assetsRoute } from './routes/assets';

const gloablErrorHandler = () =>
  new Elysia()
    .error({
      httpError: HttpError,
    })
    .onError(({ code, error }) => {
      console.error(`Error ${code} - ${error}`);
      switch (code) {
        case 'httpError':
          return {
            statusCode: error.status,
            body: error.message,
          };
        case 'VALIDATION':
          return {
            statusCode: 400,
            message: error.all.at(0)?.summary,
          };
      }
    });

export const app = new Elysia()
  .use(gloablErrorHandler)
  .use(logger)
  .use(postsRoutes)
  .use(hitokotoRoutes)
  .use(assetsRoute)
  // .use(createAuthPlugin())
  .get('/health', () => new Date().toString())

  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
export type App = typeof app;
