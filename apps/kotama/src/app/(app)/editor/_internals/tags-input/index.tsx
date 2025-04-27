import { BaseStyleProps } from "@/src/lib/typings";
import Tags from "./tags";
import TagsPopover from "./tags-popover";
import { Tag } from "@repo/db/types";

const DUMMY_TAGS: Tag[] = [
  { value: "type:bug", category: "type", name: "bug" },
  { value: "category:post", category: "category", name: "post" },
  { value: "name:test", category: "name", name: "test" },
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
