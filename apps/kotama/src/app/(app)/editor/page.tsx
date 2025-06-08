/** @format */

import AuthGuard from "@/src/components/utils/auth-guard";
import MilkdownEditor from "./_internals/editor";

const EditorPage = () => {
	return (
		<div className="relative size-full max-w-(--breakpoint-md) mx-auto pt-12 ">
			<AuthGuard>
				<MilkdownEditor />
			</AuthGuard>
		</div>
	);
};

export default EditorPage;
