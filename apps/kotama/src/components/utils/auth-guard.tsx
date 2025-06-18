/** @format */

import Unauthorized from "../http-errors/401-unauthorized";
import Forbidden from "../http-errors/403-forbidden";
import type { BaseStyleProps } from "@/src/lib/typings";
import { cn } from "@/src/lib/shadcn";
import { getUser } from "@/src/lib/auth";
import { CustomAuthError } from "@supabase/supabase-js";
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

	if (requiresAdmin && session.user_role !== "admin") {
		throw new CustomAuthError(
			"You are not authorized to access this resource",
			"PermissionDeniedError",
			403,
			undefined,
		);
	}

	return <div className={cn(className)}>{children}</div>;
};

export default AuthGuard;
