import { BlockType } from "../../types";
import { TextBlock } from "./TextBlock";
import { ImageBlock } from "./ImageBlock";
import { HeaderBlock } from "./HeaderBlock";
import { Type, ImageIcon, Heading } from "lucide-react";

export const blockComponents = {
  text: TextBlock,
  image: ImageBlock,
  header: HeaderBlock,
};

export const blockTemplates: Record<BlockType, { label: string; icon: React.ElementType; defaultProps: Record<string, any> }> = {
  text: {
    label: "Text",
    icon: Type,
    defaultProps: { content: "Start writing here..." },
  },
  header: {
    label: "Header",
    icon: Heading,
    defaultProps: { text: "New Heading", level: "h2" },
  },
  image: {
    label: "Image",
    icon: ImageIcon,
    defaultProps: { url: "", alt: "" },
  },
};
