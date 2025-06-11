/** @format */

import { Skeleton } from "@/src/components/ui/skeleton";

const PostsLoading = () => {
	return (
		<div className="space-y-5">
			<Skeleton className="h-5 w-full" />
			<Skeleton className="h-5 w-full" />
			<Skeleton className="h-5 w-full" />
			<Skeleton className="h-5 w-full" />
			<Skeleton className="h-5 w-full" />
		</div>
	);
};

export default PostsLoading;
