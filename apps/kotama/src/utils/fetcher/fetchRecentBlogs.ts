"user server";

import { RecentBlogsResponse } from "../typings/api/recentBlogs";

export const fetchRecentBlogs = async (
  limit?: number,
  offset?: number,
): Promise<RecentBlogsResponse> => {
  const url = new URL(`${process.env.API_BASE_URL}/blogs`);
  if (limit && limit > 0) {
    url.searchParams.append("pageSize", limit.toString());
  }
  if (offset && offset > 0) {
    url.searchParams.append("nextPageCursor", offset.toString());
  }
  const response = await fetch(url).then((res) => res.json());
  const data = await response.json();
  return data;
};

