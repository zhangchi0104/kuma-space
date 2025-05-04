import { Tag } from "@repo/db/types";
import { BaseStyleProps } from "../lib/typings";
import { Badge } from "./ui/badge";
type TagsListProps = {
  tags: Tag[];
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
