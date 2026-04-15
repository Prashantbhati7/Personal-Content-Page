import { create } from "zustand";
import { Block, PageData } from "../types";

interface BuilderState {
  // State
  blocks: Block[];
  selectedBlockId: string | null;
  isDragging: boolean;
  
  // History
  past: Block[][];
  future: Block[][];
  
  // Actions
  addBlock: (block: Block, index?: number) => void;
  updateBlock: (id: string, newProps: Record<string, any>) => void;
  deleteBlock: (id: string) => void;
  duplicateBlock: (id: string, newId: string) => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
  
  // Selection & UI
  selectBlock: (id: string | null) => void;
  setDragging: (isDragging: boolean) => void;
  
  // History Actions
  undo: () => void;
  redo: () => void;
  
   
  loadState: (blocks: Block[]) => void;
}

const pushHistory = (state: BuilderState) => {
  return {
    past: [...state.past, state.blocks],
    future: [],
  };
};

export const useBuilderStore = create<BuilderState>((set, get) => ({
  blocks: [],
  selectedBlockId: null,
  isDragging: false,
  past: [],
  future: [],

  addBlock: (block, index) => set((state) => {
    const newBlocks = [...state.blocks];
    if (index !== undefined) {
      newBlocks.splice(index, 0, block);
    } else {
      newBlocks.push(block);
    }
    return {
      blocks: newBlocks,
      ...pushHistory(state),
    };
  }),

  updateBlock: (id, newProps) => set((state) => {
    const newBlocks = state.blocks.map((b) =>
      b.id === id ? { ...b, props: { ...b.props, ...newProps } } : b
    );
    return {
      blocks: newBlocks,
      ...pushHistory(state),
    };
  }),

  deleteBlock: (id) => set((state) => {
    const newBlocks = state.blocks.filter((b) => b.id !== id);
    return {
      blocks: newBlocks,
      selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
      ...pushHistory(state),
    };
  }),

  duplicateBlock: (id, newId) => set((state) => {
    const blockIndex = state.blocks.findIndex((b) => b.id === id);
    if (blockIndex === -1) return state;
    
    const currBlock = state.blocks[blockIndex];
    const duplicatedBlock = { ...currBlock, id: newId };
    
    const newBlocks = [...state.blocks];
    newBlocks.splice(blockIndex + 1, 0, duplicatedBlock);
    
    return {
      blocks: newBlocks,
      ...pushHistory(state),
    };
  }),

  reorderBlocks: (fromIndex, toIndex) => set((state) => {
    const newBlocks = [...state.blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);
    
    return {
      blocks: newBlocks,
      ...pushHistory(state),
    };
  }),

  selectBlock: (id) => set({ selectedBlockId: id }),
  
  setDragging: (isDragging) => set({ isDragging }),

  undo: () => set((state) => {
    if (state.past.length === 0) return state;
    const previous = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, state.past.length - 1);
    
    return {
      past: newPast,
      blocks: previous,
      future: [state.blocks, ...state.future],
      // Clear selection if undone block is missing
      selectedBlockId: previous.find(b => b.id === state.selectedBlockId) ? state.selectedBlockId : null
    };
  }),

  redo: () => set((state) => {
    if (state.future.length === 0) return state;
    const next = state.future[0];
    const newFuture = state.future.slice(1);
    
    return {
      past: [...state.past, state.blocks],
      blocks: next,
      future: newFuture,
    };
  }),

  loadState: (blocks) => set({
    blocks,
    past: [],
    future: [],
    selectedBlockId: null,
  }),
}));
 
const STORAGE_KEY = "builder_page_state";
let debounceTimeout: number | undefined;

useBuilderStore.subscribe((state) => {
   
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const pageData: PageData = {
      version: 1,
      blocks: state.blocks,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pageData));
  }, 1000) as unknown as number;  
});
 
export const initializeStoreFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as PageData;
      if (parsed.version === 1 && Array.isArray(parsed.blocks)) {
        useBuilderStore.getState().loadState(parsed.blocks);
      }
    }
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
  }
};
