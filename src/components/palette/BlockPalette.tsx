import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { blockTemplates } from "../blocks/BlockRegistry";
import { BlockType } from "../../types";

const PaletteItem = ({ type, label, icon: Icon }: { type: BlockType; label: string; icon: React.ElementType }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: {
      type: "PaletteItem",
      blockType: type,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-3 p-3 mb-2 rounded-md border bg-white text-black hover:border-primary/50 hover:bg-slate-600 cursor-grab active:cursor-grabbing transition-colors ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <Icon className="w-5 h-5 text-muted-foreground" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export const BlockPalette = () => {
  return (
    <div className="flex   flex-col">
      {(Object.entries(blockTemplates) as [BlockType, any][]).map(([type, temp]) => (
        <PaletteItem key={type} type={type} label={temp.label} icon={temp.icon} />
      ))}
    </div>
  );
};
