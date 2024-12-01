/** @format */

import { cn } from '@/src/utils/shadcn';
import React from 'react';
interface ActivitiesLayoutProps {
  moments: React.ReactNode;
  posts: React.ReactNode;
}
const ActivitiesLayout: React.FC<
  React.PropsWithChildren<ActivitiesLayoutProps>
> = ({ moments, posts }) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-x-12'>
      <div
        className={cn('divide-y divide-y-muted flex flex-col items-stretch')}
      >
        <div>
          <p className='text-xl font-semibold'>Posts</p>
          {posts}
        </div>
        <div className='pt-4'>
          <p className='text-xl font-semibold'>Moments</p>
          {moments}
        </div>
      </div>
      <div>{'progress'}</div>
    </section>
  );
};

export default ActivitiesLayout;
