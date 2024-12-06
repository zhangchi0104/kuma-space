import Elysia from 'elysia';
const write = console.log;
const logger = new Elysia({ name: 'logger' })
  .state('startTime', BigInt(0))
  .onRequest(({ store }) => {
    store.startTime = process.hrtime.bigint();
  })
  .onBeforeHandle({ as: 'global' }, ({ store }) => {
    store.startTime = process.hrtime.bigint();
  })
  .onAfterHandle({ as: 'global' }, ({ request, store }) => {
    const end = process.hrtime.bigint();
    const diff = end - store.startTime;
    const url = new URL(request.url);
    const diffInSecs = diff / BigInt(1e6);
    write(`${request.method} ${url.pathname} - ${diffInSecs}ms`);
  })
  .onError({ as: 'global' }, ({ error, request, store }) => {
    const end = process.hrtime.bigint();
    const diff = end - store.startTime;
    write(
      `${request.method} ${request.url} - ${diff / BigInt(1e6)}ms - [ERROR] ${
        error.message
      }`,
    );
  });

export default logger;
