/** @format */
"use client";

import dynamic from "next/dynamic";

export default dynamic(() => import("@/src/components/error-component"), {
	ssr: false,
});
