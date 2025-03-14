/** @format */
"use client";
import { ScrollArea } from "@/src/components/ui/scroll-area";

import { useLocale, useTranslations } from "next-intl";
import { Locale, locales } from "~/i18n/config";
import localNames from "~/i18n/localNames";
import LanguageListItem from "./language-list-item";
import { setUserLocale } from "@/src/lib/userLocale";
const LanguageList = () => {
  const t = useTranslations("Header.LanguageSwitcher");
  const currentLocale = useLocale();

  return (
    <ScrollArea className="max-h-[500px]">
      <ul
        onClick={async (e) => {
          const target = e.target as HTMLElement;
          const locale = target.dataset.locale as Locale;
          await setUserLocale(locale);
        }}
        className="border rounded-md p-2 space-y-2"
      >
        {locales.map((locale) => (
          <LanguageListItem
            selected={locale === currentLocale}
            key={locale}
            value={locale}
            localizedName={t(locale)}
            nativeName={localNames[locale]}
          />
        ))}
      </ul>
    </ScrollArea>
  );
};

export default LanguageList;
