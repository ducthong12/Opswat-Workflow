// src/features/workflow/components/panels/EdgeProperties.tsx
import {
  Settings2,
  Palette,
  Type,
  ArrowRight,
  ArrowLeftRight,
  Minus,
  MoreHorizontal,
  ArrowLeft,
} from "lucide-react";
import { MarkerType, type Edge } from "@xyflow/react";
import { WORKFLOW_CONFIG } from "../../constants/workflow";

const PRESET_COLORS = [
  "#94a3b8", // Xám (Mặc định)
  "#ef4444", // Đỏ
  "#eab308", // Vàng
  "#22c55e", // Xanh lá
  "#3b82f6", // Xanh dương
  "#a855f7", // Tím
];

interface EdgePropertiesProps {
  selectedEdge: Edge;
  updateEdge: (id: string, updates: Partial<Edge>) => void;
}

export default function EdgeProperties({
  selectedEdge,
  updateEdge,
}: EdgePropertiesProps) {
  const edgeColor = selectedEdge.style?.stroke || "#94a3b8";
  const isDashed = selectedEdge.style?.strokeDasharray === "5 5";
  const hasMarkerStart = !!selectedEdge.markerStart;
  const hasMarkerEnd = !!selectedEdge.markerEnd;

  return (
    <aside className="w-80 border-l border-slate-200 bg-white flex flex-col shadow-sm z-10 transition-all overflow-y-auto">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2 text-slate-800">
          <Settings2 size={18} />
          <h2 className="text-sm font-bold">Connection Settings</h2>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Type size={14} /> Text
          </label>
          <input
            type="text"
            value={(selectedEdge.label as string) || ""}
            onChange={(e) =>
              updateEdge(selectedEdge.id, { label: e.target.value })
            }
            className="w-full px-3 py-2 text-sm text-slate-800 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            placeholder="Ví dụ: Yes, No, Success..."
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Line Style
          </label>
          <div className="flex gap-2">
            <button
              onClick={() =>
                updateEdge(selectedEdge.id, {
                  style: { ...selectedEdge.style, strokeDasharray: undefined },
                })
              }
              className={`flex-1 py-2 flex justify-center border rounded-md transition-all ${!isDashed ? "border-blue-500 bg-blue-50 shadow-sm" : "border-slate-300 hover:bg-slate-50"}`}
              title="Solid Line"
            >
              <Minus size={18} className="text-slate-600" />
            </button>
            <button
              onClick={() =>
                updateEdge(selectedEdge.id, {
                  style: { ...selectedEdge.style, strokeDasharray: "5 5" },
                })
              }
              className={`flex-1 py-2 flex justify-center border rounded-md transition-all ${isDashed ? "border-blue-500 bg-blue-50 shadow-sm" : "border-slate-300 hover:bg-slate-50"}`}
              title="Dashed Line"
            >
              <MoreHorizontal size={18} className="text-slate-600" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Direction
          </label>
          <div className="flex gap-2">
            <button
              onClick={() =>
                updateEdge(selectedEdge.id, {
                  markerStart: undefined,
                  markerEnd: undefined,
                })
              }
              className={`flex-1 py-2 flex justify-center border rounded-md transition-all ${!hasMarkerStart && !hasMarkerEnd ? "border-blue-500 bg-blue-50 shadow-sm" : "border-slate-300 hover:bg-slate-50"}`}
              title="No Arrow"
            >
              <Minus size={18} className="text-slate-600" />
            </button>
            <button
              onClick={() =>
                updateEdge(selectedEdge.id, {
                  markerStart: undefined,
                  markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: WORKFLOW_CONFIG.EDGE.ARROW_SIZE,
                    height: WORKFLOW_CONFIG.EDGE.ARROW_SIZE,
                    color: edgeColor,
                  },
                })
              }
              className={`flex-1 py-2 flex justify-center border rounded-md transition-all ${!hasMarkerStart && hasMarkerEnd ? "border-blue-500 bg-blue-50 shadow-sm" : "border-slate-300 hover:bg-slate-50"}`}
              title="1 Way"
            >
              <ArrowRight size={18} className="text-slate-600" />
            </button>
            <button
              onClick={() =>
                updateEdge(selectedEdge.id, {
                  markerStart: {
                    type: MarkerType.ArrowClosed,
                    width: WORKFLOW_CONFIG.EDGE.ARROW_SIZE,
                    height: WORKFLOW_CONFIG.EDGE.ARROW_SIZE,
                    color: edgeColor,
                    orient: "auto-start-reverse",
                  },
                  markerEnd: undefined,
                })
              }
              className={`flex-1 min-w-[40px] py-2 flex justify-center border rounded-md transition-all ${hasMarkerStart && !hasMarkerEnd ? "border-blue-500 bg-blue-50 shadow-sm" : "border-slate-300 hover:bg-slate-50"}`}
              title="Backward"
            >
              <ArrowLeft size={18} className="text-slate-600" />
            </button>
            <button
              onClick={() =>
                updateEdge(selectedEdge.id, {
                  markerStart: {
                    type: MarkerType.ArrowClosed,
                    width: WORKFLOW_CONFIG.EDGE.ARROW_SIZE,
                    height: WORKFLOW_CONFIG.EDGE.ARROW_SIZE,
                    color: edgeColor,
                    orient: "auto-start-reverse",
                  },
                  markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: WORKFLOW_CONFIG.EDGE.ARROW_SIZE,
                    height: WORKFLOW_CONFIG.EDGE.ARROW_SIZE,
                    color: edgeColor,
                  },
                })
              }
              className={`flex-1 py-2 flex justify-center border rounded-md transition-all ${hasMarkerStart && hasMarkerEnd ? "border-blue-500 bg-blue-50 shadow-sm" : "border-slate-300 hover:bg-slate-50"}`}
              title="2 Ways"
            >
              <ArrowLeftRight size={18} className="text-slate-600" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-3 bg-slate-50 border border-slate-100 rounded-lg mt-2">
          <div className="flex items-center gap-2 text-slate-600 mb-1">
            <Palette size={14} />
            <label className="text-xs font-bold uppercase tracking-wider">
              Line Color
            </label>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                onClick={() =>
                  updateEdge(selectedEdge.id, {
                    style: { ...selectedEdge.style, stroke: color },
                  })
                }
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  edgeColor === color
                    ? "border-slate-800 scale-110 shadow-md"
                    : "border-slate-300 hover:scale-110 hover:shadow-sm"
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
