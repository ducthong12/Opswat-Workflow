// src/features/workflow/components/nodes/ShapeNode.tsx
import { Handle, Position, NodeResizer, type NodeProps } from "@xyflow/react";
import type { AppNode } from "../../../../types/workflow";

export default function ShapeNode({ data, selected }: NodeProps<AppNode>) {
  const shape = data.shapeType || "rectangle";
  const isDiamond = shape === "diamond";

  // Lấy màu nền từ data (do Properties Panel đẩy sang)
  const bgColor = (data.color as string) || "#ffffff";

  const borderClass = selected
    ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
    : "border-slate-400 hover:border-blue-400";

  const shapeClass =
    shape === "circle"
      ? "rounded-full"
      : shape === "diamond"
        ? "rotate-45 rounded-sm"
        : "rounded-md";

  return (
    <>
      <NodeResizer
        color="#3b82f6"
        isVisible={selected}
        minWidth={80}
        minHeight={80}
        handleStyle={{
          width: 10,
          height: 10,
          borderRadius: 2,
          border: "2px solid #fff",
        }}
      />

      {/* Bao bọc Node bằng w-full h-full để nó co giãn bám theo khung Resizer */}
      <div className="relative w-full h-full min-w-[80px] min-h-[80px] flex items-center justify-center">
        {/* Lớp Nền (Hiển thị hình dáng và màu sắc) */}
        <div
          className={`absolute inset-0 border-2 ${shapeClass} ${borderClass} transition-colors duration-200`}
          style={{ backgroundColor: bgColor }}
        />

        {/* Lớp Nội dung Text */}
        <div className="relative z-10 text-sm font-bold text-slate-800 text-center px-4 pointer-events-none break-words max-w-full max-h-full overflow-hidden flex items-center justify-center">
          {data.label}
        </div>

        {/* 4 Điểm nối dây (Handles) */}
        <Handle
          type="target"
          position={Position.Top}
          id="top"
          className="w-3 h-3 bg-slate-200 border-2 border-slate-600 hover:bg-blue-500 hover:scale-150 transition-all cursor-crosshair"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          className="w-3 h-3 bg-slate-200 border-2 border-slate-600 hover:bg-blue-500 hover:scale-150 transition-all cursor-crosshair"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          className="w-3 h-3 bg-slate-200 border-2 border-slate-600 hover:bg-blue-500 hover:scale-150 transition-all cursor-crosshair"
        />
        <Handle
          type="target"
          position={Position.Left}
          id="left"
          className="w-3 h-3 bg-slate-200 border-2 border-slate-600 hover:bg-blue-500 hover:scale-150 transition-all cursor-crosshair"
        />
      </div>
    </>
  );
}
