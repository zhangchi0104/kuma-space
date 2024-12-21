/** @format */

export const diffInDays = (a: Date, b: Date) => {
  const diff = a.getTime() - b.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const breakCamelCaseToArray = (input: string): string[] =>
  input.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

export const camelCaseToTitle = (input: string): string =>
  breakCamelCaseToArray(input)
    .map((w) => capitalize(w))
    .join(" ");

export const isLocaleCjk = (locale: string) =>
  locale === "zh" || locale === "ja" || locale === "ko";
