import { createContext, useContext } from "react";
import { Tag } from "@repo/db/types";

interface TagsContextApi {
  tags: Tag[];
  setTags: (tags: Tag[] | ((prev: Tag[]) => Tag[])) => void;
}
export const TagsContext = createContext<TagsContextApi>({
  tags: [],
  setTags: () => {
    throw new Error(
      "setTags must be implemented, did you wrap your component in a <TagsProvider>"
    );
  },
});

export const useTags: () => [
  TagsContextApi["tags"],
  TagsContextApi["setTags"],
] = () => {
  const { tags, setTags } = useContext(TagsContext);
  return [tags, setTags];
};
