import { BaseStyleProps } from "@/src/lib/typings";
import Tags from "./tags";
import TagsPopover from "./tags-popover";
import { TagsWithOptionalId } from "./tags-context";

const DUMMY_TAGS: TagsWithOptionalId[] = [
  { id: 1, name: "bug", category: "type" },
  { id: 2, name: "post", category: "category" },
  { id: 3, name: "test", category: "name" },
];
interface TagsSelectProps {
  className?: string;
}
const TagsSelect: React.FC<BaseStyleProps> = ({
  className,
}: TagsSelectProps) => {
  return (
    <div className={className}>
      <Tags initialTags={DUMMY_TAGS}>
        <TagsPopover />
      </Tags>
    </div>
  );
};

export default TagsSelect;
