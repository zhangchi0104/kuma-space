import { PostsDao, PostsDaoRls } from '@server/providers/daos/posts';
import Elysia from 'elysia';
import { auth } from '../auth';
import { SupabaseToken } from '@repo/db';

export const postsDao = () =>
  new Elysia({
    name: 'kuma-elysia/posts-dao',
  }).decorate('postsDao', new PostsDao());

export const postsDaoRls = () =>
  new Elysia({
    name: '@kuma-elysia/posts-dao-rls',
  })
    .use(auth())
    .derive({ as: 'global' }, ({ parsedToken }) => {
      const token = parsedToken satisfies SupabaseToken;
      return { postsDao: new PostsDaoRls(token) };
    });
