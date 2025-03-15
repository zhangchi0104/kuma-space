import {
  postsContentTable,
  postsTable,
  postsTagsTable,
  tagsTable,
} from "./schema";

export type Post = typeof postsTable.$inferSelect;
export type Tag = typeof tagsTable.$inferSelect;
export type CreatePost = typeof postsTable.$inferInsert;
export type CreateTag = typeof tagsTable.$inferInsert;
export type PostContent = typeof postsContentTable.$inferSelect;
export type PostTag = typeof postsTagsTable.$inferSelect;
