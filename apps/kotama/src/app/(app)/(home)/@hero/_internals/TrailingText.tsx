/** @format */

import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import clsx from 'clsx';
import { BaseStyleProps } from '~/utils/typings';

const TrailingText: React.FC<BaseStyleProps> = ({ className }) => {
  const classNames = clsx(
    'flex flex-col relative items-center text-muted-foreground animate-bounce-calmer',
    className
  );
  return (
    <div className={classNames}>
      <p className='text-md'>Let&apos;s Unpack</p>
      <ChevronDownIcon className='relative w-8 h-6' />
    </div>
  );
};
export default TrailingText;
