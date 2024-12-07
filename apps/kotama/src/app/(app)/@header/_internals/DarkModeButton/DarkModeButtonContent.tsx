/** @format */

'use client';
import { DropdownMenuItem } from '@/src/components/ui/dropdown-menu';
import { DropdownMenuContent } from '@/src/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';

const DarkModeButtonContent = () => {
  const { setTheme } = useTheme();
  return (
    <DropdownMenuContent align='end'>
      <DropdownMenuItem onClick={() => setTheme('light')}>
        Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('system')}>
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default DarkModeButtonContent;
