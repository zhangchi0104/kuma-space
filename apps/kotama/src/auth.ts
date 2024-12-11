/** @format */

import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { SupabaseAdapter } from '@auth/supabase-adapter';
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
});
