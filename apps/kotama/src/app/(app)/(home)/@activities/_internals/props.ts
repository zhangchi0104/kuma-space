/** @format */

import type { Post, PostContent } from "@repo/db/types";

export type PostWithRelativeDate = Pick<Post, "id"> &
	Pick<PostContent, "title"> & {
		dateString: string;
	};
