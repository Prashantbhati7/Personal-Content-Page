import React from "react";
import { BlockComponentProps } from "./TextBlock";

export const HeaderBlock: React.FC<BlockComponentProps> = ({ props, isGhost }) => {
  const level = props.level || "h2";
  const Tag = level as React.ElementType;

  const getStyle = () => {
    switch (level) {
      case "h1": return "text-4xl font-extrabold tracking-tight";
      case "h2": return "text-3xl font-semibold tracking-tight";
      case "h3": return "text-2xl font-semibold tracking-tight";
      case "h4": return "text-xl font-semibold tracking-tight";
      case "h5": return "text-lg font-semibold tracking-tight";
      case "h6": return "text-base font-semibold tracking-tight";
      default: return "text-2xl font-semibold tracking-tight";
    }
  };

  return (
    <div className={`py-2 px-4 rounded-md border border-transparent ${isGhost ? "opacity-50" : ""}`}>
      <Tag className={getStyle()}>{props.text || "Heading"}</Tag>
    </div>
  );
};
