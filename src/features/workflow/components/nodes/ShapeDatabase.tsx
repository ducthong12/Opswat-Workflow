export default function ShapeDatabase({
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
        d="M5,15 C5,5 95,5 95,15 L95,85 C95,95 5,95 5,85 Z"
        fill={bgColor}
        stroke={strokeColor}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M5,15 C5,25 95,25 95,15"
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
