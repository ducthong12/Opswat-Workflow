import { Handle, Position, NodeResizer, type NodeProps } from "@xyflow/react";
import type { AppNode } from "../../../../types/workflow";
import type { CSSProperties, ReactNode } from "react";
import { WORKFLOW_CONFIG } from "../../constants/workflow";
import {
  ShapeCircle,
  ShapeDatabase,
  ShapeDiamond,
  ShapeDocument,
  ShapePerson,
  ShapeRectangle,
  ShapeTriangle,
  ShapeCube,
  ShapeText,
  ShapeHeading,
} from "../shape";

interface ShapeDefinition {
  render: (props: {
    id: string;
    color: string;
    stroke: string;
    label: string;
    imageUrl?: string;
  }) => ReactNode;
  handleOffsets?: {
    top?: CSSProperties;
    right?: CSSProperties;
    bottom?: CSSProperties;
    left?: CSSProperties;
  };
}

const SHAPE_DEFINITIONS: Record<string, ShapeDefinition> = {
  rectangle: {
    render: ({ id, color, stroke, imageUrl }) => (
      <ShapeRectangle
        id={id}
        color={color}
        stroke={stroke}
        imageUrl={imageUrl}
      />
    ),
  },
  circle: {
    render: ({ id, color, stroke, imageUrl }) => (
      <ShapeCircle id={id} color={color} stroke={stroke} imageUrl={imageUrl} />
    ),
  },
  diamond: {
    render: ({ id, color, stroke, imageUrl }) => (
      <ShapeDiamond id={id} color={color} stroke={stroke} imageUrl={imageUrl} />
    ),
  },
  triangle: {
    render: ({ id, color, stroke, imageUrl }) => (
      <ShapeTriangle
        id={id}
        color={color}
        stroke={stroke}
        imageUrl={imageUrl}
      />
    ),
    handleOffsets: {
      top: { top: "25%" },
      bottom: { top: "auto", bottom: "25%" },
    },
  },
  database: {
    render: ({ id, color, stroke, imageUrl }) => (
      <ShapeDatabase
        id={id}
        color={color}
        stroke={stroke}
        imageUrl={imageUrl}
      />
    ),
  },
  cube: {
    render: ({ id, color, stroke, imageUrl }) => (
      <ShapeCube id={id} color={color} stroke={stroke} imageUrl={imageUrl} />
    ),
  },
  text: {
    render: ({ id, label }) => <ShapeText id={id} label={label} />,
  },
  heading: {
    render: ({ id, label }) => <ShapeHeading id={id} label={label} />,
  },
  person: {
    render: ({ color, stroke }) => (
      <ShapePerson color={color} stroke={stroke} />
    ),
  },
  document: {
    render: ({ id, color, stroke }) => (
      <ShapeDocument id={id} color={color} stroke={stroke} />
    ),
  },
};

export default function ShapeNode({ id, data, selected }: NodeProps<AppNode>) {
  const shape = data.shapeType || "rectangle";
  const color = (data.color as string) || "#ffffff";
  const stroke = selected ? "#3b82f6" : "#94a3b8";

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
        color="#3b82f6"
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
