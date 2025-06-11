"use client";

import { Checkbox } from "@/src/components/ui/checkbox";
import type { Tag } from "@repo/db/types";
import type { BaseStyleProps } from "@/src/lib/typings";
import { cn } from "@/src/lib/shadcn";
import { useTags } from "./tags-context";

type SelectableTagProps = {
	tag: Tag;
} & BaseStyleProps;
const SelectableTag = ({ tag, ...styleProps }: SelectableTagProps) => {
	const { setTags, tagsSet } = useTags();

	return (
		<div className={cn("flex items-center gap-2 py-1", styleProps)}>
			<Checkbox
				id={`${tag.value}-checkbox`}
				checked={tagsSet.has(tag.value)}
				onCheckedChange={() => {
					if (tagsSet.has(tag.value)) {
						setTags((tags) => tags.filter((t) => t.value !== tag.value));
					} else {
						setTags((tags) => [...tags, { ...tag, settled: true }]);
					}
				}}
			/>
			<label
				htmlFor={`${tag.value}-checkbox`}
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{tag.value}
			</label>
		</div>
	);
};

export default SelectableTag;
