/** @format */

import { diffInDays } from "@/src/lib/fns";
import { createServerSideSupabaseClient } from "@/src/lib/supabase/server";
import { getUserLocale } from "@/src/lib/userLocale";
import { getFormatter } from "next-intl/server";
import EmptyFallback from "./empty-fallback";

import type { Locale } from "@/src/i18n/config";
import { PostItem } from "./_internals/post-item";

const fetchPosts = async () => {
	const formatter = await getFormatter();
	const locale = await getUserLocale();
	const supabase = await createServerSideSupabaseClient();
	const { data: posts, error } = await supabase
		.from("posts")
		.select(
			`
			id,
			updated_at,
			posts_content(
				title,
				content
			),
      posts_tags(
        tag
      )
		`,
		)
		.eq("posts_content.language_code", locale as Locale)
		.order("updated_at", { ascending: false });

	if (error) {
		throw error;
	}

	return posts.map((post) => {
		return {
			...post,
			updated_at: new Date(post.updated_at),
			title: post.posts_content[0].title,
			content: post.posts_content[0].content,
			dateString:
				diffInDays(new Date(post.updated_at), new Date()) > 7
					? formatter.dateTime(new Date(post.updated_at), {
							month: "short",
							day: "numeric",
						})
					: formatter.relativeTime(new Date(post.updated_at), new Date()),
		};
	});
};

type Posts = Awaited<ReturnType<typeof fetchPosts>>;
function renderPosts(posts: Posts) {
	return posts.map((post) => {
		return (
			<li
				key={`post-${post.id}`}
				className="grid grid-cols-[auto_1fr] gap-x-6 items-start"
			>
				<div className="text-right text-muted-foreground pt-1 w-28 sticky top-24">
					{post.dateString}
				</div>
				<div className="relative border-l border-border pl-8 space-y-4">
					<PostItem post={post} />
				</div>
			</li>
		);
	});
}

const PostsPage = async () => {
	const posts = await fetchPosts();

	if (posts.length === 0) {
		return <EmptyFallback className="mt-8" />;
	}

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-semibold mb-8">All Posts</h1>
			<ul className="space-y-12 list-none">{renderPosts(posts)}</ul>
		</div>
	);
};

export default PostsPage;
