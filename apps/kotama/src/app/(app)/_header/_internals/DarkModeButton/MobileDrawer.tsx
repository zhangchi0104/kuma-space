/** @format */

'use client';
import { MoonIcon } from '@radix-ui/react-icons';

import { Switch } from '@/src/components/ui/switch';
import { SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { cn } from '@/src/utils/shadcn';
import { BaseStyleProps } from '@/src/utils/typings';

const DarkModeDrawerContent: React.FC<BaseStyleProps> = ({ className }) => {
  const { setTheme } = useTheme();
  return (
    <div
      className={cn(
        'flex flex-row items-center justify-center gap-4',
        className
      )}
    >
      <SunIcon className='w-5 h-5' />
      <Switch
        className='w-16 h-9'
        thumbClassName='w-7 h-7 data-[state=checked]:translate-x-7'
        onCheckedChange={(checked) => {
          setTheme(checked ? 'dark' : 'light');
        }}
      />
      <MoonIcon className='w-5 h-5' />
    </div>
  );
};
export default DarkModeDrawerContent;
