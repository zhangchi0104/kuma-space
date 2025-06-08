/** @format */
import type { BaseStyleProps } from "@/src/lib/typings";
import { faJava } from "@fortawesome/free-brands-svg-icons/faJava";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/src/lib/shadcn";
import { useTranslations } from "next-intl";
const EmptyFallback: React.FC<BaseStyleProps> = ({ className }) => {
	const t = useTranslations("Home.Activities.Empty");
	return (
		<div className={cn("text-center text-muted-foreground", className)}>
			<FontAwesomeIcon icon={faJava} size="10x" />
			<div className="mt-4">
				<p className="text-lg leading-8">{t("title")}</p>
				<p className="text-sm leading-8">{t("description")}</p>
			</div>
		</div>
	);
};

export default EmptyFallback;
