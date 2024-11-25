/** @format */
import { client } from './client';
export const fetchPosts = async () => {
  const { data, error } = await client.posts.index.get({
    query: {
      type: 'post',
      languageCode: 'EN_US',
      limit: 10,
    },
  });
  if (error) {
    throw error;
  }
  return data || [];
};
