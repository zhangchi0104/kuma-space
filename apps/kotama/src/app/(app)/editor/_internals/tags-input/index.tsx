import type { BaseStyleProps } from "@/src/lib/typings";
import Tags from "./tags";
import TagsPopover from "./tags-popover";

interface TagsSelectProps {
	className?: string;
}
const TagsSelect: React.FC<BaseStyleProps> = ({
	className,
}: TagsSelectProps) => {
	return (
		<div className={className}>
			<Tags initialTags={[]}>
				<TagsPopover />
			</Tags>
		</div>
	);
};

export default TagsSelect;
