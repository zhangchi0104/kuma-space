import { Post, Tag } from '@repo/db/types';
import {
  GetMomentsQuery,
  GetPostsQuery,
} from '@server/types/schema/posts/requests';
import {
  GetPostsResponse,
  GetPostByIdResponse,
  GetMomentsResponse,
} from '@server/types/schema/posts/responses';

export interface IPostDao {
  getPosts: (query: GetPostsQuery) => Promise<GetPostsResponse>;
  getPostById: (id: number) => Promise<GetPostByIdResponse | null>;
  getTagsByPostId: (id: number) => Promise<Pick<Tag, 'value'>[]>;
  getMoments: (query: GetMomentsQuery) => Promise<GetMomentsResponse>;
}
