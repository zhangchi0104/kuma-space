/** @format */

'use client';
import throttle from 'lodash/throttle';
import React, { PropsWithChildren } from 'react';
import { useSetAtom } from 'jotai';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';
import { breakpointsAtom } from '@/src/atoms/viewport';
import breakpoints from '~/utils/constants/breakpoints';
const BreakpointDetector: React.FC<PropsWithChildren> = ({ children }) => {
  const setter = useSetAtom(breakpointsAtom);
  const updateJotaiBreakpoints = (width: number) => {
    console.log('BreakpointDetector: ', width);
    setter({
      sm: width >= breakpoints.sm,
      md: width >= breakpoints.md,
      lg: width >= breakpoints.lg,
      xl: width >= breakpoints.xl,
      '2xl': width >= breakpoints['2xl'],
    });
  };
  useIsomorphicLayoutEffect(() => {
    const handler = throttle(
      () => updateJotaiBreakpoints(window.innerWidth),
      16
    );
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return <>{children}</>;
};
export default BreakpointDetector;
