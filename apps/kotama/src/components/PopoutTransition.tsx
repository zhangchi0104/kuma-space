/** @format */
'use client';
import { AnimatedComponentPropsWithChildren } from '@/src/utils/typings';
import { softSpringPreset } from '@/src/utils/transitions/springPresets';
import { LazyMotion } from 'framer-motion';
import * as m from 'framer-motion/m';
import { FC } from 'react';
type PopoutTransitionProps = AnimatedComponentPropsWithChildren<{}>;
const loadFeatures = () =>
  import('./framerMotionFeatures').then((res) => res.default);
const PopoutTransition: FC<PopoutTransitionProps> = ({
  children,
  delay,
  duration,
}) => {
  const MotionComponent = m.div;

  return (
    <LazyMotion features={loadFeatures}>
      <MotionComponent
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay, ...softSpringPreset, duration }}
      >
        {children}
      </MotionComponent>
    </LazyMotion>
  );
};
export default PopoutTransition;
