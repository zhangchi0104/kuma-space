/** @format */

import Unauthorized from "../http-errors/401-unauthorized";
import Forbidden from "../http-errors/403-forbidden";
import { BaseStyleProps } from "@/src/lib/typings";
import { cn } from "@/src/lib/shadcn";
import { getUser } from "@/src/lib/auth";
type AuthGuardProps = {
  requiresAdmin?: boolean;
  errorClassName?: string;
} & BaseStyleProps;
const AuthGuard: React.FC<React.PropsWithChildren<AuthGuardProps>> = async ({
  children,
  requiresAdmin = false,
  className,
}) => {
  const session = await getUser();
  const centerClass =
    "absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2";
  if (!session) {
    return (
      <div className={centerClass}>
        <Unauthorized />
      </div>
    );
  }
  if (requiresAdmin && session.user_role !== "admin") {
    return (
      <div className={centerClass}>
        <Forbidden />
      </div>
    );
  }

  return <div className={cn(className)}>{children}</div>;
};

export default AuthGuard;
