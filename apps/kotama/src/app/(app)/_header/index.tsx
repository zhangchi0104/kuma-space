/** @format */
import clsx from 'clsx';
import HeaderMenu from './_internals/header-image';
import ModeToggle from './_internals/dark-mode-button';
import MobileHeaderMenu from './_internals/mobile-header-menu';
import DesktopOnlyByCss from '@/src/components/utils/DesktopOnlyByCss';

import LanguageSwitcher from './_internals/language-switcher';
import { BaseStyleProps } from '@/src/utils/typings';
import MobileOnlyByCss from '@/src/components/utils/MobileOnlyByCss';
import SignInOut from './_internals/sign-in-out';
import { Suspense } from 'react';
import { Skeleton } from '@/src/components/ui/skeleton';

const Header: React.FC<BaseStyleProps> = ({ className }) => {
  const headerContainerStyle = clsx(
    'max-w-screen-2xl',
    'grow',
    'px-8',
    'py-2',
    'flex',
    'items-center',
    'justify-between',
    className
  );
  return (
    <div className='w-screen bg-background foreground fixed mx-auto flex justify-center z-50'>
      <div id='header' className={headerContainerStyle}>
        <MobileOnlyByCss>
          <MobileHeaderMenu />
        </MobileOnlyByCss>
        <DesktopOnlyByCss>
          <HeaderMenu className='items-center justify-start flex-row flex grow' />
        </DesktopOnlyByCss>
        <div className='flex items-center justify-center space-x-8'>
          <ModeToggle className='h-5 w-5 transition-all' />
          <LanguageSwitcher />
          <Suspense fallback={<Skeleton className='w-5 h-5' />}>
            <SignInOut className='w-5 h-5' />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default Header;
