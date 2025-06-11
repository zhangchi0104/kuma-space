/** @format */

"use client";
import { DesktopIcon, MoonIcon } from "@radix-ui/react-icons";

import { Switch } from "@/src/components/ui/switch";
import { SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { cn } from "@/src/lib/shadcn";
import type { BaseStyleProps } from "@/src/lib/typings";
import { Button } from "@/src/components/ui/button";
import { DialogFooter } from "@/src/components/ui/dialog";
import { useTranslations } from "next-intl";

const DarkModeDrawerContent: React.FC<BaseStyleProps> = ({ className }) => {
	const { setTheme, theme } = useTheme();
	const t = useTranslations("Header.DarkModeToggle");
	return (
		<>
			<div
				className={cn(
					"flex flex-row items-center justify-center gap-4",
					className,
				)}
			>
				<SunIcon className="w-5 h-5" />
				<Switch
					checked={theme === "dark"}
					className="w-16 h-9"
					thumbClassName="w-7 h-7 data-[state=checked]:translate-x-7"
					onCheckedChange={(checked) => {
						setTheme(checked ? "dark" : "light");
					}}
				/>
				<MoonIcon className="w-5 h-5" />
			</div>
			<DialogFooter className="flex items-center justify-center mt-12">
				<Button className="self-end" onClick={() => setTheme("system")}>
					<DesktopIcon className="w-4 h-4 mr-2" />
					<p>{t("system")}</p>
				</Button>
			</DialogFooter>
		</>
	);
};
export default DarkModeDrawerContent;
