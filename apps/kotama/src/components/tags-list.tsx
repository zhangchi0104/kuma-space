import { TagsWithOptionalId } from "@/src/app/(app)/editor/_internals/tags-input/tags-context";
import { BaseStyleProps } from "../lib/typings";
import { Badge } from "./ui/badge";
type TagsListProps = {
  tags: TagsWithOptionalId[];
} & BaseStyleProps;
const TagsList = ({ tags, ...styleProps }: TagsListProps) => {
  const emptyContent = <p className="text-md text-muted-foreground">No tags</p>;
  const tagsContent = tags.map((tag) => (
    <Badge
      key={`tag-list-${tag.category}:${tag.name}`}
    >{`${tag.category}:${tag.name}`}</Badge>
  ));
  return (
    <div {...styleProps}>{tags.length > 0 ? tagsContent : emptyContent}</div>
  );
};

export default TagsList;
