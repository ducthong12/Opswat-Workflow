export default function ShapeCircle({
  id,
  color,
  stroke,
  imageUrl,
}: {
  id: string;
  color: string;
  stroke: string;
  imageUrl?: string;
}) {
  return (
    <svg
      className="absolute inset-0 w-full h-full overflow-visible drop-shadow-sm"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {imageUrl && (
        <defs>
          <pattern
            id={`img-pattern-${id}`}
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <image
              href={imageUrl}
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>
      )}
      <circle
        cx="50"
        cy="50"
        r="46"
        fill={imageUrl ? `url(#img-pattern-${id})` : color}
        stroke={stroke}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
