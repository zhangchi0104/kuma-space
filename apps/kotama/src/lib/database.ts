import { createRlsClient } from "@repo/db";
import { createServerSideSupabaseClient } from "./supabase/server";

export const getDatabaseClient = async () => {
	const supabase = await createServerSideSupabaseClient();
	const db = createRlsClient(process.env.DATABASE_URL!);
	const user = await supabase.auth.getUser();

	return db.rls(user.data.user ?? {});
};
