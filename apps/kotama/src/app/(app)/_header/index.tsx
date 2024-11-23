/** @format */
import clsx from "clsx";
import HeaderMenu from "./HeaderMenu";
import SignInOut from "./SignInOut";
import ModeToggle from "./DarkModeButton";
import MobileHeaderMenu from "./MobileHeaderMenu";
import MobileOnlyByAtom from "@/src/components/utils/MobileOnlyByAtom";
import DesktopOnlyByCss from "@/src/components/utils/DesktopOnlyByCss";

import LanguageSwitcher from "./LanguageSwitcher";
import { BaseStyleProps } from "@/src/utils/typings";

const Header: React.FC<BaseStyleProps> = ({ className }) => {
  const headerContainerStyle = clsx(
    "fixed",
    "mx-auto",
    //"abs-center-x",
    "bg-background",
    "w-screen",
    "h-12",
    "foreground",
    "px-8",
    "py-2",
    "flex",
    "items-center",
    "justify-between",
    className,
  );
  return (
    <div id="header" className={headerContainerStyle}>
      <MobileOnlyByAtom>
        <MobileHeaderMenu />
      </MobileOnlyByAtom>
      <DesktopOnlyByCss>
        <HeaderMenu className="items-center justify-start flex-row flex" />
      </DesktopOnlyByCss>
      <div className="flex items-center space-x-8">
        <ModeToggle className="h-5 w-5 transition-all" />
        <LanguageSwitcher className="w-5 h-5" />
      </div>
    </div>
  );
};
export default Header;
