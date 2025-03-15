import { createDbClient } from '@repo/db';

import {
  postsContentTable,
  postsTable,
  postsTagsTable,
  tagsTable,
} from '@repo/db/schema';
import { eq, desc, asc } from '@repo/db/drizzle-orm';
import { GetPostsQuery } from '@server/types/schema/posts/requests';
import { IPostDao } from './interfaces';
import { GetPostsResponse } from '@server/types/schema/posts/responses';

export class PostsDao implements IPostDao {
  private readonly db: ReturnType<typeof createDbClient>;

  constructor(db?: ReturnType<typeof createDbClient>) {
    this.db = db ?? createDbClient();
  }

  public async getPosts(query: GetPostsQuery) {
    const { languageCode, limit, cursor, reverse } = query;
    const posts = await this.db
      .select({
        id: postsTable.id,
        updatedAt: postsTable.updatedAt,
        title: postsContentTable.title,
      })
      .from(postsTable)
      .innerJoin(postsContentTable, eq(postsTable.id, postsContentTable.postId))
      .where(eq(postsContentTable.languageCode, languageCode))
      .limit(limit + 1)
      .offset(cursor ?? 0)
      .orderBy(
        reverse ? desc(postsTable.updatedAt) : asc(postsTable.updatedAt),
      );

    return {
      posts: posts.slice(0, limit),
      size: posts.length - 1,
      cursor: posts.length > limit ? posts[posts.length - 1]?.id : undefined,
    } satisfies GetPostsResponse;
  }

  public async getPostById(id: number) {
    const posts = await this.db
      .select({
        id: postsTable.id,
        updatedAt: postsTable.updatedAt,
        title: postsContentTable.title,
        content: postsContentTable.content,
      })
      .from(postsTable)
      .innerJoin(postsContentTable, eq(postsTable.id, postsContentTable.postId))
      .where(eq(postsTable.id, id));
    return posts[0] ?? null;
  }
  public async getTagsByPostId(id: number) {
    const tags = await this.db
      .select({
        value: tagsTable.value,
      })
      .from(tagsTable)
      .innerJoin(postsTagsTable, eq(tagsTable.value, postsTagsTable.tag))
      .where(eq(postsTagsTable.postId, id));
    return tags;
  }
}
