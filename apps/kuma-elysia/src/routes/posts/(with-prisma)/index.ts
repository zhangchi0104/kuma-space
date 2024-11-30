import Elysia from 'elysia';
import prisma from '@server/@prisma';
import { postIdRoutes } from './[id]';
import { getPostsQuery } from '../_validation';
import { selectPostsQuery } from '@server/@prisma/queries/posts';
import { Post, PostLanguages, Prisma } from '@server/@prisma/client';
type PostWithTitle = Post & { title: PostLanguages['title'] };

export const postsRoutes = new Elysia({ prefix: '/posts' })
  .use(postIdRoutes)
  .get(
    '/',
    async ({ query }) => {
      const posts = await prisma.post.findMany({
        where: selectPostsQuery(query),
        select: {
          languages: {
            select: {
              title: true,
            },
          },
          postId: true,
          createdAt: true,
          updatedAt: true,
        },
        // include: {
        //   languages: true,
        // },
      });
      /** for the sake of type safety */
      return posts.map((post: (typeof posts)[number]) => {
        const { languages, ...rest } = post;
        return {
          ...rest,
          title: languages[0]?.title || '',
        };
      }) as PostWithTitle[];
    },
    {
      query: getPostsQuery,
    },
  )
  .put('/', () => {
    return { msg: 'PUT /post' };
  });
