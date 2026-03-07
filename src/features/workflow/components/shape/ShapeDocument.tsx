export default function ShapeDocument({
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
      <g>
        <path
          d="M10,2 L75,2 L95,22 L95,98 L10,98 Z"
          fill={color}
          stroke={stroke}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
        />
        <path
          d="M75,2 L75,22 L95,22"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
}
