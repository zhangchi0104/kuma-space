/** @format */

import NextAuth from 'next-auth';

import GitHub from 'next-auth/providers/github';
import { SupabaseAdapter } from '@auth/supabase-adapter';
const adapter = SupabaseAdapter({
  url: process.env.SUPABASE_URL!,
  secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
});
import { SignJWT } from 'jose';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  adapter: adapter,
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      console.log({ signingSecret });
      if (signingSecret) {
        const payload = {
          email: user.email,
          role: user.role,
          session: session.sessionToken,
        };

        session.accessToken = await new SignJWT(payload)
          .setProtectedHeader({ alg: 'HS256' })
          .setAudience(process.env.JWT_AUDIENCE!)
          .setExpirationTime(
            Math.floor(new Date(session.expires).getTime() / 1000)
          )
          .setIssuer(process.env.JWT_ISSUER!)
          .setIssuedAt(new Date())
          .sign(new TextEncoder().encode(signingSecret));
      }
      return session;
    },
  },
});
