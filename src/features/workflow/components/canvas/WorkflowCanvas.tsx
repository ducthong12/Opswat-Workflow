// src/features/workflow/components/canvas/WorkflowCanvas.tsx
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { DragEvent } from "react";
import { useCallback, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import type {
  AppNode,
  NodeData,
  WorkflowNodeType,
} from "../../../../types/workflow";
import { useWorkflowStore } from "../../stores/useWorkflowStore";
import ShapeNode from "../nodes/ShapeNode";

const nodeTypes = {
  shapeNode: ShapeNode,
};

export default function WorkflowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    useWorkflowStore(
      useShallow((state) => ({
        nodes: state.nodes,
        edges: state.edges,
        onNodesChange: state.onNodesChange,
        onEdgesChange: state.onEdgesChange,
        onConnect: state.onConnect,
        addNode: state.addNode,
      })),
    );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      // Get node type and label from the drag event
      const type = event.dataTransfer.getData(
        "application/reactflow/type",
      ) as WorkflowNodeType;
      const label = event.dataTransfer.getData("application/reactflow/label");
      const shapeType =
        (event.dataTransfer.getData(
          "application/reactflow/shape",
        ) as NodeData["shapeType"]) || undefined;

      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Add new node to the store
      const newNode: AppNode = {
        id: `node-${Date.now()}`,
        type,
        position,
        data: {
          label,
          description: "Configure details in the right panel",
          status: "idle",
          shapeType,
        },
      };
      addNode(newNode);
    },
    [screenToFlowPosition, addNode],
  );

  return (
    <div
      className="flex-1 h-full w-full bg-slate-50 relative"
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          color="#cbd5e1"
        />
        <Controls />
        <MiniMap
          nodeStrokeColor={(n) =>
            n.type === "taskNode" ? "#3b82f6" : "#cbd5e1"
          }
          nodeColor={() => "#eff6ff"}
        />
      </ReactFlow>
    </div>
  );
}
