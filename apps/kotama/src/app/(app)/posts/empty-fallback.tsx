/** @format */

import type { BaseStyleProps } from "@/src/lib/typings";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/src/lib/shadcn";

const EmptyFallback: React.FC<BaseStyleProps> = ({ className }) => {
	return (
		<div
			className={cn(
				"text-center text-muted-foreground flex flex-col items-center justify-center h-full",
				className,
			)}
		>
			<FontAwesomeIcon icon={faFileLines} size="10x" />
			<div className="mt-4">
				<p className="text-lg leading-8">No posts yet</p>
				<p className="text-sm leading-8">
					There are no posts here yet. Check back later!
				</p>
			</div>
		</div>
	);
};

export default EmptyFallback;
