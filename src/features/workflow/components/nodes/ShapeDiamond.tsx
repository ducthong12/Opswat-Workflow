export default function ShapeDiamond({
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
        points="50,0 100,50 50,100 0,50"
        fill={bgColor}
        stroke={strokeColor}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        className="transition-colors duration-200"
      />
    </svg>
  );
}
