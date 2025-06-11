import type { User } from "@supabase/supabase-js";
import { createServerSideSupabaseClient } from "./supabase/server";
interface AppUser extends User {
	user_role: "admin" | "viewer" | null;
}
export const getUser = async () => {
	const supabase = await createServerSideSupabaseClient();
	const { data, error } = await supabase.auth.getUser();
	if (error) {
		throw error;
	}
	if (!data.user) {
		return null;
	}
	return data.user as AppUser;
};
