/** @format */

import { PropsWithChildren } from "react";
type AnimatedComponentPropsBase = {
  duration?: number;
  delay?: number;
};
export type BaseStyleProps = {
  className?: string;
  style?: React.CSSProperties;
};
export type AnimatedComponentProps<T extends {} = {}> =
  AnimatedComponentPropsBase & BaseStyleProps & T;

export type AnimatedComponentPropsWithChildren<T extends {} = {}> =
  PropsWithChildren<AnimatedComponentProps<T>>;

export type AnimatedComponentPropsWithRef<T extends {} = {}> =
  AnimatedComponentProps<T> & { ref?: React.Ref<T> };
