/** @format */

import {
  Drawer,
  // DrawerContent,
  // DrawerContent,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import dynamic from "next/dynamic";
const DrawerContent = dynamic(() =>
  import("~/components/ui/drawer").then((mod) => mod.DrawerContent),
);
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC } from "react";
interface MobileHeaderMenuProps {
  className?: string;
}
const MobileHeaderMenu: FC<MobileHeaderMenuProps> = ({ className }) => {
  const classNames = clsx("text-xl", "text-foreground", className);

  return (
    <Drawer>
      <DrawerTrigger>
        <FontAwesomeIcon icon={faBars} className={classNames} />
      </DrawerTrigger>
      <DrawerContent>
        <Content />
      </DrawerContent>
    </Drawer>
  );
};
const Content = () => {
  const classNames = clsx("text-lg", "text-foreground");
  const t = useTranslations("Home.MenuBar");
  return (
    <div className="w-full px-8 py-6 space-y-6 flex flex-col">
      <Link className={classNames} href="/">
        {t("home")}
      </Link>
      <Link className={classNames} href="/blog">
        {t("blog")}
      </Link>
      <Link className={classNames} href="/about">
        {t("aboutMe")}
      </Link>
      <Link className={classNames} href="/friends">
        {t("friends")}
      </Link>
    </div>
  );
};
export default MobileHeaderMenu;
