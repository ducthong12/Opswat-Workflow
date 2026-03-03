export default function ShapePerson({
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
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full overflow-visible"
    >
      <circle
        cx="50"
        cy="30"
        r="20"
        fill={color}
        stroke={stroke}
        strokeWidth="2"
      />
      <path
        d="M20,90 Q50,50 80,90 Z"
        fill={color}
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
}
