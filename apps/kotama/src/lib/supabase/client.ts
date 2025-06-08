import { Database } from "@repo/db/supabase-types";
import { createBrowserClient } from "@supabase/ssr";

export function createClientSideSupabaseClient() {
	return createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);
}
