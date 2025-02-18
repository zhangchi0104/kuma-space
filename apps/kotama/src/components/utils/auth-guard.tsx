/** @format */

import { auth } from '@/src/auth';
import { UserRoles } from '@repo/db';
import Unauthorized from '../http-errors/401-unauthorized';
import Forbidden from '../http-errors/403-forbidden';
import { BaseStyleProps } from '@/src/utils/typings';
import { cn } from '~/utils/shadcn';
type AuthGuardProps = {
  requiresAdmin?: boolean;
} & BaseStyleProps;
const AuthGuard: React.FC<React.PropsWithChildren<AuthGuardProps>> = async ({
  children,
  requiresAdmin = false,
  className,
}) => {
  const session = await auth();
  console.log('auth guard', session?.user);
  console.log(session);
  if (!session || !session.user) {
    return (
      <div className="">
        <Unauthorized />
      </div>
    );
  }
  if (requiresAdmin && session?.user?.role !== UserRoles.Admin) {
    return (
      <div className="">
        <Forbidden />
      </div>
    );
  }

  return <div className={cn(className)}>{children}</div>;
};

export default AuthGuard;
