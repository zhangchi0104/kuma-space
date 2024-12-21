/** @format */

import { Button } from '~/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { signIn } from '~/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
const SignInForm = () => {
  return (
    <div className='flex flex-col gap-2'>
      <form
        action={async () => {
          'use server';
          await signIn('github');
        }}
      >
        <Button className='w-full flex-1' type='submit'>
          <GitHubLogoIcon className='mr-2 w-5 h-5' />
          <p>Sign in with GitHub</p>
        </Button>
      </form>
      {/* <form>
        <Button
          className='bg-blue-400 w-full flex-1'
          onClick={async () => await signIn('google')}
        >
          <FontAwesomeIcon icon={faGoogle} className='mr-2 w-5 h-5' />
          <p>Sign in with Google</p>
        </Button>
      </form> */}
    </div>
  );
};
export default SignInForm;
