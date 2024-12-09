/** @format */

import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id as string;

      return session;
    },
  },
});
