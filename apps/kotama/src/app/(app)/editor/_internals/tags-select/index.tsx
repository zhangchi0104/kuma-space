"use client";

import { Button } from "@/src/components/ui/button";
import { BaseStyleProps } from "@/src/utils/typings";
import { useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import TagsInput from "./tags-input";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/utils/shadcn";
type TagsSelectorProps = React.PropsWithChildren<{} & BaseStyleProps>;
const TagsSelector: React.FC<TagsSelectorProps> = ({ className }) => {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  // register keydown event
  const onTextChange = (value: string) => {
    setInputValue(value);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (inputValue === "") {
        e.preventDefault();
        setTags((prev) => prev.slice(0, -1));
      }
    } else if (e.key === " ") {
      e.preventDefault();
      const value = inputValue.trim().toLowerCase();
      console.log("value", value);
      if (value) {
        setTags((prev) => [...prev, value]);
        setInputValue("");
      }
    }
  };
  return (
    <div>
      <Command className={cn("rounded-md border")}>
        <div className="flex items-center gap-2 px-2">
          {tags.map((tag) => (
            <Badge key={tag} className="rounded-full bg-slate-500">
              {tag}
            </Badge>
          ))}
          <CommandInput
            value={inputValue}
            onValueChange={onTextChange}
            onKeyDown={onKeyDown}
            containerClassName="px-1 flex-grow"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>

        <CommandList className={cn(focused && "border-t")}>
          {focused && (
            <>
              <CommandEmpty className="py-1.5 px-2 text-start text-sm">
                <p>
                  Create tag{" "}
                  <span className="font-semibold">{`"${inputValue}"`}</span>
                </p>
              </CommandEmpty>
              <CommandItem>Foo</CommandItem>
              <CommandItem>Bar</CommandItem>
            </>
          )}
        </CommandList>
      </Command>
    </div>
  );
};

export default TagsSelector;
