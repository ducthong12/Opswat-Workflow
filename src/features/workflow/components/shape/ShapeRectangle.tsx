export default function ShapeRectangle({
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
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx="8"
        fill={imageUrl ? `url(#img-pattern-${id})` : color}
        stroke={stroke}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
