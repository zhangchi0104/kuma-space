/** @format */

'use client';
import {
  m as motion,
  useTransform,
  useMotionValue,
  animate,
  LazyMotion,
} from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { AnimatedComponentProps } from '../utils/typings';

const Cursor = () => {
  return <span>{'|'}</span>;
};

type AnimatedTextProps = AnimatedComponentProps & {
  text: string;
  textStyle?: string;
  hideCursorAfterAnimation?: boolean;
  hideCursor?: boolean;
};

const loadFeatures = () =>
  import('./framerMotionFeatures').then((res) => res.default);
const AnimatedText: FC<AnimatedTextProps> = ({
  className,
  text,
  duration = 1,
  hideCursorAfterAnimation = false,
}) => {
  const animationProgress = useMotionValue(0);
  const numLettersShown = useTransform(animationProgress, (value) => {
    return Math.floor(value);
  });

  const placeHolder = text.replace(/[^\n]/g, ' ');
  const textShown = useTransform(numLettersShown, (value) =>
    text.slice(0, value)
  );
  const placeholderLeft = useTransform(numLettersShown, (value) =>
    placeHolder.slice(value)
  );
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    const controlls = animate(animationProgress, text.length, {
      type: 'tween',
      duration: duration,
      ease: 'linear',
      onComplete: () => setShowCursor(false),
    });
    return () => controlls.stop();
  }, [animationProgress, text.length, duration, hideCursorAfterAnimation]);
  return (
    <div className={className}>
      <LazyMotion features={loadFeatures}>
        <motion.span>{textShown}</motion.span>
        {showCursor && <Cursor />}
        <motion.span>{placeholderLeft}</motion.span>
      </LazyMotion>
    </div>
  );
};

export default AnimatedText;
