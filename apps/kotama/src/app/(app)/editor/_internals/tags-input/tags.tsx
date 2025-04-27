"use client";

import { TagsContext } from "./tags-context";
import { useState } from "react";
import { Tag } from "@repo/db/types";

const Tags = ({
  initialTags = [],
  children,
}: {
  initialTags?: Tag[];
  children: React.ReactNode;
}) => {
  const [tags, setTags] = useState<Tag[]>(initialTags);

  return <TagsContext value={{ tags, setTags }}>{children}</TagsContext>;
};

export default Tags;
