import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createServerSideSupabaseClient } from "@/src/lib/supabase/server";
export async function GET(request: Request) {
	console.log("request", request);
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	// if "next" is in param, use it as the redirect URL
	const next = searchParams.get("next") ?? "/";
	if (code) {
		const supabase = await createServerSideSupabaseClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
			const isLocalEnv = process.env.NODE_ENV === "development";
			if (isLocalEnv) {
				// we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
				return NextResponse.redirect(`${origin}${next}`);
			} else if (forwardedHost) {
				return NextResponse.redirect(`https://${forwardedHost}${next}`);
			} else {
				return NextResponse.redirect(`${origin}${next}`);
			}
		} else {
			console.error("auth error: ", error);
		}
	}
	// return the user to an error page with instructions
	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

/**
 * https://github.com/login?client_id=Ov23licoANTd4ARcHWGU&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3DOv23licoANTd4ARcHWGU%26redirect_to%3Dhttp%253A%252F%252Flocalhost%253A3000%252Fauth%252Fcallback%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A54321%252Fauth%252Fv1%252Fcallback%26response_type%3Dcode%26scope%3Duser%253Aemail%26state%3DeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDc1NzU4NTYsInNpdGVfdXJsIjoiaHR0cDovLzEyNy4wLjAuMTozMDAwIiwiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJmdW5jdGlvbl9ob29rcyI6bnVsbCwicHJvdmlkZXIiOiJnaXRodWIiLCJyZWZlcnJlciI6Imh0dHA6Ly8xMjcuMC4wLjE6MzAwMCIsImZsb3dfc3RhdGVfaWQiOiIzZGM4MGFhNS03NzllLTRhZDMtYjg3Mi1hYjMzMjVjMDRhZGQifQ.bVp3rni5i1wJPKTXoUQAMgx2hwmHeKuX78OyKFsuq8Y
 */
