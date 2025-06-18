/** @format */

import type { PropsWithChildren } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "./_header";
config.autoAddCss = false;
type LayoutProps = PropsWithChildren<{
	header?: React.ReactNode;
}>;
const Layout: React.FC<LayoutProps> = async ({ children }) => {
	return (
		<>
			<Header />
			<div className="max-w-(--breakpoint-xl) mx-auto flex flex-col min-h-screen-minus-header">
				{children}
			</div>
		</>
	);
};
export default Layout;
