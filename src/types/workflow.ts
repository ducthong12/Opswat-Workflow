import {
  type Node,
  type Edge,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
} from "@xyflow/react";

export type WorkflowNodeType = "shapeNode";

export interface NodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  status?: "idle" | "running" | "success" | "error";
  shapeType?:
    | "rectangle"
    | "circle"
    | "diamond"
    | "triangle"
    | "database"
    | "cube";
  color?: string;
}

export type AppNode = Node<NodeData, WorkflowNodeType>;

export interface WorkflowState {
  nodes: AppNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: AppNode) => void;
  updateNodeData: (nodeId: string, data: Partial<NodeData>) => void;
  clearWorkflow: () => void;
}
