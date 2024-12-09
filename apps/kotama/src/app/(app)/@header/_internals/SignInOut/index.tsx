/** @format */

import { auth } from '~/auth';
import { ExitIcon } from '@radix-ui/react-icons';
import SignInButton from './SignInButton';
type SignInOutProps = {
  className?: string;
};
const SignInOut = async ({ className }: SignInOutProps) => {
  const session = await auth();
  return (
    <>
      {!session ? (
        <SignInButton className={className} />
      ) : (
        <ExitIcon className='w-5 h-5' />
      )}
    </>
  );
};

export default SignInOut;
