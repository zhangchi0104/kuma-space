"use server";

import { createServerSideSupabaseClient } from "~/lib/supabase/client";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
type SignInPayload<T extends Record<string, string>> = T & {
  redirectTo?: string;
};
export async function signIn(provider: "github"): Promise<void>;
export async function signIn(
  provider: "email",
  payload: SignInPayload<{ email: string; password: string }>
): Promise<void>;
export async function signIn(
  provider: "anonymous",
  payload: SignInPayload<{ fingerprint: string }>
): Promise<void>;
export async function signIn(
  provider: Provider | "email" | "anonymous",
  payload?: SignInPayload<Record<string, string>>
): Promise<void> {
  switch (provider) {
    case "github":
      const githubResponse = await signInWithGithub();
      if (githubResponse.data.url) {
        redirect(githubResponse.data.url);
      }
      break;
    case "anonymous":
      const anonymousResponse = await signInAnonymously(payload!.fingerprint);
      if (!anonymousResponse.data.user) {
        throw new Error(`Failed to sign in with ${provider}`);
      }
      if (payload?.redirectTo) {
        redirect(payload.redirectTo);
      }
      // revalidatePath("/", "layout");
      // redirect("/");
      break;

    case "email":
      const emailResponse = await signInWithEmail(
        payload!.email,
        payload!.password
      );
      if (emailResponse.error) {
        throw new Error(emailResponse.error.message);
      }
      break;
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}

async function signInWithGithub() {
  const supabase = await createServerSideSupabaseClient();
  const origin =
    process.env.VERCEL_ENV === "development"
      ? "http://localhost:3000"
      : process.env.VERCEL_URL;
  return await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
}

async function signInAnonymously(fingerprint: string) {
  const supabase = await createServerSideSupabaseClient();
  // auth
  return await supabase.auth.signInAnonymously({
    // Use fingerprint to identify the user
    // to avoid potential abuse of the anonymous auth
    options: {
      data: {
        fingerprint,
      },
    },
  });
}

async function signInWithEmail(email: string, password: string) {
  const supabase = await createServerSideSupabaseClient();
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  const supabase = await createServerSideSupabaseClient();
  return await supabase.auth.signOut();
}

export async function signUpWithEmail(email: string, password: string) {
  const supabase = await createServerSideSupabaseClient();
  return await supabase.auth.signUp({
    email,
    password,
  });
}
