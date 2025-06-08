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
	return (
		<>
			<Header />
			<div className="max-w-(--breakpoint-xl) h-[calc(100vh-3rem)] mx-auto pt-12">
				{children}
			</div>
		</>
	);
};
export default Layout;
