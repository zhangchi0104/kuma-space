/** @format */

export const diffInDays = (a: Date, b: Date) => {
  const diff = a.getTime() - b.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  return diffDays;
};
