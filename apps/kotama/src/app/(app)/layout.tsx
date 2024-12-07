/** @format */

import { PropsWithChildren } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
type LayoutProps = PropsWithChildren<{
  header?: React.ReactNode;
}>;
const Layout: React.FC<LayoutProps> = ({ children, header }) => {
  return (
    <>
      {header}
      <div className="max-w-screen-xl mx-auto">{children}</div>
    </>
  );
};
export default Layout;
