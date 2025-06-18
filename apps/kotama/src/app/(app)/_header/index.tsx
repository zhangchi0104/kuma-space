/** @format */
import clsx from "clsx";
import HeaderMenu from "./_internals/header-image";
import ModeToggle from "./_internals/dark-mode-button";
import MobileHeaderMenu from "./_internals/mobile-header-menu";
import DesktopOnlyByCss from "@/src/components/utils/DesktopOnlyByCss";

import LanguageSwitcher from "./_internals/language-switcher";
import type { BaseStyleProps } from "@/src/lib/typings";
import MobileOnlyByCss from "@/src/components/utils/MobileOnlyByCss";
import SignInOut from "./_internals/sign-in-out";
import { Suspense } from "react";
import { Skeleton } from "@/src/components/ui/skeleton";
import { cn } from "@/src/lib/shadcn";

const Header: React.FC<BaseStyleProps> = ({ className }) => {
	const headerContainerStyle = cn(
		"max-w-(--breakpoint-2xl)",
		"h-12",
		"grow",
		"px-8",
		"flex",
		"items-center",
		"justify-between",
		className,
	);
	return (
		<header className="sticky top-0 z-50 flex w-screen justify-center border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
			<div id="header" className={headerContainerStyle}>
				<MobileOnlyByCss>
					<MobileHeaderMenu />
				</MobileOnlyByCss>
				<DesktopOnlyByCss>
					<HeaderMenu className="items-center justify-start flex-row flex grow" />
				</DesktopOnlyByCss>
				<div className="flex items-center justify-center space-x-8">
					<ModeToggle className="h-5 w-5 transition-all" />
					<LanguageSwitcher />
					<Suspense fallback={<Skeleton className="w-5 h-5" />}>
						<SignInOut className="w-5 h-5" />
					</Suspense>
				</div>
			</div>
		</header>
	);
};
export default Header;
