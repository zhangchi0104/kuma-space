/** @format */

import { cn } from '~/utils/shadcn';

import { PostWithRelativeDate } from './props';

type TimelinePostProps = PostWithRelativeDate & {
  dataClasses?: string;
  titleClasses?: string;
  dateString: string;
};
const TimelinePost = ({
  title,
  dateString,
  dataClasses,
  titleClasses,
}: TimelinePostProps) => {
  return (
    <li className='posts-timeline-item grid grid-cols-subgrid col-span-2 text-sm md:text-md'>
      <p className={cn('text-right', dataClasses)}>{dateString}</p>
      <p
        className={cn(
          'grow vertical-timeline-item before:bg-teal-500 after:bg-teal-500',
          titleClasses
        )}
      >
        {title}
      </p>
    </li>
  );
};
export default TimelinePost;
