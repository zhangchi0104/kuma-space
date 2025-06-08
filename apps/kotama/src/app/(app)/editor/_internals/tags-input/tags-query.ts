import { TypedSupabase } from "@/src/components/utils/types";

export const searchTagsByKeyword = (client: TypedSupabase, query?: string) => {
  if (!query) {
    const res = client
      .from("tags")
      .select(`*`)
      .limit(5)
      .order("value", { ascending: false });
    return res;
  }

  const res = client
    .from("tags")
    .select(`*`)
    .limit(5)
    .ilike("value", `%exp%`)
    .order("value", {
      ascending: false,
    });

  return res;
};
