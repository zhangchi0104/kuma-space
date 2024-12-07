/** @format */

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Button } from '@/src/components/ui/button';
import clsx from 'clsx';

import DarkModeButtonContent from './DarkModeButtonContent';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';

export function ModeToggle({ className }: { className?: string }) {
  const classNames = clsx('w-5', 'h-5', className);
  const sunIconClassNames = clsx(
    'rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0',
    classNames
  );
  const moonIconClassNames = clsx(
    'absolute h-[1.25rem] w-[1.25rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100',
    classNames
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='outline-none focus:outline-none transition hover:transition-all'
        >
          <SunIcon className={sunIconClassNames} />
          <MoonIcon className={moonIconClassNames} />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DarkModeButtonContent />
    </DropdownMenu>
  );
}
export default ModeToggle;
