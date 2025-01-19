/** @format */

import { auth } from '~/auth';
import SignInButton from './SignInButton';
import SignOut from './SignOut';
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
        <SignOut
          name={session.user?.name ?? ''}
          avatarUrl={session.user?.image ?? ''}
          className={'w-8 h-8'}
        />
      )}
    </>
  );
};

export default SignInOut;
