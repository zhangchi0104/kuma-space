/** @format */
"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { BaseStyleProps } from "../lib/typings";
import { cn } from "../lib/shadcn";
type ErrorSectionProps = React.PropsWithChildren<
	{
		title?: string;
		description?: string;
		reset?: () => void;
	} & BaseStyleProps
>;
const ErrorSection: React.FC<ErrorSectionProps> = ({
	title = "Oops!",
	description = "Something went wrong",
	children,
	className,
	reset,
}) => {
	return (
		<div className={cn("flex flex-col items-center justify-center", className)}>
			{children || (
				<Image
					unoptimized
					src={"/images/error_01.webp"}
					alt="error"
					width={128}
					height={128}
					className="rounded-md"
				/>
			)}
			<div className="mt-2 my-2 flex flex-col items-center">
				<h2 className="text-lg font-semibold">{title}</h2>
				<p className="text-sm text-muted-foreground">{description}</p>
				{reset && (
					<Button
						className="text-sm mt-5"
						size="sm"
						variant="outline"
						onClick={() => reset()}
					>
						Refresh
					</Button>
				)}
			</div>
		</div>
	);
};

export default ErrorSection;
