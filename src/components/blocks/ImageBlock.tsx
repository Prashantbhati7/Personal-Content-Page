import React, { useState } from "react";
import { ImageIcon } from "lucide-react";
import { BlockComponentProps } from "./TextBlock";

export const ImageBlock: React.FC<BlockComponentProps> = ({ props, isGhost }) => {
  const [error, setError] = useState(false);

  if (!props.url || error) {
    return (
      <div className={`p-8 bg-muted/20 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground transition-colors hover:bg-muted/30 ${isGhost ? "opacity-50" : ""}`}>
        <div className="p-4 rounded-full bg-background mb-4 shadow-sm border">
          <ImageIcon className="w-8 h-8 opacity-50" />
        </div>
        <p className="font-medium">No image yet</p>
        <p className="text-xs opacity-70 mt-1 text-center">Select this block to upload from your PC <br/> or paste a URL in the sidebar.</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-md border ${isGhost ? "opacity-50" : ""}`}>
      <img
        src={props.url}
        alt={props.alt || "Block image"}
        className="w-full object-cover max-h-[500px]"
        onError={() => setError(true)}
      />
    </div>
  );
};
