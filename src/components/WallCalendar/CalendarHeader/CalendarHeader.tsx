'use client';

interface CalendarHeaderProps {
  accentColor: string;
}

export function CalendarHeader({ accentColor }: CalendarHeaderProps): React.JSX.Element {
  const wireCount = 15;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className="relative w-full flex items-center justify-center py-2"
      style={{ background: '#e8e8e8' }}
    >
      {/* Shadow bar at top to mimic hanging */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-black/10 to-transparent" />

      <svg
        width="100%"
        height="28"
        viewBox="0 0 500 28"
        preserveAspectRatio="xMidYMid meet"
        className="max-w-full"
      >
        <defs>
          <linearGradient id="wireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c0c0c0" />
            <stop offset="30%" stopColor="#e8e8e8" />
            <stop offset="50%" stopColor="#f5f5f5" />
            <stop offset="70%" stopColor="#d4d4d4" />
            <stop offset="100%" stopColor="#a0a0a0" />
          </linearGradient>
          <linearGradient id="wireStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#999" />
            <stop offset="100%" stopColor="#666" />
          </linearGradient>
        </defs>

        {Array.from({ length: wireCount }, (_, i) => {
          const spacing = 500 / (wireCount + 1);
          const cx = spacing * (i + 1);
          return (
            <g key={i}>
              {/* Wire loop - the spiral coil */}
              <ellipse
                cx={cx}
                cy={14}
                rx={6}
                ry={12}
                fill="none"
                stroke="url(#wireStroke)"
                strokeWidth={1.5}
              />
              {/* Shine highlight */}
              <ellipse
                cx={cx - 1.5}
                cy={10}
                rx={2}
                ry={5}
                fill="rgba(255,255,255,0.4)"
              />
            </g>
          );
        })}

        {/* Horizontal wire bar */}
        <line x1="0" y1="14" x2="500" y2="14" stroke="url(#wireStroke)" strokeWidth={1.2} />
      </svg>

      {/* Bottom shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-black/8 to-transparent" />
    </div>
  );
}
