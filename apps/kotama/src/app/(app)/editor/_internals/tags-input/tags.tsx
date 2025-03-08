"use client";

import { TagsContext, TagsWithOptionalId } from "./tags-context";
import { useState } from "react";

const Tags = ({
  initialTags = [],
  children,
}: {
  initialTags?: TagsWithOptionalId[];
  children: React.ReactNode;
}) => {
  const [tags, setTags] = useState<TagsWithOptionalId[]>(initialTags);

  return <TagsContext value={{ tags, setTags }}>{children}</TagsContext>;
};

export default Tags;
