// src/features/workflow/stores/useWorkflowStore.ts
import { create } from "zustand";
import type { AppNode, NodeData, WorkflowState } from "../../../types/workflow";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
  type Connection,
  type Edge,
  type EdgeChange,
  type NodeChange,
} from "@xyflow/react";
import { WORKFLOW_CONFIG } from "../constants/workflow";

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as AppNode[],
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          animated: false,
          type: "default",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: WORKFLOW_CONFIG.EDGE.ARROW_SIZE,
            height: WORKFLOW_CONFIG.EDGE.ARROW_SIZE,
            color: "#94a3b8",
          },
          style: {
            stroke: "#94a3b8",
            strokeWidth: WORKFLOW_CONFIG.EDGE.STROKE_WIDTH,
          },
        },
        get().edges,
      ),
    });
  },

  updateEdge: (edgeId: string, updates: Partial<Edge>) => {
    set({
      edges: get().edges.map((edge) => {
        if (edge.id === edgeId) {
          const newStyle = updates.style
            ? { ...edge.style, ...updates.style }
            : edge.style;
          let newMarkerStart =
            "markerStart" in updates ? updates.markerStart : edge.markerStart;
          let newMarkerEnd =
            "markerEnd" in updates ? updates.markerEnd : edge.markerEnd;

          if (updates.style?.stroke) {
            if (newMarkerStart && typeof newMarkerStart === "object") {
              newMarkerStart = {
                ...newMarkerStart,
                color: updates.style.stroke,
              };
            }
            if (newMarkerEnd && typeof newMarkerEnd === "object") {
              newMarkerEnd = { ...newMarkerEnd, color: updates.style.stroke };
            }
          }
          return {
            ...edge,
            ...updates,
            style: newStyle,
            markerStart: newMarkerStart,
            markerEnd: newMarkerEnd,
          };
        }
        return edge;
      }),
    });
  },

  addNode: (node: AppNode) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  updateNodeData: (nodeId: string, data: Partial<NodeData>) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      }),
    });
  },

  clearWorkflow: () => {
    set({ nodes: [], edges: [] });
  },

  setWorkflow: (nodes: AppNode[], edges: Edge[]) => set({ nodes, edges }),
}));
