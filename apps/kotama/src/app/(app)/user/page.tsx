/** @format */
import { Suspense } from "react";
import { createServerSideSupabaseClient } from "@/src/lib/supabase/server";
import ClientSideUser from "./client-side-user";

const SessionPage = async () => {
	const client = await createServerSideSupabaseClient();
	const { data, error } = await client.auth.getUser();

	return (
		<div>
			<p className="whitespace-pre-wrap text-nowrap">
				{JSON.stringify(data, null, 2)}
			</p>
			<Suspense fallback={<div>Loading User</div>}>
				<ClientSideUser />
			</Suspense>
		</div>
	);
};

export default SessionPage;
