/** @format */

import { Post } from '@/src/utils/typings/api/base';

export type PostWithRelativeDate = Omit<Post, 'createdAt' | 'updatedAt'> & {
  dateString: string;
};
