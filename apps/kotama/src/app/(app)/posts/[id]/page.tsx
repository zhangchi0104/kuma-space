import { createServerSideSupabaseClient } from "@/src/lib/supabase/server";
import { getUserLocale } from "@/src/lib/userLocale";
import type { Locale } from "@/src/i18n/config";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";

const fetchPost = async (id: number) => {
	const supabase = await createServerSideSupabaseClient();
	const locale = await getUserLocale();
	const { data, error } = await supabase
		.from("posts")
		.select(
			`
      id,
      posts_content(
        title,
        content
      )`,
		)
		.eq("id", id)
		.eq("posts_content.language_code", locale as Locale)
		.single();
	if (error) {
		throw error;
	}
	return {
		...data,
		postContent: data?.posts_content[0].content,
	};
};

const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const numberId = Number.parseInt(id);
	if (Number.isNaN(numberId)) {
		return notFound();
	}
	const post = await fetchPost(numberId);
	return (
		<div>
			<p className="text-4xl text-center">{post.posts_content[0].title}</p>
			<div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-invert">
				<MDXRemote source={post.postContent} />
			</div>
		</div>
	);
};

export default PostPage;
