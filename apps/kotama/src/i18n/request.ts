/** @format */

import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '~/utils/userLocale';
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = await getUserLocale();
  return {
    locale,
    timeZone: 'Asia/Shanghai',
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
