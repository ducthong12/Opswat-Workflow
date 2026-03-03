export default function ShapeDatabase({
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
      <g className="transition-colors duration-200">
        <ellipse
          cx="50"
          cy="85"
          rx="50"
          ry="15"
          fill={color}
          stroke={stroke}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <rect x="0" y="15" width="100" height="70" fill={color} stroke="none" />
        <line x1="0" y1="15" x2="0" y2="85" stroke={stroke} strokeWidth="2" />
        <line
          x1="0"
          y1="15"
          x2="0"
          y2="85"
          stroke={stroke}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="100"
          y1="15"
          x2="100"
          y2="85"
          stroke={stroke}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <ellipse
          cx="50"
          cy="15"
          rx="50"
          ry="15"
          fill={color}
          stroke={stroke}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
}
