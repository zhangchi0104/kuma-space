/** @format */

import { auth } from '@/src/auth';

const HeaderLayout: React.FC<React.PropsWithChildren> = async ({
  children,
}) => {
  const session = await auth();
  console.log(session);
  return (
    <div className='w-screen bg-background foreground fixed mx-auto flex justify-center'>
      {children}
    </div>
  );
};
export default HeaderLayout;
