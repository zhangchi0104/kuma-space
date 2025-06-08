import type { EmailOtpType } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";
import { createServerSideSupabaseClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const token_hash = searchParams.get("token_hash");
	const type = searchParams.get("type") as EmailOtpType | null;
	const next = searchParams.get("next") ?? "/";
	console.log("auth/confirm/route token_hash", token_hash);
	if (token_hash && type) {
		const supabase = await createServerSideSupabaseClient();
		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash,
		});
		console.log("auth/confirm/route error", error);
		if (!error) {
			// redirect user to specified redirect URL or root of app
			redirect(next);
		}
	}
	// redirect the user to an error page with some instructions
	redirect("/error");
}
