import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useBuilderStore } from "../../store/useBuilderStore";
import { blockTemplates, blockComponents } from "../blocks/BlockRegistry";
import { nanoid } from "nanoid";

export const BuilderDndContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { blocks, addBlock, reorderBlocks, setDragging, selectBlock } = useBuilderStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activePaletteType, setActivePaletteType] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    setDragging(true);

    if (active.data.current?.type === "PaletteItem") {
      setActivePaletteType(active.data.current.blockType);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setActivePaletteType(null);
    setDragging(false);

    if (!over) return;  
    // Palette item dropped onto canvas
    if (active.data.current?.type === "PaletteItem" && over.data.current?.sortable) {
      const type = active.data.current.blockType;
      const newBlock = {
        id: nanoid(),
        type,
        props: blockTemplates[type as keyof typeof blockTemplates].defaultProps,
      };
      
      const overIndex = over.data.current.sortable.index;
      addBlock(newBlock, overIndex);
      selectBlock(newBlock.id);
      return;
    }

    
    if (active.data.current?.type === "PaletteItem" && over.id === "canvas-droppable") {
      const type = active.data.current.blockType;
      const newBlock = {
        id: nanoid(),
        type,
        props: blockTemplates[type as keyof typeof blockTemplates].defaultProps,
      };
      
      addBlock(newBlock);
      selectBlock(newBlock.id);
      return;
    }

    
    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((item) => item.id === active.id);
      const newIndex = blocks.findIndex((item) => item.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderBlocks(oldIndex, newIndex);
      }
    }
  };

   
  const renderDragOverlay = () => {
    if (!activeId) return null;

    if (activePaletteType) {
      const type = activePaletteType as keyof typeof blockTemplates;
      const Comp = blockComponents[type];
      return (
        <div className="w-[400px] pointer-events-none scale-105 opacity-90 shadow-2xl transition-transform">
          <Comp id="ghost" props={blockTemplates[type].defaultProps} isGhost />
        </div>
      );
    }

    const draggedBlock = blocks.find((b) => b.id === activeId);
    if (draggedBlock) {
      const Comp = blockComponents[draggedBlock.type];
      return (
        <div className="w-full pointer-events-none scale-102 opacity-90 shadow-2xl transition-transform">
          <Comp id={draggedBlock.id} props={draggedBlock.props} isGhost />
        </div>
      );
    }

    return null;
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay dropAnimation={{ duration: 250, easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)" }}>
        {renderDragOverlay()}
      </DragOverlay>
    </DndContext>
  );
};
