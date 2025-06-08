/** @format */

// 'use client';
import React, { Children } from "react";
type ComposeProvidersProps = React.PropsWithChildren<never>;
const FlattenProviders: React.FC<ComposeProvidersProps> = ({ children }) => {
	const childrenList = Children.toArray(children);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const reduced = childrenList.reduceRight((child, parent: any) =>
		React.cloneElement(parent, { children: child }),
	);
	return reduced;
};

export default FlattenProviders;
