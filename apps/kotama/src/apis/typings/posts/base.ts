/** @format */

import { client } from "~/apis/client";

export type Post = Exclude<
  Awaited<ReturnType<typeof client.posts.index.get>>["data"],
  null
>["posts"][number];
export type ApiResponse<T> = {
  data: T;
};
