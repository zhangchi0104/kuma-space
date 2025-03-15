import { SQL, sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const languageCodes = pgEnum("LanguageCodes", ["en", "zh"]);
export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
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
