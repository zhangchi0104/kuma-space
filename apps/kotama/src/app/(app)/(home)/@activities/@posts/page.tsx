/** @format */

import { getFormatter } from "next-intl/server";
import PostsTimeline from "../_internals/posts-timeline";
import { diffInDays } from "@/src/lib/fns";
import { createServerSideSupabaseClient } from "@/src/lib/supabase/server";
import { getUserLocale } from "@/src/lib/userLocale";

const fetchPosts = async () => {
	const formatter = await getFormatter();
	const locale = await getUserLocale();
	const now = new Date();

	const supabase = await createServerSideSupabaseClient();
	const { data: posts, error } = await supabase
		.from("posts")
		.select(`
			id,
			updated_at,
			posts_content:posts_content(
				title
			)
		`)
		.eq("posts_content.language_code", "en")
		.order("updated_at", { ascending: false })
		.limit(5);
	if (error) {
		throw error;
	}
	if (!posts) {
		throw new Error("Failed to fetch posts");
	}

	return posts
		.map((post) => ({
			...post,
			updatedAt: new Date(post.updated_at),
			title: post.posts_content[0].title,
		}))
		.map((post) => ({
			...post,
			dateString:
				diffInDays(now, post.updatedAt) > 7
					? formatter.dateTime(post.updatedAt, {
							dateStyle: "medium",
						})
					: formatter.relativeTime(post.updatedAt, now),
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
