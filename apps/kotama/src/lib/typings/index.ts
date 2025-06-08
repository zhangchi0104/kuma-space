/** @format */

import type { PropsWithChildren } from "react";
type AnimatedComponentPropsBase = {
	duration?: number;
	delay?: number;
};
export type BaseStyleProps = {
	className?: string;
	style?: React.CSSProperties;
};
export type AnimatedComponentProps<
	T extends Record<string, unknown> = Record<string, never>,
> = AnimatedComponentPropsBase & BaseStyleProps & T;

export type AnimatedComponentPropsWithChildren<
	T extends Record<string, unknown> = Record<string, never>,
> = PropsWithChildren<AnimatedComponentProps<T>>;

export type AnimatedComponentPropsWithRef<
	T extends Record<string, unknown> = Record<string, never>,
> = AnimatedComponentProps<T> & { ref?: React.Ref<T> };

export type NextJsErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};
