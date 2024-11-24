import Elysia, { t } from 'elysia';
// import { HttpError } from '~/errors';
// import { AwsBlogMetadataService } from '~/providers/metadata/dynamodb';

export const postsRoutes = new Elysia({ prefix: '/posts' });
// .decorate('metadataService', new AwsBlogMetadataService())
// .get(
//   '/',
//   async ({ metadataService, query }) => {
//     try {
//       console.log({ query });
//       return await metadataService.listBlogMetadata(query);
//     } catch (error: any) {
//       throw new HttpError(500, error.message);
//     }
//   },
//   {
//     query: t.Object({
//       languageCode: t.Enum({ en: 'en', zh: 'zh' }),
//       type: t.Union(
//         [t.Enum({ post: 'post', moment: 'moment' }), t.Undefined()],
//         { default: 'post' },
//       ),
//       offset: t.Union([t.String(), t.Undefined()]),
//       limit: t.Number({
//         minimum: 1,
//         maximum: 10,
//         default: 5,
//       }),
//     }),
//   },
// );
