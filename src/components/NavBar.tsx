import React from 'react';
import { Undo2, Redo2 } from "lucide-react";
import { Button } from "./ui/button";

interface NavBarProps {
  past: any[];
  future: any[];
  undo: () => void;
  redo: () => void;
}

const NavBar = ({ past, undo, future, redo }: NavBarProps) => {
  return (
    <header className="h-14 border-b bg-black text-white flex items-center justify-between px-4 shrink-0">
      <h1 className="font-semibold text-lg text-white">Page Builder</h1>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={undo}
          disabled={past.length === 0}
          className="flex bg-white text-black gap-2"
        >
          <Undo2 className="w-4 h-4" /> Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={redo}
          disabled={future.length === 0}
          className="flex text-black bg-white gap-2"
        >
          <Redo2 className="w-4 h-4" /> Redo
        </Button>
      </div>
    </header>
  );
};

export default NavBar;
