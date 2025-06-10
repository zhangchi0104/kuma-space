import { HttpError } from '@server/errors';
import Elysia, { env, t, getSchemaValidator } from 'elysia';
import { jwtVerify } from 'jose';
const supabaseJwtSchema = t.Object({
  // iss: t.Optional(t.String()),
  // sub: t.Optional(t.String()),
  // aud: t.Union([t.Array(t.String()), t.String()]),
  // exp: t.Optional(t.Number()),
  // nbf: t.Optional(t.Number()),
  // iat: t.Optional(t.Number()),
  // jti: t.Optional(t.String()),
  // role: t.Optional(t.String()),
});
export const appJwt = () =>
  new Elysia({
    name: '@kuma-space/jwt',
  }).derive({ as: 'global' }, async () => {
    const verify = async (jwt?: string) => {
      try {
        if (!jwt) return null;
        const { payload } = await jwtVerify(
          jwt,
          new TextEncoder().encode(env.JWT_SECRET),
        );
        const validator = getSchemaValidator(supabaseJwtSchema);
        const ok = validator.Check(payload);
        if (!ok) return null;
        return payload;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    return { verifyJwt: verify };
  });
