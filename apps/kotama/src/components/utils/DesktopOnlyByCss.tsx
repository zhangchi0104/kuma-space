/** @format */

import { PropsWithChildren, FC } from "react";
import breakpoints from "~/utils/constants/breakpoints";

type MobileOnlyProps = PropsWithChildren<{
  breakpoint?: keyof typeof breakpoints;
}>;
const breakPointMap = {
  sm: "hidden sm:block",
  md: "hidden md:block",
  lg: "hidden lg:block",
  xl: "hidden xl:block",
  "2xl": "hidden 2xl:block",
};
const DesktopOnlyByCss: FC<MobileOnlyProps> = ({
  children,
  breakpoint = "md",
}) => {
  const css = breakPointMap[breakpoint];
  return <div className={css}>{children}</div>;
};
export default DesktopOnlyByCss;
