/** @format */

import { cn } from '@/src/utils/shadcn';
import React from 'react';
interface ActivitiesLayoutProps {
  moments: React.ReactNode;
  posts: React.ReactNode;
  roadmap: React.ReactNode;
}
const ActivitiesLayout: React.FC<
  React.PropsWithChildren<ActivitiesLayoutProps>
> = ({ moments, posts, roadmap }) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-x-12 md:my-16 my-8'>
      <div className={cn('flex flex-col items-stretch')}>
        <div>
          <p className='text-2xl font-semibold mb-2'>Posts</p>
          {posts}
        </div>
        <div className='mt-6'>
          <p className='text-2xl font-semibold mb-2'>Moments</p>
          {moments}
        </div>
      </div>
      <div className='mt-8 sm:mt-0'>
        <p className='text-2xl font-semibold mb-2'>Roadmap</p>
        {roadmap}
      </div>
    </section>
  );
};

export default ActivitiesLayout;
