"use client";

import { createClientSideSupabaseClient } from "@/src/lib/supabase/client";
import type { UserResponse } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";

const ClientSideUser = () => {
	const supabaseClient = useMemo(() => createClientSideSupabaseClient(), []);
	const [user, setUser] = useState<UserResponse | null>(null);
	useEffect(() => {
		supabaseClient.auth.getUser().then((userSession) => setUser(userSession));
	}, [supabaseClient.auth]);
	return (
		<div>
			<p>{JSON.stringify(user, null, 2)}</p>
		</div>
	);
};
export default ClientSideUser;
