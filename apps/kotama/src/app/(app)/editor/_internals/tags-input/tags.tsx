"use client";

import { type LocalTag, TagsContext } from "./tags-context";
import { useState } from "react";

const Tags = ({
	initialTags = [],
	children,
}: {
	initialTags?: LocalTag[];
	children: React.ReactNode;
}) => {
	const [tags, setTags] = useState<LocalTag[]>(initialTags);

	return <TagsContext value={{ tags, setTags }}>{children}</TagsContext>;
};

export default Tags;
