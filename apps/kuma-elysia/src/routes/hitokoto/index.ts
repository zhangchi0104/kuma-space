import appDb from '@server/providers/database';
import { sql } from 'drizzle-orm';
import Elysia from 'elysia';
import { hitokotoTable } from '@repo/db/schema';
export const hitokotoRoutes = new Elysia({ prefix: '/hitokoto' }).get(
  '/',
  async () => {
    const result = await appDb.execute(sql`SELECT * FROM ${hitokotoTable}`);
    const hitokoto = result[0];
    return hitokoto;
  },
);
