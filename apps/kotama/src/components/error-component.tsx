/** @format */

"use client";
import ErrorSection from "@/src/components/error-section";
import type { ErrorProps } from "@repo/types";
import { useTranslations } from "next-intl";
const ErrorComponent = ({ error, reset }: ErrorProps) => {
	const t = useTranslations("Common.Error.default");
	return (
		<ErrorSection
			title={t("title")}
			description={t("description")}
			reset={reset}
		/>
	);
};

export default ErrorComponent;
