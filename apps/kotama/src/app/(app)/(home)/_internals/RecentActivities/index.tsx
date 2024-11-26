/** @format */

import { Post } from '@/src/utils/typings/api/base';
import { cn } from '~/utils/shadcn';
import { BaseStyleProps } from '~/utils/typings';

import PostsTimeline from './_interals/PostsTimeline';

/** @format */
type RecentActivitiesProps = BaseStyleProps;
export const RecentActivities = async ({
  className,
}: RecentActivitiesProps) => {
  const refDate = new Date();
  return (
    <div
      className={cn(
        'divide-y divide-y-muted flex flex-col items-stretch',
        className
      )}
    >
      <PostsTimeline
        posts={[]}
        heading='Recent Posts'
        className='flex flex-col mb-4'
        refDate={refDate}
      />
      <PostsTimeline
        refDate={refDate}
        posts={[]}
        heading='Moments'
        className='flpt-4'
      />
    </div>
  );
};

export default RecentActivities;
