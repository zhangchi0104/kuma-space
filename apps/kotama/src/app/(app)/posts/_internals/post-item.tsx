/** @format */

import Link from "next/link";

interface PostItemProps {
	post: {
		id: number;
		title: string;
		content: string;
		posts_tags: { tag: string }[];
	};
}
export function PostItem({ post }: PostItemProps) {
	return (
		<Link href={`/posts/${post.id}`} key={post.id}>
			<div className="group">
				<h2 className="font-semibold text-lg group-hover:text-primary transition-colors">
					{post.title}
				</h2>
				{/* <p className="text-muted-foreground mt-1 line-clamp-2">
					{post.content}
				</p> */}
			</div>
			<div className="mt-2 flex flex-wrap gap-2">
				{post.posts_tags.map((tag) => (
					<span key={tag.tag} className="text-sm text-muted-foreground">
						{`#${tag.tag}`}
					</span>
				))}
			</div>
		</Link>
	);
}
