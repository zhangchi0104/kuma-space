"use client";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/src/components/ui/popover";
import { useTags } from "./tags-context";
import TagsList from "@/src/components/tags-list";
import TagsSelect from "./tags-select";
const TagsPopover = () => {
	const { tags } = useTags();
	return (
		<Popover>
			<PopoverTrigger asChild className="flex items-center gap-2 relative">
				<TagsList
					tags={tags}
					className="w-full border rounded-md py-1.5 px-4"
				/>
			</PopoverTrigger>
			<PopoverContent align="start" className="p-0">
				<TagsSelect />
			</PopoverContent>
		</Popover>
	);
};

export default TagsPopover;
