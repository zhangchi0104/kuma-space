/** @format */

import AuthGuard from "@/src/components/utils/auth-guard";
import MilkdownEditor from "./_internals/editor";
import Tags from "./_internals/tags-input/tags";

const EditorPage = () => {
	return (
		<div
			id="editor-container"
			className="relative size-full mx-auto self-stretch flex-1"
		>
			<AuthGuard>
				<Tags>
					<MilkdownEditor />
				</Tags>
			</AuthGuard>
		</div>
	);
};

export default EditorPage;
