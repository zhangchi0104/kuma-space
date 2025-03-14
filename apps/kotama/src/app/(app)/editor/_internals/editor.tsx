/** @format */

"use client";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";

// We have some themes for you to choose
import "./style.css";
import { useEffect, useRef, useState } from "react";

import type { Crepe } from "@milkdown/crepe";
import { BaseStyleProps } from "@/src/lib/typings";
import { Input } from "@/src/components/ui/input";
import TagsSelect from "./tags-input";
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

  useEffect(() => {
    const loadEditor = async () => {
      const Crepe = await import("@milkdown/crepe").then(
        (module) => module.Crepe
      );
      // const lazyGithubTheme = await lazyLoadCodeBlockTheme(resolvedTheme);
      const crepe = new Crepe({
        root: editorRootRef.current,
        defaultValue: "Hello, Milkdown!",
      });
      editorRef.current = crepe;
      crepe.create();
    };
    loadEditor().finally(() => setIsEditorLoaded(true));
    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  return (
    <>
      <div className="">
        <input
          type="text"
          placeholder="Title"
          className="md:text-3xl font-semibold shadow-none border-none focus:outline-none"
        />
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p>Tags: </p>
        <TagsSelect className="flex-1" />
      </div>

      <div ref={editorRootRef} {...styleProps}>
        {!isEditorLoaded ? loading : undefined}
      </div>
    </>
  );
};
export default MilkdownEditor;
