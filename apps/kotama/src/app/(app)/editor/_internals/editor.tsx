/** @format */

"use client";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import "@/src/app/(app)/editor/_internals/style.css";
// We have some themes for you to choose

import { useEffect, useRef, useState } from "react";
import { createPost } from "./actions";
import type { Crepe } from "@milkdown/crepe";
import type { BaseStyleProps } from "@/src/lib/typings";
import TagsSelect from "./tags-input";
import { Button } from "@/src/components/ui/button";
import { useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { useTags } from "./tags-input/tags-context";

// import { Crepe } from '@milkdown/crepe';
// function lazyLoadCodeBlockTheme(theme: string | undefined) {
//   return theme === 'dark'
//     ? import('@uiw/codemirror-theme-github').then((mod) => mod.githubDarkInit)
//     : import('@uiw/codemirror-theme-github').then((mod) => mod.githubLightInit);
// }

type EditorProps = {
	loading?: React.ReactNode;
} & BaseStyleProps;
const MilkdownEditor: React.FC<EditorProps> = ({
	loading = "loading",
	...styleProps
}) => {
	const editorRef = useRef<Crepe | null>(null);
	const editorRootRef = useRef<HTMLDivElement>(null);
	const [isEditorLoaded, setIsEditorLoaded] = useState(false);
	const [title, setTitle] = useState("");
	const { tags } = useTags();
	const debouncedSaveContent = useDebounceCallback((md: string) => {
		console.log("debouncedSaveContent", md);
		window.localStorage.setItem("post-draft/content", md);
	}, 100);

	const debouncedSaveTitle = useDebounceCallback((title: string) => {
		console.log("debouncedSaveTitle", title);
		window.localStorage.setItem("post-draft/title", title);
	}, 100);
	console.log("tags in component", tags);
	// biome-ignore lint/correctness/useExhaustiveDependencies: only run on mount
	useEffect(() => {
		const loadEditor = async () => {
			const Crepe = await import("@milkdown/crepe").then(
				(module) => module.Crepe,
			);
			const draft = window.localStorage.getItem("post-draft/content");
			const draftTitle = window.localStorage.getItem("post-draft/title");
			console.log("draft", draft);
			console.log("draftTitle", draftTitle);
			if (draftTitle) {
				setTitle(draftTitle);
			}
			if (draft || draftTitle) {
				toast.success("Draft loaded from local storage");
			}
			const crepe = new Crepe({
				root: editorRootRef.current,
				defaultValue: draft || "Let's write something!",
			});

			editorRef.current = crepe;
			crepe.create();
			crepe.on((listener) => {
				console.log("listener", listener);
				listener.markdownUpdated((ctx, md) => {
					debouncedSaveContent(md);
				});
			});
		};
		loadEditor().finally(() => setIsEditorLoaded(true));

		return () => {
			console.log("unmounting");
			editorRef.current?.destroy();
			editorRef.current = null;
		};
	}, []);

	return (
		<div className="space-y-2 max-w-screen-md mx-auto">
			<div className="sticky top-0 z-10 flex justify-end border-b bg-background py-2">
				<Button
					onClick={async () => {
						const payload = {
							title: title,
							content: editorRef.current?.getMarkdown() ?? "",
							tagsIds: tags.map((tag) => tag.value),
						};
						const postId = await createPost(payload);
						if (postId) {
							toast.success("Post created");
						} else {
							toast.error("Failed to create post");
						}
						toast("Post created");
					}}
				>
					Save
				</Button>
			</div>
			<div>
				<div className="">
					<input
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
							debouncedSaveTitle(e.target.value);
						}}
						type="text"
						placeholder="Title"
						className="md:text-5xl text-5xl font-semibold shadow-none border-none focus:outline-hidden w-full"
					/>
				</div>
				<div className="flex flex-row gap-2 items-center mt-4">
					<p>Tags: </p>
					<TagsSelect className="flex-1" />
				</div>

				<div ref={editorRootRef} {...styleProps} className="mt-8">
					{!isEditorLoaded ? loading : undefined}
				</div>
			</div>
		</div>
	);
};
export default MilkdownEditor;
