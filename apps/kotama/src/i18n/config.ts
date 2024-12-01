/** @format */
import { LanguageCode } from 'iso-639-1';
export const locales = ['zh', 'en'] as const satisfies LanguageCode[];
export type Locale = (typeof locales)[number];
export const defaultLocale = 'en';
