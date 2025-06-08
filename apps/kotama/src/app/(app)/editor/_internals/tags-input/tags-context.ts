import { createContext, useContext, useMemo } from "react";
import { Tag } from "@repo/db/types";
export type LocalTag = Tag & { settled: boolean };
interface TagsContextApi {
	tags: LocalTag[];
	setTags: (tags: LocalTag[] | ((prev: LocalTag[]) => LocalTag[])) => void;
}
export const TagsContext = createContext<TagsContextApi>({
	tags: [],
	setTags: () => {
		throw new Error(
			"setTags must be implemented, did you wrap your component in a <TagsProvider>",
		);
	},
});

export const useTags = () => {
	const { tags, setTags } = useContext(TagsContext);
	const tagsSet = useMemo(() => new Set(tags.map((tag) => tag.value)), [tags]);
	return { tags, setTags, tagsSet };
};
