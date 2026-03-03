export default function ShapeDiamond({
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
      <polygon
        points="50,0 100,50 50,100 0,50"
        fill={color}
        stroke={stroke}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        className="transition-colors duration-200"
      />
    </svg>
  );
}
