import Elysia from 'elysia';
import prisma from '@server/@prisma';
import { postIdRoutes } from './[id]';
import { getPostsQuery } from '../_validation';
import { selectPostsQuery } from '@server/@prisma/queries/posts';
import { Post } from '@server/@prisma/client';

export const postsRoutes = new Elysia({ prefix: '/posts' })
  .use(postIdRoutes)
  .get(
    '/',
    async ({ query }) => {
      return (await prisma.post.findMany({
        where: selectPostsQuery(query),
      })) as Post[];
    },
    {
      query: getPostsQuery,
    },
  )
  .put('/', () => {
    return { msg: 'PUT /post' };
  });
