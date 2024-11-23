/** @format */

export type Post = {
  postId: number;
  title: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type ApiResponse<T> = {
  data: T;
};
