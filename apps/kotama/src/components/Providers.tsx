/** @format */
"use client";
import type React from "react";
import FlattenProviders from "./compose-provider";
import { store } from "../atoms/store";
import BreakpointDetector from "./utils/BreakpointDetector";
import { Provider as JotaiProvider } from "jotai";
import ReactQueryClientProvider from "./utils/query-client-provider";
import SupabaseClientProvider from "./utils/supabase-client-provider";

const ClientProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<FlattenProviders>
			<JotaiProvider store={store} />
			<BreakpointDetector />
			<ReactQueryClientProvider />
			<SupabaseClientProvider />
			{children}
		</FlattenProviders>
	);
};

export default ClientProviders;
