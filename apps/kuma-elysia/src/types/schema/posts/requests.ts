import { Static, t } from 'elysia';

export const getPostsQuery = t.Object({
  languageCode: t.Enum({ zh: 'zh', en: 'en' }),
  type: t.Enum(
    { post: 'post', moment: 'moment' },
    {
      default: 'post',
    },
  ),
  reverse: t.Optional(t.Boolean({ default: false })),
  cursor: t.Optional(t.Number()),
  limit: t.Number({
    minimum: 1,
    maximum: 10,
    default: 5,
  }),
});

export type GetPostsQuery = Static<typeof getPostsQuery>;
