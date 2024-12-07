/** @format */

import { cn } from '@/src/utils/shadcn';
import { useTranslations } from 'next-intl';
import React from 'react';

interface ActivitiesLayoutProps {
  moments: React.ReactNode;
  posts: React.ReactNode;
  roadmap: React.ReactNode;
}
const ActivitiesLayout: React.FC<
  React.PropsWithChildren<ActivitiesLayoutProps>
> = ({ moments, posts, roadmap }) => {
  const t = useTranslations('Home.Activities');
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-x-12 md:my-16 my-8'>
      <div className={cn('flex flex-col items-stretch')}>
        <div>
          <p className='text-2xl font-semibold mb-2'>{t('Posts.title')}</p>
          {posts}
        </div>
        <div className='mt-6'>
          <p className='text-2xl font-semibold mb-2'>{t('Moments.title')}</p>
          {moments}
        </div>
      </div>
      <div className='mt-8 sm:mt-0 flex flex-col w-full'>
        <p className='text-2xl font-semibold mb-2'>{t('Roadmap.title')}</p>
        {roadmap}
      </div>
    </section>
  );
};

export default ActivitiesLayout;
