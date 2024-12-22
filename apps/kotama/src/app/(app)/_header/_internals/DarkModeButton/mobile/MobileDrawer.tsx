/** @format */

'use client';
import { MoonIcon } from '@radix-ui/react-icons';

import { Switch } from '@/src/components/ui/switch';
import { SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { cn } from '@/src/utils/shadcn';
import { BaseStyleProps } from '@/src/utils/typings';
import { Button } from '@/src/components/ui/button';
import { DialogFooter } from '@/src/components/ui/dialog';

const DarkModeDrawerContent: React.FC<BaseStyleProps> = ({ className }) => {
  const { setTheme, theme } = useTheme();
  return (
    <>
      <div
        className={cn(
          'flex flex-row items-center justify-center gap-4',
          className
        )}
      >
        <SunIcon className='w-5 h-5' />
        <Switch
          checked={theme === 'dark'}
          className='w-16 h-9'
          thumbClassName='w-7 h-7 data-[state=checked]:translate-x-7'
          onCheckedChange={(checked) => {
            setTheme(checked ? 'dark' : 'light');
          }}
        />
        <MoonIcon className='w-5 h-5' />
      </div>
      <DialogFooter className='flex items-center justify-center mt-12'>
        <Button className='self-end' onClick={() => setTheme('system')}>
          Use Sytstem Theme
        </Button>
      </DialogFooter>
    </>
  );
};
export default DarkModeDrawerContent;
