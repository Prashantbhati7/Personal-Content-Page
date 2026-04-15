export type BlockType = "text" | "image" | "header";

export type Block = {
  id: string;
  type: BlockType;
  props: Record<string, any>;
};

export type PageData = {
  version: number;
  blocks: Block[];
};

export type HistoryState = {
  past: PageData[];
  present: PageData;
  future: PageData[];
};
