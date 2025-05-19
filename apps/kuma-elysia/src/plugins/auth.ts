import { jwt } from '@elysiajs/jwt';
import Elysia, { AnyElysia, t } from 'elysia';
import { HttpError } from '@server/errors';
import { env } from '../env';
import { appJwt } from './jwt';
console.log(`JWT_SECRET=${env.JWT_SECRET}`);
export const auth = () => {
  const app = new Elysia({
    name: '@kuma-space/auth',
  })
    .use(appJwt)
    .derive({ as: 'global' }, async ({ headers, verifyJwt }) => {
      // since decorate is global, it is probably better to make derive global
      const auth = headers['authorization'];
      const token = auth?.startsWith('Bearer ') ? auth.slice(7) : undefined;
      console.log('jwt', token);
      const decoded = await verifyJwt(token);
      if (!decoded) {
        console.log(decoded);
        throw new HttpError(400, 'Unauthorized');
      }
      return {
        token,
        parsedToken: decoded,
      };
    });

  return app;
};
