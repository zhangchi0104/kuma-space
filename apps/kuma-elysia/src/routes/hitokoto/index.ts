import appDb from '@server/providers/database';
import { sql } from 'drizzle-orm';
import Elysia from 'elysia';
import { hitokotoTable } from '@repo/db/schema';
import type { Hitokoto } from '@repo/db/types';
export const hitokotoRoutes = new Elysia({ prefix: '/hitokoto' }).get(
  '/',
  async () => {
    // Use TABLESAMPLE SYSTEM (1) to fetch approximately 1% of the table,
    // then LIMIT 1 to ensure only one row is returned.
    // Note: TABLESAMPLE might return 0 rows on small tables or with small percentages.
    const result = await appDb.execute<Hitokoto>(
      sql`SELECT * FROM ${hitokotoTable} TABLESAMPLE SYSTEM (1) LIMIT 1`,
    );
    const hitokoto = result[0];
    return hitokoto;
  },
);
