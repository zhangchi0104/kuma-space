import { SQL, sql } from "drizzle-orm";
import {
  bigint,
  bigserial,
  check,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";
export const languageCodes = pgEnum("LanguageCodes", ["en", "zh"]);
export const appRoles = pgEnum("AppRoles", ["admin", "viewer"]);
export const appPermissions = pgEnum("AppPermissions", [
  "posts:all:read",
  "posts:all:write",
  "posts:all:all",
  "posts:self:read",
  "posts:self:write",
  "posts:self:all",
  "comments:all:read",
  "comments:all:write",
  "comments:all:all",
  "comments:self:read",
  "comments:self:write",
  "comments:self:all",
  "hitokoto:all:read",
  "hitokoto:all:write",
  "hitokoto:all:all",
  "moments:all:read",
  "moments:all:write",
  "moments:all:all",
  "moments:self:write",
  "moments:self:read",
  "moments:self:all",
  "all:all:all",
]);

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
  authorId: uuid("author_id").references(() => authUsers.id),
}).enableRLS();

export const postsContentTable = pgTable(
  "posts_content",
  {
    postId: serial("post_id").references(() => postsTable.id),
    title: varchar("title", { length: 255 }).notNull(),
    languageCode: languageCodes("language_code").notNull(),
    content: text("content").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.postId, table.languageCode],
    }),
  ],
).enableRLS();

export const tagsTable = pgTable("tags", {
  value: text("value").primaryKey(),
  category: text("category").generatedAlwaysAs(
    (): SQL => sql`split_part(${tagsTable.value}, ':', 1)`,
  ),
  name: text("name").generatedAlwaysAs(
    (): SQL => sql`split_part(${tagsTable.value}, ':', 2)`,
  ),
}).enableRLS();

export const postsTagsTable = pgTable(
  "posts_tags",
  {
    postId: serial("post_id").references(() => postsTable.id),
    tag: text("tag").references(() => tagsTable.value),
  },
  (table) => [
    primaryKey({
      columns: [table.postId, table.tag],
    }),
  ],
).enableRLS();

export const hitokotoTable = pgTable("hitokoto", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  fromCharacter: text("from_character").notNull(),
  fromWork: text("from_work").notNull(),
  fromWorkType: text("from_work_type").notNull(),
}).enableRLS();

export const momentsTable = pgTable("moments", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
  content: text("content").notNull(),
  authorId: uuid("author_id").references(() => authUsers.id),
}).enableRLS();

export const userRoles = pgTable(
  "user_roles",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id").references(() => authUsers.id, {
      onDelete: "cascade",
    }),
    role: appRoles("role").notNull().default("viewer"),
  },
  (table) => [unique("user_id_role_unique").on(table.userId, table.role)],
).enableRLS();

export const rolePermissions = pgTable(
  "role_permissions",
  {
    id: serial("id").primaryKey(),
    role: appRoles("role").notNull(),
    permission: appPermissions("permission").notNull(),
  },
  (table) => [
    unique("role_permission_unique").on(table.role, table.permission),
  ],
).enableRLS();
