// src/features/workflow/components/panels/Sidebar.tsx
import { useState } from "react";
import type { DragEvent } from "react";
import {
  MousePointer2,
  SquareSquare,
  Circle,
  Square,
  Diamond,
  X,
} from "lucide-react";
import type { WorkflowNodeType, NodeData } from "../../../../types/workflow";

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState<"nodes" | "shapes" | null>(null);

  const onDragStart = (
    event: DragEvent,
    nodeType: WorkflowNodeType,
    label: string,
    shapeType?: NodeData["shapeType"],
  ) => {
    event.dataTransfer.setData("application/reactflow/type", nodeType);
    event.dataTransfer.setData("application/reactflow/label", label);
    if (shapeType) {
      event.dataTransfer.setData("application/reactflow/shape", shapeType);
    }
    event.dataTransfer.effectAllowed = "move";
  };

  const toggleMenu = (menu: "nodes" | "shapes") => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <aside className="absolute left-6 top-1/2 -translate-y-1/2 z-50 flex items-start gap-3">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 flex flex-col gap-1">
        <button
          onClick={() => setActiveMenu(null)}
          className={`p-2.5 rounded-lg transition-colors flex items-center justify-center ${
            activeMenu === null
              ? "bg-blue-50 text-blue-600"
              : "text-slate-500 hover:bg-slate-100"
          }`}
          title="Select"
        >
          <MousePointer2 size={20} />
        </button>
        <div className="w-6 h-px bg-slate-200 mx-auto my-1"></div>
        <button
          onClick={() => toggleMenu("shapes")}
          className={`p-2.5 rounded-lg transition-colors flex items-center justify-center relative ${
            activeMenu === "shapes"
              ? "bg-blue-50 text-blue-600"
              : "text-slate-500 hover:bg-slate-100"
          }`}
          title="Basic Shapes"
        >
          <Circle size={20} />
          <div className="absolute right-1 bottom-1 w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
        </button>
        <button
          onClick={() => toggleMenu("nodes")}
          className={`p-2.5 rounded-lg transition-colors flex items-center justify-center relative ${
            activeMenu === "nodes"
              ? "bg-blue-50 text-blue-600"
              : "text-slate-500 hover:bg-slate-100"
          }`}
          title="Logic Nodes"
        >
          <SquareSquare size={20} />
          <div className="absolute right-1 bottom-1 w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
        </button>
      </div>
      {activeMenu === "shapes" && (
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-48 flex flex-col overflow-hidden animate-in fade-in slide-in-from-left-4 duration-200">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <span className="text-sm font-bold text-slate-700">Shapes</span>
            <button
              onClick={() => setActiveMenu(null)}
              className="text-slate-400 hover:text-red-500 p-1 rounded-md"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-3 grid grid-cols-2 gap-2">
            <div
              className="flex flex-col items-center justify-center gap-2 p-3 border border-slate-200 rounded-lg cursor-grab hover:bg-slate-50 hover:border-blue-400 transition-all"
              onDragStart={(e) =>
                onDragStart(e, "shapeNode", "Rectangle", "rectangle")
              }
              draggable
            >
              <Square size={24} className="text-slate-600" />
              <span className="text-[10px] font-medium text-slate-500">
                Square
              </span>
            </div>
            <div
              className="flex flex-col items-center justify-center gap-2 p-3 border border-slate-200 rounded-lg cursor-grab hover:bg-slate-50 hover:border-blue-400 transition-all"
              onDragStart={(e) =>
                onDragStart(e, "shapeNode", "Circle", "circle")
              }
              draggable
            >
              <Circle size={24} className="text-slate-600" />
              <span className="text-[10px] font-medium text-slate-500">
                Circle
              </span>
            </div>
            <div
              className="flex flex-col items-center justify-center gap-2 p-3 border border-slate-200 rounded-lg cursor-grab hover:bg-slate-50 hover:border-blue-400 transition-all col-span-2"
              onDragStart={(e) =>
                onDragStart(e, "shapeNode", "Decision", "diamond")
              }
              draggable
            >
              <Diamond size={24} className="text-slate-600" />
              <span className="text-[10px] font-medium text-slate-500">
                Diamond
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
