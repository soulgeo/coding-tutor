import { Editor, type OnMount, type BeforeMount } from "@monaco-editor/react";
import { useRef, useEffect, useState } from "react";

interface Props {
  pretypedCode?: string;
  value: string;
  onChange: (newValue: string) => void;
}

export const DEFAULT_CODE = `print('Hello world')`;

const CodeEditor = ({ pretypedCode, value, onChange }: Props) => {
  type EditorInstance = Parameters<OnMount>[0];

  const editorRef = useRef<EditorInstance | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleEditorWillMount: BeforeMount = (monaco) => {
    // DaisyUI 5 Dark Theme Colors (approximate hex)
    monaco.editor.defineTheme("daisyui-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1d232a", // base-100
        "editor.lineHighlightBackground": "#191e24", // base-200
        "editorLineNumber.foreground": "#a6adbb80",
        "editor.selectionBackground": "#a6adbb20",
      },
    });

    // DaisyUI 5 Light Theme Colors (approximate hex)
    monaco.editor.defineTheme("daisyui-light", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#ffffff", // base-100
        "editor.lineHighlightBackground": "#f2f2f2", // base-200
        "editorLineNumber.foreground": "#1f293780",
        "editor.selectionBackground": "#1f293720",
      },
    });
  };

  return (
    <div className="h-full rounded-lg overflow-hidden border border-base-300">
      <Editor
        width="100%"
        height="100%"
        theme={isDarkMode ? "daisyui-dark" : "daisyui-light"}
        defaultLanguage="python"
        defaultValue={pretypedCode || DEFAULT_CODE}
        value={value}
        beforeMount={handleEditorWillMount}
        onMount={(editor) => {
          editorRef.current = editor;
          editor.focus();
        }}
        onChange={(value) => onChange(value || "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 16, bottom: 16 },
          automaticLayout: true,
        }}
      />
    </div>
  );
};
export default CodeEditor;
