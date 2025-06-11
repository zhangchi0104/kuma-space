/** @format */

import SocialIcon from "@/src/components/icons/social-icon";
import ownerData from "@/src/app.owner.json";
import PopoutTransition from "@/src/components/popup-transitition";
import type { BaseStyleProps } from "@/src/lib/typings";
import clsx from "clsx";
type SocialIconsProps = BaseStyleProps & {
	delay: number;
	duration: number;
};
const SocialIcons: React.FC<SocialIconsProps> = ({
	className,
	delay,
	duration,
}) => {
	const { social } = ownerData;
	const classNames = clsx(
		"flex",
		"space-x-8",
		"pt-20",
		"items-center",
		"justify-center",
		"sm:justify-start",
		className,
	);
	return (
		<div className={classNames}>
			{Object.entries(social).map(([key, value], index) => (
				<PopoutTransition
					key={`social-icon-${value}`}
					delay={delay + duration * index}
					duration={duration}
				>
					<SocialIcon name={key} id={value} key={`social-${key}`} />
				</PopoutTransition>
			))}
		</div>
	);
};
export default SocialIcons;
