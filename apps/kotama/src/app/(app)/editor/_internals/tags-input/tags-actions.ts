"use server";

import { createServerSideSupabaseClient } from "@/src/lib/supabase/server";

export const createTag = async (tag: string) => {
  const supabase = await createServerSideSupabaseClient();
  const { data, error } = await supabase.from("tags").insert({ value: tag });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
