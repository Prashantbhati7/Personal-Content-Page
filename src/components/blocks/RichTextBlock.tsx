import React from "react";
import { BlockComponentProps } from "./TextBlock";

export const RichTextBlock: React.FC<BlockComponentProps> = ({ props, isGhost }) => {
  const content = props.content || "This is a <strong>rich text</strong> block. It can contain <em>formatted</em> text.";

  return (
    <div 
      className={`p-6 bg-white dark:bg-zinc-900 border shadow-sm rounded-xl min-h-[100px] transition-all ${
        isGhost ? "opacity-50" : "hover:shadow-md"
      }`}
    >
      <div 
        className="prose dark:prose-invert max-w-none focus:outline-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="mt-4 pt-4 border-t border-muted/30 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500/50" />
        <div className="w-2 h-2 rounded-full bg-purple-500/50" />
        <div className="w-2 h-2 rounded-full bg-pink-500/50" />
      </div>
    </div>
  );
};
