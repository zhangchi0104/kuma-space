import { Elysia, t } from 'elysia';
import { presignedBody } from './_validation';
import { s3 } from '@server/plugins/s3';
import { auth } from '@server/plugins/auth';
export const assetsRoute = new Elysia({ prefix: '/assets' })
  .use(
    s3({ name: 'assetsS3Client', bucketName: process.env.BLOG_ASSETS_BUCKET! }),
  )
  .use(auth())
  .post(
    '/presigned',
    async ({ body, assetsS3Client }) => {
      const resp = await assetsS3Client.createUploadPresignedUrl(
        body.filename,
        3600,
        body.contentType,
      );
      return resp;
    },
    {
      body: presignedBody,
      auth: { role: 'Editor' },
    },
  );
