import { ExtractAtomValue, useAtomValue } from "jotai";
import { breakpointsAtom } from "@/src/atoms/viewport";
import { selectAtom } from "jotai/utils";
import { useCallback } from "react";
type BreakpointsValue = ExtractAtomValue<typeof breakpointsAtom>;
type BreakpointSelector<T> = (val: BreakpointsValue) => T;
export const useBreakpoints = <T>(selector: BreakpointSelector<T>): T =>
  useAtomValue(selectAtom(breakpointsAtom, useCallback(selector, [selector])));

const isMobileSelector = (v: BreakpointsValue) => !v.md;
export const useIsMobile = () =>
  useBreakpoints(useCallback(isMobileSelector, []));
