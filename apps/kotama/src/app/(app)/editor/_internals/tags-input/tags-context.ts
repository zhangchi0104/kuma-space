import { createContext, useContext } from "react";
import { Tag } from "@repo/db";

interface TagsContextApi {
  tags: TagsWithOptionalId[];
  setTags: (
    tags:
      | TagsWithOptionalId[]
      | ((prev: TagsWithOptionalId[]) => TagsWithOptionalId[])
  ) => void;
}
export const TagsContext = createContext<TagsContextApi>({
  tags: [],
  setTags: () => {
    throw new Error(
      "setTags must be implemented, did you wrap your component in a <TagsProvider>"
    );
  },
});

export type TagsWithOptionalId = Omit<Tag, "id"> & { id?: number };
export const useTags: () => [
  TagsContextApi["tags"],
  TagsContextApi["setTags"],
] = () => {
  const { tags, setTags } = useContext(TagsContext);
  return [tags, setTags];
};
