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
  shapeType:
    | "rectangle"
    | "circle"
    | "diamond"
    | "triangle"
    | "database"
    | "cube"
    | "text"
    | "heading"
    | "person";
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
  updateEdge: (edgeId: string, updates: Partial<Edge>) => void;
  setWorkflow: (nodes: AppNode[], edges: Edge[]) => void;
}
