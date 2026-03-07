export default function ShapeTriangle({
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
      <polygon
        points="0,0 100,50 0,100"
        fill={imageUrl ? `url(#img-pattern-${id})` : color}
        stroke={stroke}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        className="transition-colors duration-200"
      />
    </svg>
  );
}
