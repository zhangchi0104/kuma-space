import { LanguageCodes, Prisma } from '@prisma/client';
import Elysia, { t } from 'elysia';
import prisma from '~/db-client';
import { postIdRoutes } from './[id]';
import { getPostsQuery } from '../_validation';
type PostQuery = {
  languageCode: LanguageCodes;
  type?: 'post' | 'moment';
};
const postWhere = (q: PostQuery) => {
  const tagType = q.type === 'moment' ? 'moment' : 'post';
  return Prisma.validator<Prisma.PostWhereInput>()({
    languages: {
      some: {
        languageCode: q.languageCode,
      },
    },
    tags: {
      some: {
        tag: {
          category: 'type',
          name: tagType,
        },
      },
    },
  });
};
export const postsRoutes = new Elysia({ prefix: '/posts' })
  .get(
    '/',
    async ({ query }) => {
      return await prisma.post.findMany({
        where: postWhere(query),
      });
    },
    {
      query: getPostsQuery,
    },
  )
  .put('/', () => {
    return { msg: 'PUT /post' };
  })
  .use(postIdRoutes);
