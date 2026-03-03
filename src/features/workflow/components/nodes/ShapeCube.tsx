export default function ShapeCube({
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
      <g>
        <path
          d="M0,30 L30,0 L100,0 L100,70 L70,100 L0,100 Z"
          fill={color}
          stroke={stroke}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          className="transition-colors duration-200"
        />
        <path
          d="M0,30 L70,30 L70,100 M70,30 L100,0"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
}
