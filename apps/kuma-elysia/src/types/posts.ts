export type Post = {
  PostId: string;
  Title: string;
  Content: string;
  CreatedAtUtc: string;
  LanguageCode: string;
  UpdatedAtUtc: string;
  IsDeleted: boolean;
  DeletedAtUtc: string;
};
export type PostMetadata = Omit<Post, 'Content'>;
export type GetPostsRequest = {
  languageCode: string;
  offset?: string;
  limit?: number;
};
export type GetPostsResponse = {
  posts: PostMetadata[];
  cursor?: string;
};
