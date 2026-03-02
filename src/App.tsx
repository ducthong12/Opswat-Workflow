// src/App.tsx
import { ReactFlowProvider } from "@xyflow/react";
import WorkflowCanvas from "./features/workflow/components/canvas/WorkflowCanvas";
import Sidebar from "./features/workflow/components/panels/Sidebar";
import PropertiesPanel from "./features/workflow/components/panels/PropertiesPanel";
import Header from "./components/Layout/Header";

function App() {
  return (
    <ReactFlowProvider>
      <div className="w-screen h-screen flex flex-col bg-slate-100 overflow-hidden font-sans">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <WorkflowCanvas />
          <PropertiesPanel />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
