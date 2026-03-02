export default function ShapeCube({
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
      <path
        d="M5,30 L35,5 L95,5 L95,70 L65,95 L5,95 Z"
        fill={bgColor}
        stroke={strokeColor}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M5,30 L65,30 L65,95 M65,30 L95,5"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
