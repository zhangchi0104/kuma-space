import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
export const createDbClient = (url?: string | undefined) => {
  const pool = postgres(url ?? process.env.DATABASE_URL!, { max: 1 });
  return drizzle(pool);
};
