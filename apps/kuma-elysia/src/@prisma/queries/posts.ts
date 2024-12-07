import { LanguageCodes, Prisma } from '@repo/db';

type PostQuery = {
  languageCode: LanguageCodes;
  type?: 'post' | 'moment';
};
export const selectPostsQuery = (q: PostQuery) => {
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
