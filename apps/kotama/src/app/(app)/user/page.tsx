/** @format */
import { createServerSideSupabaseClient } from "~/lib/supabase/client";

const SessionPage = async () => {
  const client = await createServerSideSupabaseClient();
  const { data, error } = await client.auth.getSession();

  return (
    <div>
      <p className="whitespace-pre-wrap text-nowrap">
        {JSON.stringify(data, null, 2)}
      </p>
    </div>
  );
};

export default SessionPage;
