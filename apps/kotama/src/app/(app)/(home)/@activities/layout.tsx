/** @format */

import { cn } from '@/src/utils/shadcn';
import React from 'react';
interface ActivitiesLayoutProps {
  moments: React.ReactNode;
  posts: React.ReactNode;
  progress: React.ReactNode;
}
const ActivitiesLayout: React.FC<
  React.PropsWithChildren<ActivitiesLayoutProps>
> = ({ moments, posts, progress }) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-x-12 md:my-16'>
      <div className={cn('flex flex-col items-stretch')}>
        <div>
          <p className='text-xl font-semibold mb-2'>Posts</p>
          {posts}
        </div>
        <div className='mt-6'>
          <p className='text-xl font-semibold mb-2'>Moments</p>
          {moments}
        </div>
      </div>
      <div className='mt-8 sm:mt-0 flex flex-col items-center justify-center'>
        {progress}
      </div>
    </section>
  );
};

export default ActivitiesLayout;
