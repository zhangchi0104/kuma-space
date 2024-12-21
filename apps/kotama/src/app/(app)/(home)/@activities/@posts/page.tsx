/** @format */

import { getFormatter, getLocale } from "next-intl/server";
import PostsTimeline from "../_internals/PostsTimeline";
import { client } from "@/src/apis/client";
import { PostWithRelativeDate } from "../_internals/props";
import { diffInDays } from "@/src/utils/fns";

const fetchPosts = async (): Promise<PostWithRelativeDate[]> => {
  const locale = await getLocale();
  const formatter = await getFormatter();
  const now = new Date();

  const { data, error } = await client.posts.index.get({
    query: {
      type: "post",
      languageCode: locale as "zh" | "en",
      limit: 5,
      reverse: true,
    },
  });
  if (error) {
    throw error;
  }
  if (!data) {
    return [];
  }

  return data.posts
    .map((post) => ({ ...post, createdAt: new Date(post.createdAt) }))
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
