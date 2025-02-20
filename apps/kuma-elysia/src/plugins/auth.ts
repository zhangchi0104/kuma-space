import jwt from '@elysiajs/jwt';
import Elysia, { t } from 'elysia';
import { UserRoles } from '@repo/db';
import { checkRoles } from '@server/utils/user';
const jwtSchema = t.Object({
  role: t.Union([t.Literal('Admin'), t.Literal('Viewer'), t.Literal('Editor')]),
  email: t.String(),
});
type AuthOpts = boolean | { role: UserRoles };

export const auth = () => {
  const app = new Elysia({
    name: '@kuma-space/auth',
  })
    .derive({ as: 'global' }, ({ headers }) => {
      // since decorate is global, it is probably better to make derive global
      const auth = headers['authorization'];
      return {
        bearer: auth?.startsWith('Bearer ') ? auth.slice(7) : null,
      };
    })
    .use(jwt({ secret: process.env.JWT_SECRET!, schema: jwtSchema }))
    .macro({
      auth(opts?: AuthOpts) {
        if (!opts) {
          return;
        }
        return {
          async beforeHandle({ bearer, jwt, error }) {
            if (!bearer) {
              return error(401);
            }
            const payload = await jwt.verify(bearer);
            if (!payload) {
              return error(401);
            }
            if (
              typeof opts === 'object' &&
              !checkRoles(payload.role, opts.role)
            ) {
              return error(403);
            }
          },
        };
      },
    });

  return app;
};
