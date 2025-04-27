import { Static, t } from 'elysia';

export const getPostsQuery = t.Object({
  languageCode: t.Enum({ zh: 'zh', en: 'en' }),
  reverse: t.Optional(t.Boolean({ default: false })),
  cursor: t.Optional(t.Number()),
  limit: t.Number({
    minimum: 1,
    maximum: 10,
    default: 5,
  }),
});

export const getMomentsQuery = t.Object({
  reverse: t.Optional(t.Boolean({ default: false })),
  cursor: t.Optional(t.Number()),
  limit: t.Number({
    minimum: 1,
    maximum: 10,
    default: 5,
  }),
});

export type GetPostsQuery = Static<typeof getPostsQuery>;
export type GetMomentsQuery = Static<typeof getMomentsQuery>;
