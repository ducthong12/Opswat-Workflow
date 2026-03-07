export const WORKFLOW_CONFIG = {
  NODE: {
    MIN_WIDTH: 30,
    MIN_HEIGHT: 30,
    RESIZE_DOT_SIZE: 8,
    RESIZE_BORDER_SIZE: 2,
    RESIZE_BORDER_RADIUS: 2,
    DEFAULT_WIDTH: 60,
    DEFAULT_HEIGHT: 60,
    COLORS: {
      PRESETS: [
        { value: "#ffffff", label: "White" },
        { value: "#fecaca", label: "Red" },
        { value: "#fef08a", label: "Yellow" },
        { value: "#bbf7d0", label: "Green" },
        { value: "#bfdbfe", label: "Blue" },
        { value: "#e9d5ff", label: "Purple" },
      ],
      DEFAULT: "#ffffff",
    },
  },
  EDGE: {
    STROKE_WIDTH: 1.5,
    STROKE_COLOR: "#94a3b8",
    STROKE_COLOR_SELECTED: "#3b82f6",
    INTERACTION_WIDTH: 25,
    ARROW_SIZE: 12,
    COLORS: {
      PRESETS: [
        { value: "#94a3b8", label: "Slate" },
        { value: "#ef4444", label: "Red" },
        { value: "#eab308", label: "Yellow" },
        { value: "#22c55e", label: "Green" },
        { value: "#3b82f6", label: "Blue" },
        { value: "#a855f7", label: "Purple" },
      ],
      DEFAULT: "#94a3b8",
    },
  },
  HANDLE: {
    SIZE: 8,
    OFFSET: -4,
  },
};
