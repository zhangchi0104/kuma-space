"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import { Suspense, useState } from "react";
import { useTags } from "./tags-context";

import TagsCandidates from "./tags-candidates";

import { useDebounceValue } from "usehooks-ts";

import { Input } from "@/src/components/ui/input";
const TagsSelect = () => {
  const { tags } = useTags();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useDebounceValue("", 200);
  return (
    <Command className="w-full">
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setDebouncedQuery(e.target.value);
        }}
        placeholder="Search tags..."
        className="border-none rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <div>
        <Suspense
          fallback={
            <CommandList>
              <CommandEmpty className="flex flex-col items-center justify-center h-20">
                <div className="text-md text-muted-foreground">Loading...</div>
              </CommandEmpty>
            </CommandList>
          }
        >
          <TagsCandidates query={debouncedQuery} />
        </Suspense>
      </div>
    </Command>
  );
};

export default TagsSelect;
