import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@repo/db/supabase-types";
export async function createServerSideSupabaseClient() {
	const cookieStore = await cookies();
	return createServerClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						for (const { name, value, options } of cookiesToSet) {
							cookieStore.set(name, value, options);
						}
					} catch (error) {
						console.error("error setting cookies", error);
						// The `setAll` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		},
	);
}
