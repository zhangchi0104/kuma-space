/** @format */

import SignInButton from "./sign-in";
import SignOut from "./sign-out";
import { createServerSideSupabaseClient } from "@/src/lib/supabase/server";
type SignInOutProps = {
  className?: string;
};
const SignInOut = async ({ className }: SignInOutProps) => {
  const supabase = await createServerSideSupabaseClient();

  const { data } = await supabase.auth.getUser();
  return (
    <>
      {data.user === null ? (
        <SignInButton className={className} />
      ) : (
        <SignOut
          name={data.user?.user_metadata.name ?? ""}
          avatarUrl={data.user?.user_metadata.avatar_url ?? ""}
          className={"w-8 h-8"}
        />
      )}
    </>
  );
};

export default SignInOut;
