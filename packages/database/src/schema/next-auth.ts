import {
  text,
  timestamp,
  pgSchema,
  unique,
  uuid,
  foreignKey,
  bigint,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const nextAuth = pgSchema("next_auth");

export const usersInNextAuth = nextAuth.table(
  "users",
  {
    id: uuid()
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    name: text(),
    email: text(),
    emailVerified: timestamp({ withTimezone: true, mode: "string" }),
    image: text(),
  },
  (table) => [unique("email_unique").on(table.email)],
);

export const sessionsInNextAuth = nextAuth.table(
  "sessions",
  {
    id: uuid()
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    expires: timestamp({ withTimezone: true, mode: "string" }).notNull(),
    sessionToken: text().notNull(),
    userId: uuid(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [usersInNextAuth.id],
      name: "sessions_userId_fkey",
    }).onDelete("cascade"),
    unique("sessiontoken_unique").on(table.sessionToken),
  ],
);

export const accountsInNextAuth = nextAuth.table(
  "accounts",
  {
    id: uuid()
      .default(sql`uuid_generate_v4()`)
      .primaryKey()
      .notNull(),
    type: text().notNull(),
    provider: text().notNull(),
    providerAccountId: text().notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    expiresAt: bigint("expires_at", { mode: "number" }),
    tokenType: text("token_type"),
    scope: text(),
    idToken: text("id_token"),
    sessionState: text("session_state"),
    oauthTokenSecret: text("oauth_token_secret"),
    oauthToken: text("oauth_token"),
    userId: uuid(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [usersInNextAuth.id],
      name: "accounts_userId_fkey",
    }).onDelete("cascade"),
    unique("provider_unique").on(table.provider, table.providerAccountId),
  ],
);

export const verificationTokensInNextAuth = nextAuth.table(
  "verification_tokens",
  {
    identifier: text(),
    token: text().primaryKey().notNull(),
    expires: timestamp({ withTimezone: true, mode: "string" }).notNull(),
  },
  (table) => [
    unique("token_identifier_unique").on(table.identifier, table.token),
  ],
);

export const sessionsInNextAuthRelations = relations(
  sessionsInNextAuth,
  ({ one }) => ({
    usersInNextAuth: one(usersInNextAuth, {
      fields: [sessionsInNextAuth.userId],
      references: [usersInNextAuth.id],
    }),
  }),
);

export const usersInNextAuthRelations = relations(
  usersInNextAuth,
  ({ many }) => ({
    sessionsInNextAuths: many(sessionsInNextAuth),
    accountsInNextAuths: many(accountsInNextAuth),
  }),
);

export const accountsInNextAuthRelations = relations(
  accountsInNextAuth,
  ({ one }) => ({
    usersInNextAuth: one(usersInNextAuth, {
      fields: [accountsInNextAuth.userId],
      references: [usersInNextAuth.id],
    }),
  }),
);
