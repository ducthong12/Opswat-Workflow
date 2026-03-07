import { useState } from "react";
import type { DragEvent } from "react";
import {
  MousePointer2,
  Circle,
  Square,
  Diamond,
  X,
  Triangle,
  Database,
  Box,
  Type,
  Heading1,
  User,
  FileText,
} from "lucide-react";
import type { WorkflowNodeType, NodeData } from "../../../../types/workflow";

const SHAPE_LIST = [
  {
    id: "rectangle",
    label: "",
    btnLabel: "Rectangle",
    shape: "rectangle",
    icon: Square,
    allowImage: true,
  },
  {
    id: "circle",
    label: "",
    btnLabel: "Circle",
    shape: "circle",
    icon: Circle,
    allowImage: true,
  },
  {
    id: "diamond",
    label: "",
    btnLabel: "Decision",
    shape: "diamond",
    icon: Diamond,
    allowImage: true,
  },
  {
    id: "triangle",
    label: "",
    btnLabel: "Step",
    shape: "triangle",
    icon: Triangle,
    className: "rotate-90",
    allowImage: true,
  },
  {
    id: "database",
    label: "",
    btnLabel: "Storage",
    shape: "database",
    icon: Database,
    allowImage: true,
  },
  {
    id: "cube",
    label: "",
    btnLabel: "Module",
    shape: "cube",
    icon: Box,
    allowImage: true,
  },
  { id: "text", label: "Text", btnLabel: "Text", shape: "text", icon: Type },
  {
    id: "heading",
    label: "Heading",
    btnLabel: "Heading",
    shape: "heading",
    icon: Heading1,
  },
  {
    id: "person",
    label: "",
    btnLabel: "Person",
    shape: "person",
    icon: User,
    allowImage: false,
  },
  {
    id: "document",
    label: "",
    btnLabel: "Document",
    shape: "document",
    icon: FileText,
  },
];

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
          <div className="p-3 grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto custom-scrollbar">
            {SHAPE_LIST.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex flex-col items-center justify-center gap-2 p-3 border border-slate-200 rounded-lg cursor-grab hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm transition-all group"
                  onDragStart={(e) =>
                    onDragStart(
                      e,
                      "shapeNode",
                      item.label,
                      item.shape as NodeData["shapeType"],
                    )
                  }
                  draggable
                >
                  <Icon
                    size={22}
                    className={`text-slate-500 group-hover:text-blue-600 transition-colors ${item.className || ""}`}
                  />
                  <span className="text-[10px] font-semibold text-slate-500 group-hover:text-blue-700">
                    {item.btnLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
