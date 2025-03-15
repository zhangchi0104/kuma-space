import { PostsDao } from '@server/providers/daos/posts';
import Elysia from 'elysia';

export const postsDao = () =>
  new Elysia({
    name: 'kuma-elysia/posts-dao',
  }).decorate('postsDao', new PostsDao());
