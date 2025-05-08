import { sql } from "drizzle-orm";
import { pgPolicy } from "drizzle-orm/pg-core";
import { anonRole, authenticatedRole, authUid } from "drizzle-orm/supabase";
import {
  momentsTable,
  postsContentTable,
  postsTable,
  postsTagsTable,
  rolePermissions,
  tagsTable,
} from "./public";
import { hitokotoTable } from "./public";
const isAnonymousUser = sql`(auth.jwt() ->>'is_anonymous')::boolean`;
// Anon
export const anonCanReadTable = pgPolicy(
  "Posts and hitokoto is readble by everyone",
  {
    to: anonRole,
    for: "select",
    using: sql`true`,
  },
)
  .link(postsTable)
  .link(hitokotoTable)
  .link(momentsTable)
  .link(postsContentTable)
  .link(postsTagsTable)
  .link(tagsTable);

export const anonCannotInsertTable = pgPolicy(
  "Anon cannot insert into the table",
  {
    to: anonRole,
    for: "insert",
    withCheck: sql`false`,
  },
)
  .link(postsTable)
  .link(hitokotoTable)
  .link(momentsTable)
  .link(postsContentTable)
  .link(postsTagsTable)
  .link(tagsTable);

export const anonCannotUpdateTable = pgPolicy("Anon cannot update the table", {
  to: anonRole,
  for: "update",
  withCheck: sql`false`,
})
  .link(postsTable)
  .link(hitokotoTable)
  .link(momentsTable)
  .link(postsContentTable)
  .link(postsTagsTable)
  .link(tagsTable);

export const anonCannotDeleteTable = pgPolicy("Anon cannot delete the table", {
  to: anonRole,
  for: "delete",
  using: sql`false`,
})
  .link(postsTable)
  .link(hitokotoTable)
  .link(momentsTable)
  .link(postsContentTable)
  .link(postsTagsTable)
  .link(tagsTable);

// authenticated - posts
export const authenticatedCanReadPosts = pgPolicy(
  "Authenticated can read posts",
  {
    to: authenticatedRole,
    for: "select",
    using: sql`authorize('posts:all:read')`,
  },
).link(postsTable);

export const authenticatedCanUpdateOwnPost = pgPolicy(
  "Authenticated can update their own post",
  {
    to: authenticatedRole,
    for: "update",
    using: sql`authorize('posts:self:write') and ${postsTable.authorId} = (${authUid}) and (${isAnonymousUser}) = false`,
    withCheck: sql`${postsTable.authorId} = (${authUid})`,
  },
).link(postsTable);

export const authenticatedCanDeleteOwnPost = pgPolicy(
  "Authenticated can delete their own post",
  {
    to: authenticatedRole,
    for: "delete",
    using: sql`authorize('posts:self:write') and ${postsTable.authorId} = (${authUid}) and (${isAnonymousUser}) = false`,
  },
).link(postsTable);

export const authenticatedCanInsertPost = pgPolicy(
  "Authenticated can insert a post",
  {
    to: authenticatedRole,
    for: "insert",
    withCheck: sql`authorize('posts:all:write') and ${postsTable.authorId} = ${authUid} and ${isAnonymousUser} = false`,
  },
).link(postsTable);

// authenticated - hitokoto
export const authenticatedCanReadHitokoto = pgPolicy(
  "Authenticated can read hitokoto",
  {
    to: authenticatedRole,
    for: "select",
    using: sql`authorize('hitokoto:all:read')`,
  },
).link(hitokotoTable);

// authenticated - moments
export const authenticatedCanReadMoments = pgPolicy(
  "Authenticated can read moments",
  {
    to: authenticatedRole,
    for: "select",
    using: sql`authorize('moments:all:read')`,
  },
).link(momentsTable);

export const authenticatedCanInsertSelfMoment = pgPolicy(
  "Authenticated can write their own moment",
  {
    to: authenticatedRole,
    for: "insert",
    withCheck: sql`authorize('moments:self:write') and ${momentsTable.authorId} = ${authUid} and ${isAnonymousUser} = false`,
  },
).link(momentsTable);

export const authenticatedCanUpdateOwnMoment = pgPolicy(
  "Authenticated can update their own moment",
  {
    to: authenticatedRole,
    for: "update",
    using: sql`authorize('moments:self:write') and ${momentsTable.authorId} = ${authUid} and ${isAnonymousUser} = false`,
    withCheck: sql`${momentsTable.authorId} = ${authUid}`,
  },
).link(momentsTable);

export const authenticatedCanDeleteOwnMoment = pgPolicy(
  "Authenticated can delete their own moment",
  {
    to: authenticatedRole,
    for: "delete",
    using: sql`authorize('moments:self:write') and ${momentsTable.authorId} = ${authUid} and ${isAnonymousUser} = false`,
  },
).link(momentsTable);

// authenticated - posts_content
export const authenticatedCanReadPostsContent = pgPolicy(
  "Authenticated can read posts content",
  {
    to: authenticatedRole,
    for: "select",
    using: sql`authorize('posts:all:read')`,
  },
).link(postsContentTable);

export const authenticatedCanUpdatePostsContent = pgPolicy(
  "Authenticated can update posts content",
  {
    to: authenticatedRole,
    for: "update",
    using: sql`authorize('posts:self:write') AND (${isAnonymousUser}) is false AND ${postsContentTable.postId} IN (SELECT ${postsTable.id} FROM ${postsTable} WHERE ${postsTable.authorId} = ${authUid})`,
    withCheck: sql`${postsContentTable.postId} IN (SELECT ${postsTable.id} FROM ${postsTable} WHERE ${postsTable.authorId} = ${authUid})`,
  },
).link(postsContentTable);

export const authenticatedCanDeletePostsContent = pgPolicy(
  "Authenticated can delete posts content",
  {
    to: authenticatedRole,
    for: "delete",
    using: sql`authorize('posts:self:write') AND (${isAnonymousUser}) is false AND ${postsContentTable.postId} IN (SELECT ${postsTable.id} FROM ${postsTable} WHERE ${postsTable.authorId} = ${authUid})`,
  },
).link(postsContentTable);

export const authenticatedCanInsertPostsContent = pgPolicy(
  "Authenticated can insert posts content",
  {
    to: authenticatedRole,
    for: "insert",
    withCheck: sql`authorize('posts:self:write') AND (${isAnonymousUser}) is false AND ${postsContentTable.postId} IN (SELECT ${postsTable.id} FROM ${postsTable} WHERE ${postsTable.authorId} = ${authUid})`,
  },
).link(postsContentTable);

// authenticated - tags
export const authenicatedCannotUpdateTags = pgPolicy(
  "Only admin can update tags",
  {
    to: authenticatedRole,
    for: "update",
    using: sql`authorize('all:all:all')`,
  },
).link(tagsTable);

export const authenicatedCannotDeleteTags = pgPolicy(
  "Only admin can delete tags",
  {
    to: authenticatedRole,
    for: "delete",
    using: sql`authorize('all:all:all')`,
  },
).link(tagsTable);

export const authenticatedCanInsertTags = pgPolicy(
  "Only admin can insert tags",
  {
    to: authenticatedRole,
    for: "insert",
    withCheck: sql`authorize('all:all:all')`,
  },
).link(tagsTable);

// authenticated - posts_tags
export const authenticatedCanInsertPostsTags = pgPolicy(
  "Authenticated can insert posts tags",
  {
    to: authenticatedRole,
    for: "insert",
    withCheck: sql`authorize('posts:self:write') and ${postsTagsTable.postId} IN (SELECT ${postsTable.id} FROM ${postsTable} WHERE ${postsTable.authorId} = ${authUid})`,
  },
).link(postsTagsTable);

export const authenticatedCanDeletePostsTags = pgPolicy(
  "Authenticated can delete posts tags",
  {
    to: authenticatedRole,
    for: "delete",
    using: sql`authorize('posts:self:write')`,
  },
).link(postsTagsTable);

export const authenticatedCanUpdatePostsTags = pgPolicy(
  "Authenticated can update posts tags",
  {
    to: authenticatedRole,
    for: "update",
    using: sql`authorize('posts:self:write')`,
    withCheck: sql`${postsTagsTable.postId} IN (SELECT ${postsTable.id} FROM ${postsTable} WHERE ${postsTable.authorId} = ${authUid})`,
  },
).link(postsTagsTable);

// authenticated - role_permissions
export const authenticatedCanReadRolePermissions = pgPolicy(
  "Authenticated can read role permissions",
  {
    to: authenticatedRole,
    for: "select",
    using: sql`false`,
  },
).link(rolePermissions);
