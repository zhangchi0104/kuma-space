"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import { useMemo, useState } from "react";
import { useTags } from "./tags-context";
import SelectableTag from "./selectable-tag";
import { Tag } from "@repo/db/types";
const ALL_TAGS: Tag[] = [
  { value: "type:bug", category: "type", name: "bug" },
  { value: "category:post", category: "category", name: "post" },
  { value: "name:test", category: "name", name: "test" },
];
const TagsSelect = () => {
  const [searchText, setSearchText] = useState("");
  const [tags, setTags] = useTags();
  const tagsSet = useMemo(
    () => new Set(tags.map((tag) => `${tag.category}:${tag.name}`)),
    [tags]
  );
  console.log("tags in tags select", tags);
  return (
    <Command>
      <CommandInput
        placeholder="Search tags..."
        value={searchText}
        onValueChange={(value) => setSearchText(value)}
      />
      <CommandList>
        <CommandEmpty>
          {tags.length === 0 && searchText.length === 0 ? (
            <p>No tags found</p>
          ) : (
            <p>
              Create{" "}
              <span className="text-primary font-bold">{`"${searchText}"`}</span>
            </p>
          )}
        </CommandEmpty>
        {ALL_TAGS.map((tag) => (
          <CommandItem key={`tag-${tag.name}-${tag.category}`}>
            <SelectableTag
              tag={tag}
              selected={tagsSet.has(`${tag.category}:${tag.name}`)}
              onSelect={(t) => setTags([...tags, t])}
              onDeselect={(t) =>
                setTags(
                  tags.filter(
                    (_t) => _t.category !== t.category || _t.name !== t.name
                  )
                )
              }
            />
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
};

export default TagsSelect;
