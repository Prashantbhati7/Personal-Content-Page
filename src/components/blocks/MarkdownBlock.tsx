import React from "react";
import { BlockComponentProps } from "./TextBlock";

export const MarkdownBlock: React.FC<BlockComponentProps> = ({ props, isGhost }) => {
  const content = props.content || "### Markdown Preview\n\nStart typing **markdown** to see it rendered.";

  // Simple basic markdown parser for preview
  const renderMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold mt-2">{line.slice(4)}</h3>;
        if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-3">{line.slice(3)}</h2>;
        if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mt-4">{line.slice(2)}</h1>;
        
        // Lists
        if (line.startsWith('- ')) return <li key={i} className="ml-4 list-disc">{line.slice(2)}</li>;
        if (line.startsWith('* ')) return <li key={i} className="ml-4 list-disc">{line.slice(2)}</li>;

        // Bold and Italic (very simple)
        let processedLine: any = line;
        if (line.trim() === '') return <br key={i} />;

        return <p key={i} className="my-1">{processedLine}</p>;
      });
  };

  return (
    <div className={`p-4 bg-muted/30 border rounded-lg font-mono text-sm leading-relaxed ${isGhost ? "opacity-50" : ""}`}>
      <div className="prose dark:prose-invert max-w-none">
        {renderMarkdown(content)}
      </div>
    </div>
  );
};
