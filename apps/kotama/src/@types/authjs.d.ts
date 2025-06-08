/** @format */

import { DefaultSession } from "next-auth";
import { UserRoles } from "@repo/db";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		// user: {
		//   role: string;
		// } & DefaultSession['user'];
		accessToken: string;
	}
	interface User extends DefaultUser {
		role?: UserRoles;
	}
	// interface Profile {
	//   role?: string;
	// }
}
declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		credentials?: {
			exp: number;
			role: string;
			email: string;
			accessToken: string;
		};
		role?: string;
	}
}
