/** @format */

import clsx from "clsx";

import { BaseStyleProps } from "@/src/lib/typings";
import HeroContent from "./_internals";
import TrailingText from "./_internals/trailing-text";

const HeroSection = () => {
	return (
		<HeroSectionContainer className="relative">
			<HeroContent className="flex-1" />
			<TrailingText className="self-center absolute bottom-0 -z-10" />
		</HeroSectionContainer>
	);
};

const HeroSectionContainer: React.FC<
	React.PropsWithChildren<BaseStyleProps>
> = ({ children, className }) => {
	const classNames = clsx(
		"flex flex-col mx-auto min-safe-h-screen-minus-header",
		className,
	);
	return <div className={classNames}>{children}</div>;
};
export default HeroSection;
