/** @format */

"use client";

import type * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/src/lib/shadcn";

const Progress = ({
	ref,
	className,
	value,
	...props
}: React.ComponentPropsWithRef<typeof ProgressPrimitive.Root>) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn(
			"relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
			className,
		)}
		{...props}
	>
		<ProgressPrimitive.Indicator
			className="h-full w-full flex-1 bg-primary transition-all"
			style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
		/>
	</ProgressPrimitive.Root>
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
