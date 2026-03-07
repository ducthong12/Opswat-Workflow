import type { CSSProperties, ReactNode } from "react";
import {
  ShapeCircle,
  ShapeCube,
  ShapeDatabase,
  ShapeDiamond,
  ShapeDocument,
  ShapeHeading,
  ShapePerson,
  ShapeRectangle,
  ShapeText,
  ShapeTriangle,
} from "../shape";

export interface ShapeRenderProps {
  id: string;
  color: string;
  stroke: string;
  label: string;
  imageUrl?: string;
}

export interface ShapeDefinition {
  render: (props: ShapeRenderProps) => ReactNode;
  handleOffsets?: {
    top?: CSSProperties;
    right?: CSSProperties;
    bottom?: CSSProperties;
    left?: CSSProperties;
  };
}

export const SHAPE_DEFINITIONS: Record<string, ShapeDefinition> = {
  rectangle: {
    render: ({ id, color, stroke, imageUrl }) => (
      <ShapeRectangle
        id={id}
        color={color}
        stroke={stroke}
        imageUrl={imageUrl}
      />
    ),
  },
  circle: {
    render: ({ id, color, stroke, imageUrl }) => (
      <ShapeCircle id={id} color={color} stroke={stroke} imageUrl={imageUrl} />
    ),
  },
  diamond: {
    render: ({ id, color, stroke, imageUrl }) => (
      <ShapeDiamond id={id} color={color} stroke={stroke} imageUrl={imageUrl} />
    ),
  },
  triangle: {
    render: ({ id, color, stroke, imageUrl }) => (
      <ShapeTriangle
        id={id}
        color={color}
        stroke={stroke}
        imageUrl={imageUrl}
      />
    ),
    handleOffsets: {
      top: { top: "25%" },
      bottom: { top: "auto", bottom: "25%" },
    },
  },
  database: {
    render: ({ id, color, stroke, imageUrl }) => (
      <ShapeDatabase
        id={id}
        color={color}
        stroke={stroke}
        imageUrl={imageUrl}
      />
    ),
  },
  cube: {
    render: ({ id, color, stroke, imageUrl }) => (
      <ShapeCube id={id} color={color} stroke={stroke} imageUrl={imageUrl} />
    ),
  },
  text: {
    render: ({ id, label }) => <ShapeText id={id} label={label} />,
  },
  heading: {
    render: ({ id, label }) => <ShapeHeading id={id} label={label} />,
  },
  person: {
    render: ({ color, stroke }) => (
      <ShapePerson color={color} stroke={stroke} />
    ),
  },
  document: {
    render: ({ id, color, stroke }) => (
      <ShapeDocument id={id} color={color} stroke={stroke} />
    ),
  },
};
