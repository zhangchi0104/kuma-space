/** @format */
'use client';

import ErrorSection from '@/src/components/ErrorSection';
import { NextJsErrorProps } from '~/utils/typings';
import { useTranslations } from 'next-intl';

const PostsError: React.FC<NextJsErrorProps> = ({ error, reset }) => {
  const t = useTranslations('Common.Error');
  return (
    <ErrorSection
      title={t('title')}
      description={t('description')}
      reset={reset}
      className='mt-4'
    />
  );
};

export default PostsError;
