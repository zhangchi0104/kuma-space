/** @format */

'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/src/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import clsx from 'clsx';

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme();
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
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default ModeToggle;
