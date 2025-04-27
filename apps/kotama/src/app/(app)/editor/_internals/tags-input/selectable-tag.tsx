"use client";

import { Checkbox } from "@/src/components/ui/checkbox";
import { Tag } from "@repo/db/types";
import { BaseStyleProps } from "@/src/lib/typings";
import { cn } from "@/src/lib/shadcn";

type SelectableTagProps = {
  tag: Tag;
  onSelect?: (tag: Tag) => void;
  onDeselect?: (tag: Tag) => void;
  selected?: boolean;
} & BaseStyleProps;
const SelectableTag = ({
  tag,

  onSelect,
  onDeselect,
  selected,
  ...styleProps
}: SelectableTagProps) => {
  return (
    <div className={cn("flex items-center gap-2 py-1", styleProps)}>
      <Checkbox
        id={`${tag.value}-checkbox`}
        checked={selected}
        onCheckedChange={() => {
          if (selected) {
            onDeselect?.(tag);
          } else {
            onSelect?.(tag);
          }
        }}
      />
      <label
        htmlFor={`${tag.value}-checkbox`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {`${tag.category}:${tag.name}`}
      </label>
    </div>
  );
};

export default SelectableTag;
