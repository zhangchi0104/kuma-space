/** @format */

import { auth } from '~/auth';
import { ExitIcon } from '@radix-ui/react-icons';
import SignInButton from './SignInButton';
import ProfileIcon from './ProfileIcon';
type SignInOutProps = {
  className?: string;
};
const SignInOut = async ({ className }: SignInOutProps) => {
  const session = await auth();

  return (
    <>
      {session === null ? (
        <SignInButton className={className} />
      ) : (
        <ProfileIcon
          name={session.user?.name ?? ''}
          avatarUrl={session.user?.image ?? ''}
          className={'w-8 h-8'}
        />
      )}
    </>
  );
};

export default SignInOut;
