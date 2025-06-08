/** @format */
"use client";

import ErrorSection from "@/src/components/error-section";
import { NextJsErrorProps } from "@/src/lib/typings";
import { useTranslations } from "next-intl";

const PostsError: React.FC<NextJsErrorProps> = ({ error, reset }) => {
	const t = useTranslations("Common.Error.default");
	return (
		<ErrorSection
			title={t("title")}
			description={t("description")}
			reset={reset}
			className="mt-4"
		/>
	);
};

export default PostsError;
