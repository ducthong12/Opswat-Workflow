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

const getMiniMapNodeColor = (n: any) => {
  if (n.selected) return "#3b82f6";
  if (n.type !== "shapeNode") return "#cbd5e1";

  const { shapeType, color } = n.data;

  if (shapeType === "heading" || shapeType === "text") return "#475569";

  return !color || color === "#ffffff" ? "#cbd5e1" : color;
};

const getMiniMapNodeClass = (n: any) => {
  if (n.type === "shapeNode" && n.data.shapeType) {
    return `minimap-shape-${n.data.shapeType}`;
  }
  return "";
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

      const type = event.dataTransfer.getData(
        "application/reactflow/type",
      ) as WorkflowNodeType;
      if (!type) return;

      const label = event.dataTransfer.getData("application/reactflow/label");
      const shapeType = event.dataTransfer.getData(
        "application/reactflow/shape",
      ) as NodeData["shapeType"];
      const allowImage =
        event.dataTransfer.getData("application/reactflow/allowImage") ===
        "true";

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: AppNode = {
        id: `node-${Date.now()}`,
        type,
        position,
        style: {
          width: WORKFLOW_CONFIG.NODE.DEFAULT_WIDTH,
          height: WORKFLOW_CONFIG.NODE.DEFAULT_HEIGHT,
        },
        data: {
          label,
          shapeType,
          allowImage,
          color: "#ffffff",
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
        defaultEdgeOptions={defaultEdgeOptions}
        deleteKeyCode={["Backspace", "Delete"]}
        fitView
        onlyRenderVisibleElements={true}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          color="#cbd5e1"
        />
        <Controls showInteractive={false} />

        <MiniMap
          nodeColor={getMiniMapNodeColor}
          nodeClassName={getMiniMapNodeClass}
          nodeStrokeWidth={0}
          maskColor="rgba(241, 245, 249, 0.7)"
          className="border-2 border-slate-200 rounded-lg shadow-md bg-white overflow-hidden"
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
}
