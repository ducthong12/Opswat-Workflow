// src/components/Layout/Header.tsx
import { Save, Trash2, Play } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useWorkflowStore } from "../../features/workflow/stores/useWorkflowStore";

export default function Header() {
  const { nodes, edges, clearWorkflow } = useWorkflowStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      clearWorkflow: state.clearWorkflow,
    })),
  );

  const handleSave = () => {
    const payload = {
      nodes,
      edges,
    };

    console.log("--- WORKFLOW PAYLOAD ---");
    console.log(JSON.stringify(payload, null, 2));

    alert(
      "Workflow saved successfully! Check your browser console to see the JSON payload ready for your backend API.",
    );
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">
          O
        </div>
        <h1 className="text-slate-800 font-bold text-lg tracking-tight">
          OPSWAT{" "}
          <span className="text-slate-400 font-normal">Workflow Builder</span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={clearWorkflow}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 size={16} />
          Clear
        </button>

        <div className="w-px h-5 bg-slate-200 mx-1"></div>

        <button
          className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
          onClick={() => alert("Validation feature coming soon!")}
        >
          <Play size={16} />
          Validate
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
        >
          <Save size={16} />
          Save Workflow
        </button>
      </div>
    </header>
  );
}
