import Elysia from 'elysia';
import { randomHitokoto } from '@repo/db/sql';
import prisma from '@server/@prisma';
export const hitokotoRoutes = new Elysia({ prefix: '/hitokoto' }).get(
  '/',
  async () => {
    const result = await prisma.$queryRawTyped(randomHitokoto());
    const hitokoto = result[0];
    return hitokoto;
  },
);
