import { t } from 'elysia';

export const presignedBody = t.Object({
  filename: t.String(),
  contentType: t.Optional(t.String()),
});
