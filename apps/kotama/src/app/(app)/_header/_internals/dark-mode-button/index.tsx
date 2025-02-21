/** @format */

import MobileOnlyByCss from '@/src/components/utils/MobileOnlyByCss';
import MobileDarkModeToggle from './mobile/toggle';
import DesktopOnlyByCss from '@/src/components/utils/DesktopOnlyByCss';
import DesktopDarkModeToggle from './desktop';

export function ModeToggle({ className }: { className?: string }) {
  return (
    <>
      <MobileOnlyByCss>
        <MobileDarkModeToggle />
      </MobileOnlyByCss>
      <DesktopOnlyByCss>
        <DesktopDarkModeToggle className={className} />
      </DesktopOnlyByCss>
    </>
  );
}
export default ModeToggle;
