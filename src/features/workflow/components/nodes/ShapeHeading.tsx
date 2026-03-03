import { useEffect, useRef } from "react";
import { useWorkflowStore } from "../../stores/useWorkflowStore";

export default function ShapeHeading({
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
    <div
      className={`relative z-10 w-full h-full flex items-center justify-center p-2`}
      id={id}
    >
      <textarea
        ref={textAreaRef}
        value={label}
        placeholder="Type..."
        spellCheck={false}
        className={`w-full bg-transparent border-none outline-none resize-none text-center cursor-text pointer-events-auto text-lg font-black`}
        rows={1}
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
