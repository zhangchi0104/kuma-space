/** @format */

import PostsTimeline from "../_internals/posts-timeline";
import type { PostWithRelativeDate } from "../_internals/props";
import { getFormatter } from "next-intl/server";
import { diffInDays } from "@/src/lib/fns";
import { momentsTable } from "@repo/db/schema";
import { getDatabaseClient } from "@/src/lib/database";
import { desc } from "drizzle-orm";
const fetchMoments = async (): Promise<PostWithRelativeDate[]> => {
	const formatter = await getFormatter();
	const now = new Date();

	const db = await getDatabaseClient();
	const moments = await db(async (tx) => {
		const moments = await tx
			.select()
			.from(momentsTable)
			.orderBy(desc(momentsTable.createdAt))
			.limit(5);
		return moments;
	});

	return moments
		.map((post) => ({ ...post, createdAt: new Date(post.updatedAt) }))
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
