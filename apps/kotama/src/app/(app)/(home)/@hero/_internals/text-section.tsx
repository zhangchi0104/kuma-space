/** @format */

import AnimatedText from "@/src/components/animated-text";
import type { BaseStyleProps } from "@/src/lib/typings";
import clsx from "clsx";
import { useTranslations } from "next-intl";
// import AnimatedText from '~/components/AnimatedText';
type TextSectionProps = BaseStyleProps & {
	duration?: number;
};
const TextSection: React.FC<TextSectionProps> = ({ className, duration }) => {
	const t = useTranslations("Home.Hero");
	const greetingStyle = clsx(
		"text-2xl",
		"md:text-4xl",
		"sm:text-3xl",
		"whitespace-pre",
		"leading-8",
		"md:leading-14",
		"pb-4",
		className,
	);
	return (
		<div className="text-center sm:text-left">
			<AnimatedText
				className={greetingStyle}
				text={t("greeting")}
				duration={duration}
				hideCursorAfterAnimation
			/>
		</div>
	);
};
export default TextSection;
