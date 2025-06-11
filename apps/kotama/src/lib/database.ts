import { createRlsClient } from "@repo/db";
import { createServerSideSupabaseClient } from "./supabase/server";

export const getDatabaseClient = async () => {
	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL is not set");
	}
	const supabase = await createServerSideSupabaseClient();
	const db = createRlsClient(process.env.DATABASE_URL);
	const user = await supabase.auth.getUser();

	return db.rls(user.data.user ?? {});
};
