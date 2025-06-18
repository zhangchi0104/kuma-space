"use client";

import { AuthError } from "@supabase/supabase-js";
import { useEffect } from "react";

import Unauthorized from "@/src/components/http-errors/401-unauthorized";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	const renderErrorBody = () => {
		switch (error.name) {
			case "AuthSessionMissingError":
				return <Unauthorized reset={reset} />;
			default:
				return <div>Error: {JSON.stringify(error)}</div>;
		}
	};
	return (
		<div className="flex justify-center items-center h-screen">
			{renderErrorBody()}
		</div>
	);
}
