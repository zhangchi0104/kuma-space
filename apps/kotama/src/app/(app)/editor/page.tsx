/** @format */

'use client';
import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';

// We have some themes for you to choose
import './_internals/style.css';
import { codeBlockConfig } from '@milkdown/kit/component/code-block';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import type { Crepe } from '@milkdown/crepe';
// import { Crepe } from '@milkdown/crepe';
function lazyLoadCodeBlockTheme(theme: string | undefined) {
  return theme === 'dark'
    ? import('@uiw/codemirror-theme-github').then((mod) => mod.githubDarkInit)
    : import('@uiw/codemirror-theme-github').then((mod) => mod.githubLightInit);
}
const EditorPage = () => {
  const editorRef = useRef<Crepe | null>(null);
  const editorRootRef = useRef<HTMLDivElement>(null);
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  useEffect(() => {
    const loadEditor = async () => {
      const Crepe = await import('@milkdown/crepe').then(
        (module) => module.Crepe
      );
      const lazyGithubTheme = await lazyLoadCodeBlockTheme(resolvedTheme);
      const crepe = new Crepe({
        root: editorRootRef.current,
        defaultValue: 'Hello, Milkdown!',
        featureConfigs: {},
      });
      editorRef.current = crepe;
      crepe.create().then(() => {
        console.log('Editor created');
      });
    };
    loadEditor().finally(() => setIsEditorLoaded(true));
    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, []);
  useEffect(() => {
    const updateTheme = async () => {
      const themePlugin = await lazyLoadCodeBlockTheme(resolvedTheme);
      console.log({ editor: editorRef.current });
    };
    updateTheme();
  }, [resolvedTheme]);

  return (
    <div ref={editorRootRef}>{!isEditorLoaded ? 'loading' : undefined}</div>
  );
};
export default EditorPage;
