import React from "react";

export interface BlockComponentProps {
  id: string;
  props: Record<string, any>;
  isGhost?: boolean;
}

export const TextBlock: React.FC<BlockComponentProps> = ({ props, isGhost }) => {
  return (
    <div className={`p-4 bg-white/50 border rounded-md min-h-[40px] prose dark:prose-invert max-w-none ${isGhost ? "opacity-50" : ""}`}>
      {props.content || "Placeholder text"}
    </div>
  );
};
