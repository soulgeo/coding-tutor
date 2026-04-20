import ReactMarkdown, { type Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { CSSProperties } from "react";

interface Props {
  content: string;
}

const MarkdownRenderer = ({ content }: Props) => {
  const components: Components = {
    code(props) {
      const { children, className } = props;
      const match = /language-(\w+)/.exec(className || "");

      return match ? (
        <div className="rounded-lg overflow-hidden border border-base-300 bg-base-200">
          <SyntaxHighlighter
            style={vscDarkPlus as { [key: string]: CSSProperties }}
            language={match[1]}
            PreTag="div"
            customStyle={{
              margin: 0,
              background: "transparent",
              border: "none",
              boxShadow: "none",
              width: "100%",
              fontSize: "0.9rem",
              lineHeight: "1.6",
            }}
            codeTagProps={{
              style: {
                background: "transparent",
                border: "none",
                padding: 0,
              },
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className={className}>{children}</code>
      );
    },
  };

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
