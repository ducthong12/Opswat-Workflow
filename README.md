# OPSWAT Workflow Builder

A professional-grade, high-performance Workflow Builder engineered with **React Flow (XYFlow)**. This application features a highly modular architecture designed for scalability, customizability, and seamless state management.

## 🚀 Key Architectural Features

- **Modular Shape Registry**: Implements a registry pattern (`shapeRegistry.ts`) to decouple node logic from individual SVG renderings, allowing for easy extension of new shapes.
- **Advanced SVG Masking**: Utilizes SVG `<pattern>` and `clip-path` to dynamically embed images into complex shapes like Diamonds, Circles, and Cubes while maintaining perfect aspect ratios.
- **Atomic Shape Components**: Each visual element (Circle, Cube, Database, etc.) is an independent, reusable React component located in the `@shape` directory.
- **Contextual Properties System**: A robust `PropertiesPanel` that dynamically adjusts based on node types, supporting real-time label editing and image content management.
- **Predictable State**: Managed via **Zustand** with shallow reactivity to ensure high performance even with hundreds of nodes on the canvas.

## 📂 Project Structure

Following the feature-based modular design as shown in the source tree:

```text
src/
├── components/Layout/       # Global UI components (Header, etc.)
├── features/workflow/       # Main Workflow Feature
│   ├── components/
│   │   ├── canvas/          # WorkflowCanvas.tsx (Main Stage)
│   │   ├── config/          # shapeRegistry.ts (Registry Pattern)
│   │   ├── nodes/           # ShapeNode.tsx (Base Node Wrapper)
│   │   ├── panels/          # Sidebar, PropertiesPanel, EdgeProperties
│   │   └── shape/           # Atomic SVG Components (Rectangle, Circle, etc.)
│   ├── constants/           # workflow.ts (Global Config & Colors)
│   ├── stores/              # useWorkflowStore.ts (Zustand)
│   └── types/               # workflow.ts (TS Interfaces)
├── App.tsx                  # Root Component
├── Dockerfile               # Deployment Configuration
└── .dockerignore            # Build Optimization
```
