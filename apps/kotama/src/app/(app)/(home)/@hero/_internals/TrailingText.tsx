/** @format */

import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { BaseStyleProps } from "~/utils/typings";

const TrailingText: React.FC<BaseStyleProps> = ({ className }) => {
  const t = useTranslations("Home.Hero");
  const classNames = clsx(
    "flex flex-col relative items-center text-muted-foreground animate-bounce-calmer",
    className,
  );
  return (
    <div className={classNames}>
      <p className="text-md">{t("tailingText")}</p>
      <ChevronDownIcon className="relative w-8 h-6" />
    </div>
  );
};
export default TrailingText;
