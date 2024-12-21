/** @format */
"use client";

import dynamic from "next/dynamic";

/** @format */
export default dynamic(() => import("./error-content"), {
  ssr: false,
});
