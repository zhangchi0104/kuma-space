import { sql } from "drizzle-orm";
import { pgPolicy } from "drizzle-orm/pg-core";
import { anonRole, authenticatedRole, authUid } from "drizzle-orm/supabase";
// Anon
const anonCanReadTable = pgPolicy("Posts and hitokoto is readble by everyone", {
  to: anonRole,
  for: "select",
  using: sql`true`,
});
const anonCannotInsertTable = pgPolicy("Anon cannot insert into the table", {
  to: anonRole,
  for: "insert",
  withCheck: sql`false`,
});
const anonCannotUpdateTable = pgPolicy("Anon cannot update the table", {
  to: anonRole,
  for: "update",
  withCheck: sql`false`,
});
const anonCannotDeleteTable = pgPolicy("Anon cannot delete the table", {
  to: anonRole,
  for: "delete",
  withCheck: sql`false`,
});

// authenticated
const authenticatedCanReadTable = pgPolicy("Authenticated can read the table", {
  to: authenticatedRole,
});

const authenticatedCanUpadateOwnPost = pgPolicy(
  "Authenticated can update their own post",
  {
    to: authenticatedRole,
    for: "update",
    using: sql`posts.author_id = ${authUid}`,
    withCheck: sql`posts.author_id = ${authUid}`,
  },
);

const authenticatedCanDeleteOwnPost = pgPolicy(
  "Authenticated can delete their own post",
  {
    to: authenticatedRole,
    for: "delete",
    using: sql`posts.author_id = ${authUid}`,
  },
);

const authenticatedCanInsertPost = pgPolicy("Authenticated can insert a post", {
  to: authenticatedRole,
  for: "insert",
  using: sql`true`,
  withCheck: sql`true`,
});

// admin
