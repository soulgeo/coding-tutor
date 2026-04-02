import { Editor, type OnMount } from "@monaco-editor/react";
import { useRef, useState } from "react";

interface Props {
  pretypedCode?: string;
}

const CodeEditor = ({pretypedCode}: Props) => {
  type EditorInstance = Parameters<OnMount>[0];

  const editorRef = useRef<EditorInstance | null>(null)
  const [value, setValue] = useState('')

  const helloWorld = `def hello():
    print('Hello world')`;

  return (
    <Editor
      height="70vh"
      width="100%"
      theme="vs-dark"
      defaultLanguage="python"
      defaultValue={pretypedCode || helloWorld}
      value={value}
      onMount={
        (editor) => {
          editorRef.current = editor;
          editor.focus()
        }
      }
      onChange={
        (value) => setValue(value || "")
      }
    />
  );
};
export default CodeEditor;
