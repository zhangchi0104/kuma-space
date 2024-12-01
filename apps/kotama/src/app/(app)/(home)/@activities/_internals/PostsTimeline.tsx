/** @format */

import { cn } from '@/src/utils/shadcn';
import { BaseStyleProps } from '@/src/utils/typings';

import { useCallback } from 'react';
import TimelinePost from './TimelinePost';
import ListView from '@/src/components/VerticalListView';
import PostsTimelineEmptyFallback from './PostsTmelineEmptyFallback';
import { PostWithRelativeDate } from './props';

type PostsTimelineProps = {
  posts: PostWithRelativeDate[];
  prefix: string;
} & BaseStyleProps;
const PostsTimeline: React.FC<PostsTimelineProps> = ({
  posts,
  prefix,
  className,
}) => {
  const renderFn = useCallback((it: PostWithRelativeDate, index: number) => {
    const commonClass = cn('py-3', 'self-center');
    const dateClasses = cn(commonClass, 'mr-4 text-muted-foreground');
    const titleClasses = cn(commonClass, 'pl-6 text-foreground');
    return (
      <TimelinePost
        {...it}
        key={`timeline-post-${index}`}
        dataClasses={dateClasses}
        titleClasses={titleClasses}
      />
    );
  }, []);

  return (
    <div className={className}>
      <ListView
        emptyFallback={<PostsTimelineEmptyFallback className={'w-full mt-6'} />}
        id={`${prefix}-timeline`}
        as='ul'
        className={cn(
          'grid grid-cols-[auto_1fr] posts-timeline mt-2 mx-4 self-center'
        )}
        data={posts}
        render={renderFn}
      />
    </div>
  );
};

export default PostsTimeline;
