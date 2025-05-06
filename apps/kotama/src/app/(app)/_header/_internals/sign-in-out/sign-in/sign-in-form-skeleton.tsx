/** @format */

import { Skeleton } from '~/components/ui/skeleton';

const SignInFormSkeleton = () => {
  return (
    <div className='flex flex-col gap-2'>
      <Skeleton className='h-9 w-full' />
      <Skeleton className='h-9 w-full' />
    </div>
  );
};

export default SignInFormSkeleton;
