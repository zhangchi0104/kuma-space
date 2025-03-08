/** @format */

"use client";
import { DropdownMenuItem } from "@/src/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/src/components/ui/dropdown-menu";
import { cn } from "@/src/lib/shadcn";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

const DarkModeButtonContent = () => {
  const { setTheme, theme } = useTheme();
  const t = useTranslations("Header.DarkModeToggle");

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        className={cn(theme === "light" && "font-semibold")}
        onClick={() => setTheme("light")}
      >
        <SunIcon className="w-4 h-4 mr-2" />
        <p>{t("light")}</p>
      </DropdownMenuItem>
      <DropdownMenuItem
        className={cn(theme === "dark" && "font-semibold")}
        onClick={() => setTheme("dark")}
      >
        <MoonIcon className="w-4 h-4 mr-2" />
        <p>{t("dark")}</p>
      </DropdownMenuItem>
      <DropdownMenuItem
        className={cn(theme === "system" && "font-semibold")}
        onClick={() => setTheme("system")}
      >
        <DesktopIcon className="w-4 h-4 mr-2" />
        <p>{t("system")}</p>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default DarkModeButtonContent;
