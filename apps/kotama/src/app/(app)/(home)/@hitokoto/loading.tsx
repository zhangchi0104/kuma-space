/** @format */

import { Skeleton } from "@/src/components/ui/skeleton";

const HitokotoLoading = () => {
	return (
		<div className="flex flex-col justify-center py-12 max-w-lg mx-auto">
			<Skeleton className="h-5 w-4/5 self-start" />
			<Skeleton className="h-5 w-1/3 self-end mt-3" />
		</div>
	);
};

export default HitokotoLoading;
