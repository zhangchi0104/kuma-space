/** @format */

import { SunIcon } from '@radix-ui/react-icons';

import { Button } from '@/src/components/ui/button';
import { MoonIcon } from '@radix-ui/react-icons';

import { cn } from '@/src/utils/shadcn';
import { BaseStyleProps } from '@/src/utils/typings';

const DarkModeTrigger: React.FC<BaseStyleProps> = ({ className }) => {
  const classNames = cn('w-5', 'h-5', className);
  const sunIconClassNames = cn(
    'rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0',
    classNames
  );
  const moonIconClassNames = cn(
    'absolute h-[1.25rem] w-[1.25rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
    classNames
  );
  return (
    <Button
      variant='ghost'
      size='icon'
      className='outline-none focus:outline-none transition hover:transition-all'
    >
      <SunIcon className={sunIconClassNames} />
      <MoonIcon className={moonIconClassNames} />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
};

export default DarkModeTrigger;
