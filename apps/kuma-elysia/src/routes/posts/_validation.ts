import { t } from 'elysia';

export const getPostsQuery = t.Object({
  languageCode: t.Enum({ EN_US: 'EN_US', ZH_CN: 'ZH_CN' }),
  type: t.Enum(
    { post: 'post', moment: 'moment' },
    {
      default: 'post',
    },
  ),
  cursor: t.Optional(t.String()),
  limit: t.Number({
    minimum: 1,
    maximum: 10,
    default: 5,
  }),
});
