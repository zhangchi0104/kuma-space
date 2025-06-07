"use client";

import { createClientSideSupabaseClient } from "@/src/lib/supabase/client";
import { UserResponse } from "@supabase/supabase-js";
import { use, useEffect, useMemo, useState } from "react";

const ClientSideUser = () => {
  const supabaseClient = useMemo(() => createClientSideSupabaseClient(), []);
  const [user, setUser] = useState<UserResponse | null>(null);
  useEffect(() => {
    supabaseClient.auth.getUser().then((userSession) => setUser(userSession));
  }, []);
  return (
    <div>
      <p>{JSON.stringify(user, null, 2)}</p>
    </div>
  );
};
export default ClientSideUser;
