export default function ShapeTriangle({
  bgColor,
  strokeColor,
}: {
  bgColor: string;
  strokeColor: string;
}) {
  return (
    <svg
      className="absolute inset-0 w-full h-full overflow-visible"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <polygon
        points="5,5 95,50 5,95"
        fill={bgColor}
        stroke={strokeColor}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
