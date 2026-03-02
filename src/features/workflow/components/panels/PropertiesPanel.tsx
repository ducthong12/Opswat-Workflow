// src/features/workflow/components/panels/PropertiesPanel.tsx
import { useShallow } from "zustand/react/shallow";
import { Settings2, Palette } from "lucide-react";
import type { ChangeEvent } from "react";
import { useWorkflowStore } from "../../stores/useWorkflowStore";

const PRESET_COLORS = [
  "#ffffff", // Trắng
  "#fecaca", // Đỏ nhạt
  "#fef08a", // Vàng nhạt
  "#bbf7d0", // Xanh lá nhạt
  "#bfdbfe", // Xanh dương nhạt
  "#e9d5ff", // Tím nhạt
];

export default function PropertiesPanel() {
  const { nodes, updateNodeData } = useWorkflowStore(
    useShallow((state) => ({
      nodes: state.nodes,
      updateNodeData: state.updateNodeData,
    })),
  );

  // Tìm node đang được chọn
  const selectedNode = nodes.find((node) => node.selected);

  // Giao diện khi chưa chọn Node nào
  if (!selectedNode) {
    return (
      <aside className="w-80 border-l border-slate-200 bg-slate-50 flex flex-col shadow-sm z-10 hidden md:flex">
        <div className="p-4 border-b border-slate-200 flex items-center gap-2 text-slate-500 bg-white">
          <Settings2 size={18} />
          <h2 className="text-sm font-semibold">Properties</h2>
        </div>
        <div className="p-8 text-center text-slate-400 text-sm flex flex-col items-center gap-3">
          <div className="w-16 h-16 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center">
            <Settings2 size={24} className="text-slate-300" />
          </div>
          Select a node on the canvas to edit its properties.
        </div>
      </aside>
    );
  }

  // Các hàm xử lý sự kiện
  const handleLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateNodeData(selectedNode.id, { label: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(selectedNode.id, { description: e.target.value });
  };

  const handleColorChange = (color: string) => {
    updateNodeData(selectedNode.id, { color });
  };

  return (
    <aside className="w-80 border-l border-slate-200 bg-white flex flex-col shadow-sm z-10 transition-all overflow-y-auto">
      {/* Header của Panel */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2 text-slate-800">
          <Settings2 size={18} />
          <h2 className="text-sm font-bold">Node Settings</h2>
        </div>
        <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200">
          ID: {selectedNode.id.split("-")[1] || selectedNode.id}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-5">
        {/* CHỈ HIỂN THỊ BẢNG CHỌN MÀU NẾU LÀ SHAPE NODE */}
        {selectedNode.type === "shapeNode" && (
          <div className="flex flex-col gap-2 p-3 bg-slate-50 border border-slate-100 rounded-lg">
            <div className="flex items-center gap-2 text-slate-600 mb-1">
              <Palette size={14} />
              <label className="text-xs font-bold uppercase tracking-wider">
                Fill Color
              </label>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {PRESET_COLORS.map((color) => {
                const isActive =
                  selectedNode.data.color === color ||
                  (!selectedNode.data.color && color === "#ffffff");
                return (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      isActive
                        ? "border-blue-500 scale-110 shadow-md"
                        : "border-slate-300 hover:scale-110 hover:shadow-sm"
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Input: Node Label */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Node Label
          </label>
          <input
            type="text"
            value={selectedNode.data.label}
            onChange={handleLabelChange}
            className="w-full px-3 py-2 text-sm text-slate-800 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            placeholder="Enter node label..."
          />
        </div>

        {/* Input: Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Description
          </label>
          <textarea
            value={selectedNode.data.description || ""}
            onChange={handleDescriptionChange}
            rows={3}
            className="w-full px-3 py-2 text-sm text-slate-800 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none shadow-sm"
            placeholder="Enter node description..."
          />
        </div>

        {/* Hiển thị Trạng thái (Chỉ hợp lý cho các Node xử lý Logic) */}
        {selectedNode.type !== "shapeNode" && (
          <div className="flex flex-col gap-1.5 mt-2 pt-4 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Status
            </label>
            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  selectedNode.data.status === "success"
                    ? "bg-green-500"
                    : selectedNode.data.status === "error"
                      ? "bg-red-500"
                      : "bg-slate-300"
                }`}
              ></div>
              <span className="text-sm font-medium text-slate-700 capitalize">
                {selectedNode.data.status || "idle"}
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
