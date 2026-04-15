import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBuilderStore } from "../../store/useBuilderStore";
import { blockComponents } from "../blocks/BlockRegistry";
import { Block } from "../../types";
import { Copy, GripVertical, Trash2 } from "lucide-react";
import { nanoid } from "nanoid";

export const BlockWrapper: React.FC<{ block: Block }> = ({ block }) => {
  const { selectedBlockId, selectBlock, deleteBlock, duplicateBlock } = useBuilderStore();
  const isSelected = selectedBlockId === block.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  const Comp = blockComponents[block.type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative rounded-xl transition-all outline outline-2 outline-transparent ${
        isDragging ? "opacity-30 shadow-2xl scale-105" : ""
      } ${isSelected ? "!outline-primary ring-4 ring-primary/20" : "hover:outline-primary/50"}`}
      onClick={(e) => {
        e.stopPropagation();
        selectBlock(block.id);
      }}
    >
      
      <div className="relative z-10 w-full h-full bg-background rounded-xl">
        <Comp id={block.id} props={block.props} />
      </div>

      {/* Hover Controls (visible on hover or when selected) */}
      <div className={`absolute -top-3 right-4 flex items-center gap-1 bg-primary text-primary-foreground p-1 rounded-md shadow-md z-20 opacity-0 transition-opacity ${isSelected ? "opacity-100" : "group-hover:opacity-100"} ${isDragging ? "!hidden" : ""}`}>
        <button
          className="p-1 hover:bg-white/20 rounded text-xs transition-colors"
          title="Duplicate"
          onClick={(e) => {
            e.stopPropagation();
            duplicateBlock(block.id, nanoid());
          }}
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded text-xs transition-colors"
          title="Delete"
          onClick={(e) => {
            e.stopPropagation();
            deleteBlock(block.id);
          }}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
        <div className="w-[1px] h-4 bg-primary-foreground/30 mx-1" />
        <button
          ref={setActivatorNodeRef}
          {...listeners}
          {...attributes}
          className="p-1 hover:bg-white/20 rounded cursor-grab active:cursor-grabbing transition-colors"
          title="Drag to move"
        >
          <GripVertical className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
