/** @format */

import { getFormatter } from "next-intl/server";
import PostsTimeline from "../_internals/posts-timeline";
import { PostWithRelativeDate } from "../_internals/props";
import { diffInDays } from "@/src/lib/fns";
import { getDatabaseClient } from "@/src/lib/database";
import { postsContentTable, postsTable } from "@repo/db/schema";
import { eq, desc } from "drizzle-orm";

const fetchPosts = async (): Promise<PostWithRelativeDate[]> => {
  const formatter = await getFormatter();

  const now = new Date();

  const db = await getDatabaseClient();
  const posts = await db(async (tx) => {
    const posts = await tx
      .select({
        id: postsTable.id,
        createdAt: postsTable.createdAt,
        updatedAt: postsTable.updatedAt,
        title: postsContentTable.title,
      })
      .from(postsTable)
      .innerJoin(postsContentTable, eq(postsTable.id, postsContentTable.postId))
      .orderBy(desc(postsTable.createdAt))
      .limit(5);
    return posts;
  });
  return posts
    .map((post) => ({ ...post, createdAt: new Date(post.updatedAt) }))
    .map((post) => ({
      ...post,
      dateString:
        diffInDays(now, post.createdAt) > 7
          ? formatter.dateTime(post.createdAt, {
              dateStyle: "medium",
            })
          : formatter.relativeTime(post.createdAt, now),
    }));
};

const Posts = async () => {
  const posts = await fetchPosts();
  return (
    <PostsTimeline
      posts={posts}
      prefix="Recent Posts"
      className="flex flex-col"
    />
  );
};

export default Posts;
