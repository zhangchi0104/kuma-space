/** @format */
'use client';
import { usePathname } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn } from 'next-auth/react';
const SignInForm = () => {
  const pathname = usePathname();

  return (
    <div className='flex flex-col gap-2'>
      <Button
        onClick={async () => await signIn('github', { redirectTo: pathname })}
      >
        <GitHubLogoIcon className='mr-2 w-5 h-5' />
        <p>Sign in with GitHub</p>
      </Button>
      <Button
        className='bg-blue-400'
        onClick={async () => await signIn('google', { redirectTo: pathname })}
      >
        <FontAwesomeIcon icon={faGoogle} className='mr-2 w-5 h-5' />
        <p>Sign in with Google</p>
      </Button>
    </div>
  );
};
export default SignInForm;
