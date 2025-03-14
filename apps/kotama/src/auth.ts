/** @format */

import NextAuth from 'next-auth';

import GitHub from 'next-auth/providers/github';
import { SupabaseAdapter } from '@auth/supabase-adapter';
const adapter = SupabaseAdapter({
  url: process.env.SUPABASE_URL!,
  secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
});
import { SignJWT } from 'jose';
import { createClient } from '@supabase/supabase-js';
import { UserRoles } from '@repo/db';
const MIN_TOKEN_EXPIRATION_THREASHOLD = 10 * 60;
const MAX_TOKEN_EXPIRATION = 30 * 24 * 60 * 60;
const generateNewToken = async (
  payload: { role?: string; email?: string | null },
  exp: number
) => {
  const newToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setAudience(process.env.JWT_AUDIENCE!)
    .setExpirationTime(exp)
    .setIssuer(process.env.JWT_ISSUER!)
    .setIssuedAt(new Date())
    .sign(new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET!));
  return newToken;
};
const isTokenExpiring = (exp: number) =>
  exp > Date.now() / 1000 + MIN_TOKEN_EXPIRATION_THREASHOLD;
export const { handlers, signIn, signOut, auth } = NextAuth({
  // debug: prsocess.env.NODE_ENV === 'development',
  providers: [GitHub],
  adapter: adapter,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (!user) {
        return token;
      }
      console.log('jwt callback', { token, user });
      if (token.credentials && !isTokenExpiring(token.credentials.exp)) {
        return token;
      }

      const exp =
        token.exp || Math.floor(Date.now() / 1000) + MAX_TOKEN_EXPIRATION;
      const payload = {
        role: user.role,
        email: user.email,
      };

      const accessToken = await generateNewToken(payload, exp);
      token.credentials = {
        exp,
        role: user.role || 'Viewer',
        email: user.email || '',
        accessToken,
      };
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { db: { schema: 'next_auth' } }
      );
      const data = await supabase.from('users').select('*');
      console.log('jwt callback', { data });
      return token;
    },
    async session({ session, token, user }) {
      // const signingSecret = process.env.SUPABASE_JWT_SECRET;
      // console.log({ signingSecret });

      session.user.role = token.credentials?.role as UserRoles;
      session.accessToken = token.credentials?.accessToken || '';
      return session;
    },
  },
});
