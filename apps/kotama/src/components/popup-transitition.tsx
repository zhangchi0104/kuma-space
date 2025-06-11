/** @format */
"use client";
import type { AnimatedComponentPropsWithChildren } from "@/src/lib/typings";
import { softSpringPreset } from "@/src/lib/transitions/springPresets";
import { LazyMotion } from "framer-motion";
import * as m from "framer-motion/m";
import type { FC } from "react";
type PopoutTransitionProps = AnimatedComponentPropsWithChildren;
const loadFeatures = () =>
	import("./framerMotionFeatures").then((res) => res.default);
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
