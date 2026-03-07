import { Save, Trash2, Upload, Menu } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useWorkflowStore } from "../../features/workflow/stores/useWorkflowStore";
import { useRef } from "react";

export default function Header() {
  const { nodes, edges, clearWorkflow, setWorkflow } = useWorkflowStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      clearWorkflow: state.clearWorkflow,
      setWorkflow: state.setWorkflow,
    })),
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = { nodes, edges, exportedAt: new Date().toISOString() };
    const jsonString = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `workflow-${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);

        if (parsedData.nodes && parsedData.edges) {
          setWorkflow(parsedData.nodes, parsedData.edges);
        } else {
          alert("The JSON file is not in the correct workflow format.");
        }
      } catch (error) {
        alert("An error occurred while reading the JSON file.");
      }
    };
    reader.readAsText(file);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-3 md:px-6 shadow-sm z-20 sticky top-0">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          O
        </div>
        <h1 className="text-slate-800 font-bold text-sm md:text-lg tracking-tight leading-none">
          OPSWAT{" "}
          <span className="hidden sm:inline text-slate-400 font-normal">
            Workflow Builder
          </span>
        </h1>
      </div>
      <div className="flex items-center gap-1.5 md:gap-3">
        <button
          onClick={clearWorkflow}
          className="flex items-center gap-2 px-2 md:px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          title="Clear Workflow"
        >
          <Trash2 size={18} />
          <span className="hidden lg:inline">Clear</span>
        </button>

        <div className="w-px h-5 bg-slate-200 mx-0.5 md:mx-1"></div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          accept=".json"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-2.5 md:px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
          title="Import JSON"
        >
          <Upload size={18} />
          <span className="hidden md:inline">Import JSON</span>
        </button>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-2.5 md:px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
          title="Export Workflow"
        >
          <Save size={18} />
          <span className="hidden sm:inline">Export</span>
          <span className="hidden lg:inline">Workflow</span>
        </button>
      </div>
    </header>
  );
}
