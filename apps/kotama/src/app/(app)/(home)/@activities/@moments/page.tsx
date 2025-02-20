/** @format */

import { client } from "@/src/apis/client";
import PostsTimeline from "../_internals/posts-timeline";
import { getLocale } from "next-intl/server";
import { PostWithRelativeDate } from "../_internals/props";
import { getFormatter } from "next-intl/server";
import { diffInDays } from "@/src/utils/fns";

const fetchMoments = async (): Promise<PostWithRelativeDate[]> => {
  const locale = await getLocale();
  const formatter = await getFormatter();
  const now = new Date();

  const { data, error } = await client.posts.index.get({
    query: {
      type: "moment",
      languageCode: locale as "zh" | "en",
      limit: 5,
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
const Moments = async () => {
  const moments = await fetchMoments();
  return (
    <PostsTimeline
      posts={moments}
      prefix="Recent Posts"
      className="flex flex-col"
    />
  );
};

export default Moments;
