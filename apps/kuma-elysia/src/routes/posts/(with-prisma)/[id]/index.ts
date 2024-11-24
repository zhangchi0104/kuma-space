import Elysia from 'elysia';

export const postIdRoutes = new Elysia({ prefix: '/:id' }).get(
  '/',
  async ({ params }) => {
    return { id: params.id };
  },
);
