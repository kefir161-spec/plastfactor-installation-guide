interface TileVisualProps {
  src: string;
  alt: string;
}

export function TileVisual({ src, alt }: TileVisualProps) {
  return (
    <figure className="tile-visual">
      <div className="tile-visual__frame">
        <img src={src} alt={alt} className="tile-visual__photo" />
        <svg
          className="tile-visual__diagram"
          viewBox="0 0 320 340"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <marker
              id="tile-dim-arrow"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#4a4a4a" />
            </marker>
          </defs>

          <rect x="40" y="40" width="240" height="240" fill="transparent" />

          <line
            x1="40"
            y1="20"
            x2="280"
            y2="20"
            stroke="#4a4a4a"
            strokeWidth="1"
            markerStart="url(#tile-dim-arrow)"
            markerEnd="url(#tile-dim-arrow)"
          />
          <text x="160" y="14" textAnchor="middle" fontSize="11" fill="#4a4a4a">
            500 мм
          </text>

          <line
            x1="20"
            y1="40"
            x2="20"
            y2="280"
            stroke="#4a4a4a"
            strokeWidth="1"
            markerStart="url(#tile-dim-arrow)"
            markerEnd="url(#tile-dim-arrow)"
          />
          <text x="12" y="165" textAnchor="middle" fontSize="11" fill="#4a4a4a" transform="rotate(-90 12 165)">
            500 мм
          </text>

          <text x="160" y="320" textAnchor="middle" fontSize="12" fill="#4a4a4a">
            Пазловое соединение «ласточкин хвост»
          </text>
        </svg>
      </div>
    </figure>
  );
}
