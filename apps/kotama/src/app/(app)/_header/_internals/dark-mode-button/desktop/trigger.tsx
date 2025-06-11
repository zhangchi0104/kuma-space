/** @format */

import { SunIcon } from "@radix-ui/react-icons";

import { Button } from "@/src/components/ui/button";
import { MoonIcon } from "@radix-ui/react-icons";

import { cn } from "@/src/lib/shadcn";
import type { BaseStyleProps } from "@/src/lib/typings";

const DarkModeTrigger: React.FC<BaseStyleProps> = ({ className }) => {
	const classNames = cn("w-5", "h-5", className);
	const sunIconClassNames = cn(
		"rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
		classNames,
	);
	const moonIconClassNames = cn(
		"absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
		classNames,
	);
	return (
		<Button
			variant="ghost"
			size="icon"
			className="outline-hidden focus:outline-hidden transition hover:transition-all"
		>
			<SunIcon className={sunIconClassNames} />
			<MoonIcon className={moonIconClassNames} />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
};

export default DarkModeTrigger;
