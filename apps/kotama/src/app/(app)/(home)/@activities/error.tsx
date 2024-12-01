/** @format */
'use client';

import ErrorSection from '@/src/components/ErrorSection';
import { NextJsErrorProps } from '@/src/utils/typings';

const PostsError: React.FC<NextJsErrorProps> = ({ error, reset }) => {
  return <ErrorSection reset={reset} />;
};

export default PostsError;
