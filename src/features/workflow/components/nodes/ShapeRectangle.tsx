export default function ShapeRectangle({
  id,
  color,
  stroke,
}: {
  id: string;
  color: string;
  stroke: string;
}) {
  return (
    <svg
      className="absolute inset-0 w-full h-full overflow-visible drop-shadow-sm"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx="8"
        fill={color}
        stroke={stroke}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
