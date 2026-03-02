// src/features/workflow/components/nodes/ShapeNode.tsx
import { Handle, Position, NodeResizer, type NodeProps } from "@xyflow/react";
import type { AppNode } from "../../../../types/workflow";
import ShapeDiamond from "./ShapeDiamond";
import ShapeTriangle from "./ShapeTriangle";
import ShapeDatabase from "./ShapeDatabase";
import ShapeCube from "./ShapeCube";

const SHAPE_DEFINITIONS: Record<
  string,
  (color: string, stroke: string) => React.ReactNode
> = {
  rectangle: (color, stroke) => (
    <rect
      x="2"
      y="2"
      width="96"
      height="96"
      rx="8"
      fill={color}
      stroke={stroke}
      strokeWidth="2"
      vectorEffect="non-scaling-stroke"
    />
  ),
  circle: (color, stroke) => (
    <ellipse
      cx="50"
      cy="50"
      rx="48"
      ry="48"
      fill={color}
      stroke={stroke}
      strokeWidth="2"
      vectorEffect="non-scaling-stroke"
    />
  ),
  diamond: (color, stroke) => (
    <ShapeDiamond bgColor={color} strokeColor={stroke}></ShapeDiamond>
  ),
  triangle: (color, stroke) => (
    <ShapeTriangle bgColor={color} strokeColor={stroke}></ShapeTriangle>
  ),
  database: (color, stroke) => (
    <ShapeDatabase bgColor={color} strokeColor={stroke}></ShapeDatabase>
  ),
  cube: (color, stroke) => (
    <ShapeCube bgColor={color} strokeColor={stroke}></ShapeCube>
  ),
};

export default function ShapeNode({ data, selected }: NodeProps<AppNode>) {
  const shape = data.shapeType || "rectangle";
  const bgColor = (data.color as string) || "#ffffff";
  const strokeColor = selected ? "#3b82f6" : "#94a3b8";

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
      <div className="relative w-full h-full min-w-[80px] min-h-[80px] flex items-center justify-center">
        {shape === "diamond" ? (
          <ShapeDiamond
            bgColor={bgColor}
            strokeColor={strokeColor}
          ></ShapeDiamond>
        ) : (
          <div
            className={`absolute inset-0 border-2 transition-colors duration-200 ${
              shape === "circle" ? "rounded-full" : "rounded-md"
            } ${
              selected
                ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                : "border-slate-400 hover:border-blue-400"
            }`}
            style={{ backgroundColor: bgColor }}
          />
        )}
        <div className="relative z-10 text-sm font-bold text-slate-800 text-center px-4 pointer-events-none break-words max-w-full max-h-full overflow-hidden flex items-center justify-center">
          {data.label}
        </div>
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
