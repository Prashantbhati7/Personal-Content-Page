import React from "react";
import { BlockPalette } from "../palette/BlockPalette";
import { CanvasArea } from "../canvas/CanvasArea";
import { SettingsPanel } from "../settings/SettingsPanel";
import { BuilderDndContext } from "../canvas/BuilderDndContext";
import { useBuilderStore } from "../../store/useBuilderStore";
import NavBar from "../NavBar";

export const BuilderLayout = () => {
  const { past, future, undo, redo } = useBuilderStore();

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden text-foreground">
      
      <NavBar past={past} future={future} undo={undo} redo={redo} />

      <BuilderDndContext>
        <div className="flex flex-1 bg-black  overflow-hidden">
          <aside className="w-64 bg-slate-800 text-white border-r  flex flex-col shrink-0">
            <div className="p-4 font-medium border-b shrink-0">Components</div>
            <div className="flex-1  overflow-auto p-4">
              <BlockPalette />
            </div>
          </aside>

          <main className="flex-1 bg-black p-8 relative flex flex-col">
            <div className="max-w-4xl mx-auto w-full flex-1 bg-background shadow-sm border rounded-xl overflow-hidden min-h-[500px]">
              <CanvasArea />
            </div>  
          </main>

          {/* Settings (Right) */}
          <aside className="w-80 border-l bg-slate-800 text-white flex flex-col shrink-0">
            <div className="p-4 font-medium border-b shrink-0">Configuration</div>
            <div className="flex-1 overflow-auto p-4">
              <SettingsPanel />
            </div>
          </aside>
        </div>
      </BuilderDndContext>
    </div>
  );
};
