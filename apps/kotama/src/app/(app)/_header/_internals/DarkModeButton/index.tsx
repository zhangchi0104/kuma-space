/** @format */

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Button } from '@/src/components/ui/button';
import clsx from 'clsx';

import DarkModeButtonContent from './DarkModeButtonContent';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import DarkModeTrigger from './DarkModeTrigger';
import MobileOnlyByCss from '@/src/components/utils/MobileOnlyByCss';
import MobileDarkModeToggle from './MobileDarkModeToggle';
import DesktopOnlyByCss from '@/src/components/utils/DesktopOnlyByCss';

export function ModeToggle({ className }: { className?: string }) {
  return (
    <>
      <MobileOnlyByCss>
        <MobileDarkModeToggle />
      </MobileOnlyByCss>
      <DesktopOnlyByCss>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <DarkModeTrigger className={className} />
          </DropdownMenuTrigger>
          <DarkModeButtonContent />
        </DropdownMenu>
      </DesktopOnlyByCss>
    </>
  );
}
export default ModeToggle;
