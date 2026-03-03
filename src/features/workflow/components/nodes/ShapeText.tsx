// src/features/workflow/components/nodes/ShapeText.tsx
import { useEffect, useRef } from "react";
import { useWorkflowStore } from "../../stores/useWorkflowStore";

export default function ShapeText({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [label]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(id, { label: e.target.value });
  };

  return (
    <div className="relative z-10 w-full h-full flex items-center justify-center p-2 min-h-[30px]">
      <textarea
        ref={textAreaRef}
        value={label}
        rows={1}
        placeholder="Type..."
        spellCheck={false}
        className="w-full bg-transparent border-none outline-none resize-none text-center cursor-text pointer-events-auto text-[10px] font-bold italic overflow-hidden leading-tight"
        style={{
          display: "flex",
          alignItems: "center",
        }}
        onChange={handleTextChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.blur();
          }
        }}
      />
    </div>
  );
}
