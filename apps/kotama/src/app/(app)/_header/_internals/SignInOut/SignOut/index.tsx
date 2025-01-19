/** @format */
import DesktopOnlyByCss from '@/src/components/utils/DesktopOnlyByCss';
import DesktopProfile from './desktop';
import { ProfileIconProps } from './props';
import MobileOnlyByCss from '@/src/components/utils/MobileOnlyByCss';
import MobileSignOutDialog from './mobile';
const SignOut = ({ name, avatarUrl, className }: ProfileIconProps) => {
  return (
    <>
      <DesktopOnlyByCss>
        <DesktopProfile
          name={name}
          avatarUrl={avatarUrl}
          className={className}
        />
      </DesktopOnlyByCss>
      <MobileOnlyByCss>
        <MobileSignOutDialog
          name={name}
          avatarUrl={avatarUrl}
          className={className}
        />
      </MobileOnlyByCss>
    </>
  );
};
SignOut.displayName = 'SignOut';
export default SignOut;
