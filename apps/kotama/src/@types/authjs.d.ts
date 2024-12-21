/** @format */

import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: string;
    } & DefaultSession['user'];
    accessToken: string;
  }
  interface User extends DefaultUser {
    role?: string;
  }
  // interface Profile {
  //   role?: string;
  // }
}
