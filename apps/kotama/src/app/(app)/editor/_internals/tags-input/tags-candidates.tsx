import { BaseStyleProps } from "@/src/lib/typings";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import useClientSideSupabase from "@/src/lib/hooks/data";
import { cn } from "@/src/lib/shadcn";
import {
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import SelectableTag from "./selectable-tag";
import { useTags } from "./tags-context";
import { useMemo, useState } from "react";
import { createTag } from "./tags-actions";
import { PlusIcon } from "@radix-ui/react-icons";

type ParsedQuery = {
  isValid: boolean;
  category?: string;
  name?: string;
};

type TagsCandidatesProps = {
  query: string;
} & BaseStyleProps;

const TagsCandidates: React.FC<TagsCandidatesProps> = ({
  className,
  query,
}) => {
  const supabase = useClientSideSupabase();
  const queryClient = useQueryClient();
  const { setTags } = useTags();
  const [isCreating, setIsCreating] = useState(false);
  const { data } = useSuspenseQuery({
    queryKey: ["tags", query],

    queryFn: async () => {
      const { data, error } =
        query.length === 0
          ? await supabase.from("tags").select("*").limit(5)
          : await supabase
              .from("tags")
              .select("*")
              .ilike("value", `%${query}%`)
              .limit(10);
      if (error) {
        throw error;
      }
      return data;
    },
  });

  const parsedQuery = useMemo(() => {
    const parts = query.split(":");

    return {
      category: parts[0],
      name: parts.length > 1 ? parts[1] : null,
    };
  }, [query]);
  const isQueryCreatable = useMemo(() => {
    return !isCreating && query && query.trim().length > 0;
  }, [isCreating, query]);
  const handleCreateTag = async () => {
    console.log("isQueryCreatable", isQueryCreatable);
    if (!isQueryCreatable) {
      console.warn("Query is not creatable");
      return;
    }

    setIsCreating(true);
    setTags((prevTags) => [
      ...prevTags,
      {
        name: parsedQuery.name,
        category: parsedQuery.category,
        value: query,
        settled: false,
      },
    ]);

    try {
      await createTag(query);
      setTags((prevTags) => {
        const addedIndex = prevTags.findIndex(
          (tag) => tag.value === query && !tag.settled
        );
        if (addedIndex === -1) {
          console.warn(
            "Optimistically added tag not found for settlement, or already settled:",
            query
          );
          return prevTags;
        }
        const updatedTags = [...prevTags];
        updatedTags[addedIndex] = { ...updatedTags[addedIndex], settled: true };
        return updatedTags;
      });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    } catch (error) {
      console.error("Failed to create tag:", error);
      setTags((prevTags) => prevTags.filter((tag) => tag.value !== query));
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <CommandList className="w-full">
      <CommandEmpty
        className={cn(
          "flex flex-col items-center justify-center h-20",
          isQueryCreatable && "hover:cursor-pointer",
          !isQueryCreatable &&
            "hover:cursor-not-allowed bg-muted text-muted-foreground"
        )}
        onClick={handleCreateTag}
      >
        <p>
          Create tag: <strong>{query}</strong>
        </p>
      </CommandEmpty>
      <div className={cn(className)}>
        {data.map((tag) => (
          <CommandItem key={tag.value}>
            <SelectableTag tag={tag} />
          </CommandItem>
        ))}
        {data.length > 0 &&
          data.findIndex((tag) => tag.value === query) === -1 &&
          isQueryCreatable && (
            <CommandItem className="hover:cursor-pointer bg-gray-100">
              <p
                className="flex items-center gap-2 flex-row"
                onClick={handleCreateTag}
              >
                <span>
                  <PlusIcon />
                </span>
                Create tag: <strong>{query}</strong>
              </p>
            </CommandItem>
          )}
      </div>
    </CommandList>
  );
};
export default TagsCandidates;
