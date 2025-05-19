import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/public";
import { PgDatabase } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import * as jose from "jose";
export type SupabaseToken = {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  role?: string;
};

export const createDbClient = (url?: string | undefined) => {
  console.log(url ?? process.env.DATABASE_URL!);
  const pool = postgres(url ?? process.env.DATABASE_URL!, {
    max: 1,
  });
  return drizzle(pool, {
    schema,
    logger: process.env.NODE_ENV === "development" ? true : false,
  });
};

function createRlsDrizzle<Database extends PgDatabase<any, any, any>>({
  admin,
  client,
}: {
  admin: Database;
  client: Database;
}) {
  return {
    admin,
    rls: (token: SupabaseToken) =>
      (async (transaction, ...rest) => {
        return await client.transaction(
          async (tx) => {
            // Supabase exposes auth.uid() and auth.jwt()
            // https://supabase.com/docs/guides/database/postgres/row-level-security#helper-functions
            try {
              await tx.execute(sql`
          -- auth.jwt()
          select set_config('request.jwt.claims', '${sql.raw(
            JSON.stringify(token),
          )}', TRUE);
          -- auth.uid()
          select set_config('request.jwt.claim.sub', '${sql.raw(
            token.sub ?? "",
          )}', TRUE);												
          -- set local role
          set local role ${sql.raw(token.role ?? "anon")};
          `);
              return await transaction(tx);
            } finally {
              await tx.execute(sql`
            -- reset
            select set_config('request.jwt.claims', NULL, TRUE);
            select set_config('request.jwt.claim.sub', NULL, TRUE);
            reset role;
            `);
            }
          },
          ...rest,
        );
      }) as typeof client.transaction,
  };
}

export const createRlsClient = (url?: string) => {
  const adminCon = postgres(url ?? process.env.DATABASE_URL!, {
    prepare: false,
  });
  const admin = drizzle(adminCon, {
    schema,
    logger: process.env.NODE_ENV === "development" ? true : false,
  });
  const clientCon = postgres(url ?? process.env.DATABASE_URL!, {
    prepare: false,
  });
  const client = drizzle(clientCon, {
    schema,
    logger: process.env.NODE_ENV === "development" ? true : false,
  });

  return createRlsDrizzle({ admin, client });
};

export type RlsClient = ReturnType<typeof createRlsClient>;
