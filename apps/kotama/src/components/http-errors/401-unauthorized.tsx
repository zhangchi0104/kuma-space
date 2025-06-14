/** @format */
"use client";

import { useTranslations } from "next-intl";
import ErrorSection from "../error-section";

interface UnauthorizedProps {
	reset?: () => void;
}
const Unauthorized: React.FC<UnauthorizedProps> = ({ reset }) => {
	const t = useTranslations("Common.Error.unauthorized");
	return (
		<ErrorSection
			title={t("title")}
			description={t("description")}
			reset={reset}
		/>
	);
};

export default Unauthorized;
