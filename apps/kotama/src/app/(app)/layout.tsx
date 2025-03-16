/** @format */

import { PropsWithChildren } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "./_header";
import { createClient } from "@supabase/supabase-js";
config.autoAddCss = false;
type LayoutProps = PropsWithChildren<{
  header?: React.ReactNode;
}>;
const Layout: React.FC<LayoutProps> = async ({ children, header }) => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: "next_auth" } }
  );
  const { data: users, error } = await supabase.from("users").select("*");
  console.log("supabase users", users, error);

  return (
    <>
      <Header />
      <div className="max-w-screen-xl h-[calc(100vh-3rem)] mx-auto pt-12">
        {children}
      </div>
    </>
  );
};
export default Layout;
