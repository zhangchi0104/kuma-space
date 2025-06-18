/** @format */

import PostsTimeline from "../_internals/posts-timeline";
import type { PostWithRelativeDate } from "../_internals/props";
import { getFormatter } from "next-intl/server";
import { diffInDays } from "@/src/lib/fns";
import { momentsTable } from "@repo/db/schema";

import { desc } from "drizzle-orm";
import { createServerSideSupabaseClient } from "@/src/lib/supabase/server";
const fetchMoments = async (): Promise<PostWithRelativeDate[]> => {
	const formatter = await getFormatter();
	const supabase = await createServerSideSupabaseClient();
	const { data: moments, error } = await supabase
		.from("moments")
		.select("*")
		.order("created_at", { ascending: false })
		.limit(5);
	const now = new Date();
	if (error) {
		throw error;
	}
	if (!moments) {
		throw new Error("Failed to fetch moments");
	}

	return moments
		.map((post) => ({ ...post, createdAt: new Date(post.updated_at) }))
		.map((post) => ({
			id: post.id,
			title: post.title,
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
