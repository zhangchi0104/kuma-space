import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/public";
export const createDbClient = (url?: string | undefined) => {
  console.log(url ?? process.env.DATABASE_URL!);
  const pool = postgres(url ?? process.env.DATABASE_URL!, { max: 1 });
  return drizzle(pool, { schema });
};
