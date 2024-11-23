import { atom } from "jotai";

export const breakpointsAtom = atom({
  /**
   * min-width: 640px
   */
  sm: false,
  /**
   * min-width: 768px
   */
  md: false,
  /**
   * min-width: 1024px
   */
  lg: false,
  /**
   * min-width: 1280px
   */
  xl: false,

  /**
   * min-width: 1536px
   */
  "2xl": false,
});

export const windowDimensionsAtom = atom({
  height: 0,
  width: 0,
});
