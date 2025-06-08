/** @format */

import { BaseStyleProps } from "@/src/lib/typings";
import React from "react";

type ListProps<T extends any = any> = {
	data: T[];
	as?: React.ElementType;
	render: (item: T, index: number) => React.ReactNode;
	emptyFallback?: React.ReactNode;
	id: string;
} & BaseStyleProps;
const ListView = <T,>(props: ListProps<T>): React.ReactNode => {
	const { data, render, as, emptyFallback, ...conatinerProps } = props;
	if (data.length === 0) {
		return React.createElement(as || "div", {}, emptyFallback);
	}

	return React.createElement(
		as || "div",
		{
			...conatinerProps,
		},
		data.map((item, index) => render(item, index)),
	);
};

export default ListView;
