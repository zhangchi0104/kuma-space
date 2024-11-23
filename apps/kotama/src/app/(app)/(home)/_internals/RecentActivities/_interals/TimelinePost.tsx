/** @format */

import { Post } from '~/utils/typings/api/base';
import { cn } from '~/utils/shadcn';
import { useFormatter } from 'next-intl';

type TimelinePostProps = Post & {
  dataClasses?: string;
  titleClasses?: string;
  refDate: Date;
};
const TimelinePost = ({
  title,
  createdAt,
  refDate,
  dataClasses,
  titleClasses,
}: TimelinePostProps) => {
  const format = useFormatter();
  const timeDiff = refDate.getTime() - createdAt.getTime();

  const relativeDate =
    timeDiff > 1000 * 3600 * 24 * 7
      ? format.dateTime(createdAt, { dateStyle: 'long' })
      : format.relativeTime(createdAt, refDate);
  return (
    <li className='posts-timeline-item grid grid-cols-subgrid col-span-2'>
      <p className={cn('text-right', dataClasses)}>{relativeDate}</p>
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
