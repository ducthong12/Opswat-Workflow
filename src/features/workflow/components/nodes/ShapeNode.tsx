import { Handle, Position, NodeResizer, type NodeProps } from "@xyflow/react";
import type { AppNode } from "../../../../types/workflow";
import { WORKFLOW_CONFIG } from "../../constants/workflow";
import { SHAPE_DEFINITIONS } from "../config/shapeRegistry";

export default function ShapeNode({ id, data, selected }: NodeProps<AppNode>) {
  const shape = data.shapeType || "rectangle";
  const color = (data.color as string) || "#ffffff";
  const stroke = selected
    ? WORKFLOW_CONFIG.EDGE.STROKE_COLOR_SELECTED
    : WORKFLOW_CONFIG.EDGE.STROKE_COLOR;

  const currentShape = SHAPE_DEFINITIONS[shape] || SHAPE_DEFINITIONS.rectangle;
  const offsets = currentShape.handleOffsets || {};

  const handleVisibility = selected
    ? "opacity-100"
    : "opacity-0 group-hover:opacity-100";
  const handleBaseClass = `w-2.5 h-2.5 bg-slate-200 border-2 border-slate-600 hover:bg-blue-500 hover:scale-150 transition-all duration-200 cursor-crosshair z-20 ${handleVisibility}`;
  const isTextType = shape === "text" || shape === "heading";

  return (
    <>
      <NodeResizer
        color={WORKFLOW_CONFIG.EDGE.STROKE_COLOR_SELECTED}
        isVisible={selected}
        minWidth={WORKFLOW_CONFIG.NODE.MIN_WIDTH}
        minHeight={WORKFLOW_CONFIG.NODE.MIN_HEIGHT}
        handleStyle={{
          width: WORKFLOW_CONFIG.NODE.RESIZE_DOT_SIZE,
          height: WORKFLOW_CONFIG.NODE.RESIZE_DOT_SIZE,
          borderRadius: WORKFLOW_CONFIG.NODE.RESIZE_BORDER_RADIUS,
          border: `${WORKFLOW_CONFIG.NODE.RESIZE_BORDER_SIZE}px solid #fff`,
        }}
      />
      <div
        className="group relative w-full h-full flex items-center justify-center"
        style={{
          minWidth: WORKFLOW_CONFIG.NODE.MIN_WIDTH,
          minHeight: WORKFLOW_CONFIG.NODE.MIN_HEIGHT,
        }}
      >
        {currentShape.render({
          id: id,
          color: color,
          stroke: stroke,
          label: data.label,
          imageUrl: data.imageUrl,
        })}
        {!isTextType && data.label && (
          <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-20 w-[160%] pointer-events-none">
            <span className="text-[9px] font-bold text-slate-700 bg-white/90 px-1.5 py-0.5 rounded shadow-sm block text-center whitespace-pre-wrap break-words leading-tight">
              {data.label}
            </span>
          </div>
        )}
        <Handle
          type="target"
          position={Position.Top}
          id="top"
          className={handleBaseClass}
          style={{
            ...offsets?.top,
            top: 0,
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          className={handleBaseClass}
          style={{
            ...offsets?.right,
            right: 0,
            top: "50%",
            transform: "translate(50%, -50%)",
          }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          className={handleBaseClass}
          style={{
            ...offsets?.bottom,
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 50%)",
          }}
        />
        <Handle
          type="target"
          position={Position.Left}
          id="left"
          className={handleBaseClass}
          style={{
            ...offsets?.left,
            left: 0,
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </>
  );
}
