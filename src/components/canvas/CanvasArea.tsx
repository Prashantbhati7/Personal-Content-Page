import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useBuilderStore } from "../../store/useBuilderStore";
import { BlockWrapper } from "./BlockWrapper";
import { AnimatePresence, motion } from "framer-motion";

export const CanvasArea = () => {
  const { blocks } = useBuilderStore();
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-droppable",
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-full w-full overflow-y-auto p-6 transition-colors ${
        isOver && blocks.length === 0 ? "bg-primary/5" : ""
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          useBuilderStore.getState().selectBlock(null);
        }
      }}
    >
      <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-4 pb-32">
          <AnimatePresence>
            {blocks.map((block) => (
              <motion.div
                key={block.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              >
                <BlockWrapper block={block} />
              </motion.div>
            ))}
          </AnimatePresence>
          
          {blocks.length === 0 && (
            <div className="h-48 border-2 border-dashed border-muted-foreground/25 rounded-xl flex items-center justify-center text-muted-foreground bg-muted/20 animate-pulse">
              Drag something here to start building...
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};
