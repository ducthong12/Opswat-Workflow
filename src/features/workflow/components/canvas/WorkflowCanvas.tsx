// src/features/workflow/components/canvas/WorkflowCanvas.tsx
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useReactFlow,
  type DefaultEdgeOptions,
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
import { WORKFLOW_CONFIG } from "../../constants/workflow";

const nodeTypes = {
  shapeNode: ShapeNode,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  style: { strokeWidth: WORKFLOW_CONFIG.EDGE.STROKE_WIDTH, stroke: "#94a3b8" },
  type: "default",
  focusable: true,
  selectable: true,
  interactionWidth: 25,
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
        deleteKeyCode={["Backspace", "Delete"]}
        fitView
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          color="#cbd5e1"
        />
        <Controls />
        <MiniMap
          nodeColor={(n) => {
            if (n.selected) return "#3b82f6";

            if (n.type === "shapeNode") {
              const shape = n.data.shapeType;

              if (shape === "heading") return "#ffffff";
              if (shape === "text") return "#ffffff";

              const color = n.data.color as string;
              return !color || color === "#ffffff" ? "#cbd5e1" : color;
            }

            return "#cbd5e1";
          }}
          nodeStrokeWidth={0}
          nodeClassName={(n) => {
            if (n.type === "shapeNode") {
              const shape = n.data.shapeType;

              if (shape === "circle") return "minimap-circle";
              if (shape === "diamond") return "minimap-diamond";
              if (shape === "triangle") return "minimap-triangle";
              if (shape === "database") return "minimap-database";
              if (shape === "document") return "minimap-document";
              if (shape === "person") return "minimap-person";
            }
            return "";
          }}
          maskColor="rgba(241, 245, 249, 0.7)"
          className="border-2 border-slate-200 rounded-lg shadow-md bg-white overflow-hidden"
        />
      </ReactFlow>
    </div>
  );
}
