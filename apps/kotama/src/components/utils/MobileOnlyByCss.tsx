/** @format */

import { useIsMobile } from '@/src/utils/hooks/viewports';
import { PropsWithChildren, FC } from 'react';
import { useIsClient } from 'usehooks-ts';
import breakpoints from '~/utils/constants/breakpoints';

type MobileOnlyProps = PropsWithChildren<{
  breakpoint?: keyof typeof breakpoints;
}>;
const breakPointMap = {
  sm: 'sm:hidden',
  md: 'md:hidden',
  lg: 'lg:hidden',
  xl: 'xl:hidden',
  '2xl': '2xl:hidden',
};
const MobileOnlyByCss: FC<MobileOnlyProps> = ({
  children,
  breakpoint = 'md',
}) => {
  const css = breakPointMap[breakpoint];
  return <div className={css}>{children}</div>;
};

// export default MobileOnlyByCss;
