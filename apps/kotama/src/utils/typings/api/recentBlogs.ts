/** @format */

import { ApiResponse, Post } from "./base";
export type RecentBlogsResponse = ApiResponse<{
  metadata: Post[];
  nextPageCurrsor: number;
}>;
