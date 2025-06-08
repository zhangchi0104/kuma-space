import { Database } from "@repo/db/supabase-types";
import type { SupabaseClient } from "@supabase/supabase-js";

export type TypedSupabase = SupabaseClient<Database, "public">;
