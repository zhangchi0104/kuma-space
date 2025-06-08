import { BaseStyleProps } from "../lib/typings";
import { Badge } from "./ui/badge";
import { cn } from "../lib/shadcn";
import { LocalTag } from "../app/(app)/editor/_internals/tags-input/tags-context";
type TagsListProps = {
	tags: LocalTag[];
} & BaseStyleProps;
const TagsList = ({ tags, ...styleProps }: TagsListProps) => {
	const emptyContent = <p className="text-md text-muted-foreground">No tags</p>;
	const tagsContent = tags.map((tag) => (
		<Badge
			key={`tag-list-${tag.value}`}
			className={cn("rounded-full", !tag.settled && "opacity-50")}
		>
			{tag.value}
		</Badge>
	));
	return (
		<div {...styleProps}>{tags.length > 0 ? tagsContent : emptyContent}</div>
	);
};

export default TagsList;
