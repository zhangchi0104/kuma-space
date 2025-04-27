import Elysia from 'elysia';
import { postIdRoutes } from './[id]';
import { getPostsQuery } from '@server/types/schema/posts/requests';
import { s3 } from '@server/plugins/s3';
import { postsDao } from '@server/plugins/daos/post';
export const postsRoutes = new Elysia({ prefix: '/posts' })
  .use(
    s3({ name: 'postsS3Client', bucketName: process.env.BLOG_ASSETS_BUCKET! }),
  )
  .use(postsDao())
  .use(postIdRoutes)
  .get(
    '/',
    async ({ postsDao, query }) => {
      return await postsDao.getPosts(query);
    },
    {
      query: getPostsQuery,
    },
  );
