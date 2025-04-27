import { Post, PostContent } from '@repo/db/types';
import { Static, t } from 'elysia';

export const getPostsResponse = t.Object({
  posts: t.Array(
    t.Object({
      id: t.Integer(),
      title: t.String(),
      updatedAt: t.Date(),
    }),
  ),
  size: t.Number(),
  cursor: t.Optional(t.Number()),
});

export const getPostByIdResponse = t.Object({
  id: t.Integer(),
  updatedAt: t.Date(),
  title: t.String(),
  content: t.String(),
});

export const getMomentsResponse = t.Object({
  moments: t.Array(
    t.Object({
      id: t.String(),
      updatedAt: t.Date(),
      content: t.String(),
    }),
  ),
  size: t.Number(),
  cursor: t.Optional(t.String()),
});

export type PostMetadata = Pick<Post, 'id' | 'updatedAt'> &
  Pick<PostContent, 'title'>;
export type GetPostsResponse = Static<typeof getPostsResponse>;
export type GetPostByIdResponse = Static<typeof getPostByIdResponse>;
export type GetMomentsResponse = Static<typeof getMomentsResponse>;
