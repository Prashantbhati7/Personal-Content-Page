import { BlockType } from "../../types";
import { TextBlock } from "./TextBlock";
import { ImageBlock } from "./ImageBlock";
import { HeaderBlock } from "./HeaderBlock";
import { MarkdownBlock } from "./MarkdownBlock";
import { RichTextBlock } from "./RichTextBlock";
import { Type, ImageIcon, Heading, FileText, Layout } from "lucide-react";

export const blockComponents = {
  text: TextBlock,
  image: ImageBlock,
  header: HeaderBlock,
  markdown: MarkdownBlock,
  "rich-text": RichTextBlock,
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
  markdown: {
    label: "Markdown",
    icon: FileText,
    defaultProps: { content: "### Markdown Preview\n\nStart typing **markdown**..." },
  },
  "rich-text": {
    label: "Rich Text",
    icon: Layout,
    defaultProps: { content: "This is a <strong>rich text</strong> block." },
  },
};
