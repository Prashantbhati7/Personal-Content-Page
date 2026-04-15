import React from "react";
import { useBuilderStore } from "../../store/useBuilderStore";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Block } from "../../types";
import { Upload } from "lucide-react";

export const SettingsPanel = () => {
  const { blocks, selectedBlockId, updateBlock } = useBuilderStore();
  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground text-center">
        <p className="text-sm">Select a block on the canvas to configure it.</p>
      </div>
    );
  }

  const handleUpdate = (key: string, value: any) => {
    updateBlock(selectedBlock.id, { [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 pb-4 border-b">
        <h3 className="font-semibold text-sm">Block Options</h3>
        <p className="text-xs text-muted-foreground capitalize">Type: {selectedBlock.type}</p>
      </div>

      <Configurator block={selectedBlock} onChange={handleUpdate} />
    </div>
  );
};

const Configurator = ({ block, onChange }: { block: Block; onChange: (key: string, value: any) => void }) => {
  switch (block.type) {
    case "text":
    case "markdown":
    case "rich-text":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">
              {block.type === "markdown" ? "Markdown Content" : block.type === "rich-text" ? "HTML Content" : "Text Content"}
            </Label>
            <Textarea
              id="content"
              value={block.props.content || ""}
              onChange={(e) => onChange("content", e.target.value)}
              placeholder={block.type === "markdown" ? "# Title\n\nContent..." : block.type === "rich-text" ? "<div>Formatting here...</div>" : "Write some text..."}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
          {block.type === "rich-text" && (
            <p className="text-[10px] text-muted-foreground italic">
              Note: You can use HTML tags for formatting in this block.
            </p>
          )}
        </div>
      );

    case "header":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Heading Text</Label>
            <Input
              id="text"
              value={block.props.text || ""}
              onChange={(e) => onChange("text", e.target.value)}
              placeholder="Heading..."
            />
          </div>
          <div className="space-y-2">
            <Label>Heading Level</Label>
            <Select value={block.props.level || "h2"} onValueChange={(val) => onChange("level", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="h1">Heading 1 (H1)</SelectItem>
                <SelectItem value="h2">Heading 2 (H2)</SelectItem>
                <SelectItem value="h3">Heading 3 (H3)</SelectItem>
                <SelectItem value="h4">Heading 4 (H4)</SelectItem>
                <SelectItem value="h5">Heading 5 (H5)</SelectItem>
                <SelectItem value="h6">Heading 6 (H6)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );

    case "image": {
      const [isDragging, setIsDragging] = React.useState(false);
      const fileInputRef = React.useRef<HTMLInputElement>(null);

      const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
          alert("Please upload an image file.");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          onChange("url", base64);
        };
        reader.readAsDataURL(file);
      };

      const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
      };

      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Image Source</Label>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              className={`
                relative border-2 border-dashed rounded-xl p-6 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer
                ${isDragging ? "border-primary bg-primary/5 scale-[0.98]" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30"}
              `}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
              <div className="p-3 rounded-full bg-background shadow-sm border mb-1">
                <Upload className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-xs font-medium text-center">Click to upload or drag and drop</p>
              <p className="text-[10px] text-muted-foreground opacity-70">PNG, JPG or GIF (max 5MB)</p>
            </div>
          </div>

          <div className="relative py-2 flex items-center">
            <div className="flex-grow border-t border-muted"></div>
            <span className="flex-shrink mx-4 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Or</span>
            <div className="flex-grow border-t border-muted"></div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">External Image URL</Label>
            <Input
              id="url"
              type="url"
              value={block.props.url?.startsWith("data:") ? "" : (block.props.url || "")}
              onChange={(e) => onChange("url", e.target.value)}
              placeholder="https://example.com/image.png"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="alt">Alt Text (Accessibility)</Label>
            <Input
              id="alt"
              value={block.props.alt || ""}
              onChange={(e) => onChange("alt", e.target.value)}
              placeholder="Description of the image"
            />
          </div>
        </div>
      );
    }

    default:
      return <div className="text-sm text-destructive">Unknown block type</div>;
  }
};
