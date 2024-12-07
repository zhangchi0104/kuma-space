/** @format */

import { Post } from "@/src/apis/typings/posts/base";

export type PostWithRelativeDate = Omit<Post, "createdAt" | "updatedAt"> & {
  dateString: string;
};
