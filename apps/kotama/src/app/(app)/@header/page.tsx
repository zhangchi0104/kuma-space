/** @format */
import clsx from 'clsx';
import HeaderMenu from './_internals/HeaderMenu';
import ModeToggle from './_internals/DarkModeButton';
import MobileHeaderMenu from './_internals/MobileHeaderMenu';
import MobileOnlyByAtom from '@/src/components/utils/MobileOnlyByAtom';
import DesktopOnlyByCss from '@/src/components/utils/DesktopOnlyByCss';

import LanguageSwitcher from './_internals/LanguageSwitcher';
import { BaseStyleProps } from '@/src/utils/typings';

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
    <div id='header' className={headerContainerStyle}>
      <MobileOnlyByAtom>
        <MobileHeaderMenu />
      </MobileOnlyByAtom>
      <DesktopOnlyByCss>
        <HeaderMenu className='items-center justify-start flex-row flex grow' />
      </DesktopOnlyByCss>
      <div className='flex items-center space-x-8'>
        <ModeToggle className='h-5 w-5 transition-all' />
        <LanguageSwitcher className='w-5 h-5' />
      </div>
    </div>
  );
};
export default Header;
