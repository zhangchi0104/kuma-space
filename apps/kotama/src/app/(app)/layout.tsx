/** @format */

import { PropsWithChildren } from "react";
import Headers from "./_header";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mx-auto">
      <Headers />
      <div className="max-w-screen-xl mx-auto">{children}</div>
    </div>
  );
};
export default Layout;
