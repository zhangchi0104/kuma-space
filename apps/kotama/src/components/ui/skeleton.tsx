import { cn } from "@/src/lib/shadcn";

function Skeleton({ className, ...props }: React.ComponentPropsWithRef<"div">) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-primary/10", className)}
			{...props}
		/>
	);
}

export { Skeleton };
