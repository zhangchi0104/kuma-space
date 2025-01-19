import Elysia from 'elysia';
import prisma from '@server/@prisma';
import { postIdRoutes } from './[id]';
import { getPostsQuery } from '../_validation';
import { selectPostsQuery } from '@server/@prisma/queries/posts';
import { LanguageCodes, Post, PostLanguages } from '@repo/db';
import { SupabaseObjectStorageProvider } from '@server/providers/object-storage';
import { s3 } from '@server/plugins/s3';
type PostWithTitle = Post & { title: PostLanguages['title'] };

export const postsRoutes = new Elysia({ prefix: '/posts' })
  .use(
    s3({ name: 'postsS3Client', bucketName: process.env.BLOG_ASSETS_BUCKET! }),
  )
  .use(postIdRoutes)
  .get(
    '/',
    async ({ query }) => {
      const { languageCode, ...rest } = query;
      const guardedLimit = query.limit + 1;
      const posts = await prisma.post.findMany({
        where: selectPostsQuery({
          languageCode: languageCode.toUpperCase() as LanguageCodes,
          ...rest,
        }),
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
        cursor: query.cursor ? { postId: query.cursor } : undefined,
        take: guardedLimit,
        orderBy: query.reverse ? { createdAt: 'desc' } : undefined,
        // include: {
        //   languages: true,
        // },
      });
      let cursor: number | undefined = undefined;

      if (posts.length === guardedLimit) {
        const post = posts.pop();
        cursor = post?.postId ?? undefined;
      }
      /** for the sake of type safety */
      const postsWithTitle = posts.map((post: (typeof posts)[number]) => {
        const { languages, ...rest } = post;
        return {
          ...rest,
          title: languages[0]?.title || '',
        };
      }) as PostWithTitle[];
      return { posts: postsWithTitle, cursor };
    },
    {
      query: getPostsQuery,
    },
  );
