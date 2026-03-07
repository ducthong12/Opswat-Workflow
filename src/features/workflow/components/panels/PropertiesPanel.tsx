import { useShallow } from "zustand/react/shallow";
import { Settings2, Palette, ImageIcon, X, Upload } from "lucide-react";
import type { ChangeEvent } from "react";
import { useWorkflowStore } from "../../stores/useWorkflowStore";
import EdgeProperties from "./EdgeProperties";
import { WORKFLOW_CONFIG } from "../../constants/workflow";

export default function PropertiesPanel() {
  const { nodes, edges, updateNodeData, updateEdge } = useWorkflowStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      updateNodeData: state.updateNodeData,
      updateEdge: state.updateEdge,
    })),
  );

  const selectedNode = nodes.find((node) => node.selected);
  const selectedEdge = edges.find((edge) => edge.selected);

  if (!selectedNode && !selectedEdge) {
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
          Select a node or connection on the canvas to edit.
        </div>
      </aside>
    );
  }

  if (selectedEdge) {
    return (
      <EdgeProperties selectedEdge={selectedEdge} updateEdge={updateEdge} />
    );
  }

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

  const handleLabelChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(selectedNode.id, { label: e.target.value });
  };

  const handleColorChange = (color: string) => {
    updateNodeData(selectedNode.id, { color });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File too large! Please select an image under 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        updateNodeData(selectedNode!.id, { imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="w-80 border-l border-slate-200 bg-white flex flex-col shadow-sm z-10 transition-all overflow-y-auto">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2 text-slate-800">
          <Settings2 size={18} />
          <h2 className="text-sm font-bold">Node Settings</h2>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Node Label
          </label>
          <textarea
            value={selectedNode.data.label || ""}
            onChange={handleLabelChange}
            rows={3}
            className="w-full px-3 py-2 text-sm text-slate-800 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none shadow-sm"
            placeholder="Enter node label..."
          />
        </div>
        {selectedNode.data.allowImage && (
          <div className="flex flex-col gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 text-slate-600 mb-1">
              <ImageIcon size={14} />
              <label className="text-xs font-bold uppercase tracking-wider">
                Image Content
              </label>
            </div>
            {selectedNode.data.imageUrl ? (
              <div className="relative w-full h-32 rounded-md overflow-hidden border border-slate-200 bg-white group shadow-sm">
                <img
                  src={selectedNode.data.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() =>
                    updateNodeData(selectedNode!.id, { imageUrl: undefined })
                  }
                  className="absolute top-1.5 right-1.5 p-1 bg-white/80 text-slate-600 rounded-full 
                     hover:bg-red-500 hover:text-white transition-all 
                     opacity-0 group-hover:opacity-100 shadow-sm backdrop-blur-sm z-10"
                  title="Remove image"
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all group">
                <Upload
                  size={20}
                  className="text-slate-400 group-hover:text-blue-500 mb-1"
                />
                <span className="text-[10px] text-slate-500 group-hover:text-blue-600 font-medium">
                  Click to upload
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        )}
        <div className="flex flex-col gap-2 p-3 bg-slate-50 border border-slate-100 rounded-lg">
          <div className="flex items-center gap-2 text-slate-600 mb-1">
            <Palette size={14} />
            <label className="text-xs font-bold uppercase tracking-wider">
              Fill Color
            </label>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {WORKFLOW_CONFIG.NODE.COLORS.PRESETS.map((color) => {
              const isActive =
                selectedNode.data.color === color.value ||
                (!selectedNode.data.color &&
                  color.value === WORKFLOW_CONFIG.NODE.COLORS.DEFAULT);
              return (
                <button
                  key={color.value}
                  onClick={() => handleColorChange(color.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    isActive
                      ? "border-blue-500 scale-110 shadow-md"
                      : "border-slate-300 hover:scale-110 hover:shadow-sm"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.label}
                />
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
