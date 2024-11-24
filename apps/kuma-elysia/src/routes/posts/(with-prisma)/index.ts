import Elysia from 'elysia';
import prisma from '@prisma';
import { postIdRoutes } from './[id]';
import { getPostsQuery } from '../_validation';
import { selectPostsQuery } from '@prisma/queries/posts';

export const postsRoutes = new Elysia({ prefix: '/posts' })
  .use(postIdRoutes)
  .get(
    '/',
    async ({ query }) => {
      return await prisma.post.findMany({
        where: selectPostsQuery(query),
      });
    },
    {
      query: getPostsQuery,
    },
  )
  .put('/', () => {
    return { msg: 'PUT /post' };
  });
