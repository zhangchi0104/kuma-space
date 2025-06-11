import { useContext } from "react";
import { SupabaseClientContext } from "@/src/components/utils/supabase-client-provider";

const useClientSideSupabase = () => {
	const supabase = useContext(SupabaseClientContext);
	if (!supabase) {
		throw new Error("Supabase client not found");
	}
	return supabase;
};

export default useClientSideSupabase;
