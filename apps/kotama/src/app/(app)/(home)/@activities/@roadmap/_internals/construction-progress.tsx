/** @format */

import { Progress } from "@/src/components/ui/progress";
import { capitalize } from "@/src/lib/fns";
import { cn } from "@/src/lib/shadcn";
import type { BaseStyleProps } from "@/src/lib/typings";

/** @format */
type ConstructionData = Record<string, { done: number; total: number }>;
type ConstructionProgressProps = {
	segments: ConstructionData;
} & BaseStyleProps;
const ConstructionProgress: React.FC<ConstructionProgressProps> = ({
	segments,
	className,
}) => {
	return (
		<div className={cn("flex flex-row", className)}>
			<div className="grow space-y-6 mt-4">
				{Object.entries(segments).map(([key, value]) => (
					<div className="w-full" key={`ConstructionProgress-${key}`}>
						<p className="text-sm flex flex-row justify-between">
							<span>{capitalize(key)}</span>
							<span className="text-muted-foreground">
								{((value.done / Math.max(1, value.total)) * 100).toFixed(0)}
								{"%"}
							</span>
						</p>
						<Progress
							className="h-4 mt-2"
							key={key}
							value={(value.done / value.total) * 100}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default ConstructionProgress;
