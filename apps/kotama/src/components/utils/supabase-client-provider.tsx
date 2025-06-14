import { createClientSideSupabaseClient } from "@/src/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@repo/db/supabase-types";
import { createContext, PropsWithChildren, useMemo } from "react";

export const SupabaseClientContext = createContext<SupabaseClient<
  Database,
  "public"
> | null>(null);

const SupabaseClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const supabase = useMemo(() => createClientSideSupabaseClient(), []);
  return (
    <SupabaseClientContext.Provider value={supabase}>
      {children}
    </SupabaseClientContext.Provider>
  );
};

export default SupabaseClientProvider;
