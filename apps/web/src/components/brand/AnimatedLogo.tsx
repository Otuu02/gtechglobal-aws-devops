'use client';

/**
 * GTECHGLOBAL cinematic logo intro.
 * Fully SVG — G + wordmark + tagline assemble in sequence on page load.
 */
export function AnimatedLogo({ size = 420 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-label="GTECHGLOBAL — Innovation · Solutions · Growth"
      role="img"
    >
      {/* ─── Ambient breathing glow ─── */}
      <div
        className="logo-glow pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(30,111,235,0.5) 0%, rgba(34,211,238,0.2) 40%, transparent 72%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ─── Rotating outer ring ─── */}
      <svg
        viewBox="0 0 500 500"
        className="logo-ring-spin pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ring-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="45%"  stopColor="#22D3EE" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1E6FEB" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle
          cx="250" cy="250" r="220"
          fill="none" stroke="url(#ring-1)" strokeWidth="1.25"
          strokeDasharray="100 700" strokeLinecap="round"
        />
      </svg>

      {/* ─── Rotating inner ring (opposite) ─── */}
      <svg
        viewBox="0 0 500 500"
        className="logo-ring-spin-reverse pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ring-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#4E97FF" stopOpacity="0" />
            <stop offset="50%"  stopColor="#4E97FF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle
          cx="250" cy="250" r="195"
          fill="none" stroke="url(#ring-2)" strokeWidth="0.75"
          strokeDasharray="50 600" strokeLinecap="round"
        />
      </svg>

      {/* ─── Main SVG: G + wordmark + tagline ─── */}
      <svg
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-full w-full"
      >
        <defs>
          <linearGradient id="g-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#22D3EE" />
            <stop offset="45%"  stopColor="#1E6FEB" />
            <stop offset="100%" stopColor="#0F429B" />
          </linearGradient>

          <linearGradient id="g-word" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#1E6FEB" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>

          {/* Clip used for the shimmer sweep across the G */}
          <clipPath id="g-shape-clip">
            <path d="M 305 165
                     C 305 130, 270 108, 228 108
                     C 178 108, 145 155, 145 250
                     C 145 345, 178 390, 228 390
                     C 270 390, 305 366, 305 330
                     L 305 250 L 228 250" />
          </clipPath>
        </defs>

        {/* ═══════════ GROUP 1 — The "G" mark ═══════════ */}
        <g className="anim-g">
          {/* The G letterform */}
          <path
            d="M 305 165
               C 305 130, 270 108, 228 108
               C 178 108, 145 155, 145 250
               C 145 345, 178 390, 228 390
               C 270 390, 305 366, 305 330
               L 305 250 L 228 250"
            fill="none"
            stroke="url(#g-fill)"
            strokeWidth="42"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Shimmer sweep clipped to G */}
          <g clipPath="url(#g-shape-clip)">
            <rect className="anim-shimmer" x="-150" y="0" width="60" height="500" fill="#fff" opacity="0.8" />
          </g>

          {/* The swoosh under the G */}
          <path
            className="anim-swoosh"
            d="M 130 320 Q 165 400, 265 385 Q 340 372, 375 305"
            fill="none"
            stroke="url(#g-fill)"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </g>

        {/* ═══════════ GROUP 2 — Accent squares ═══════════ */}
        <g>
          <rect className="anim-square anim-square-1" x="350" y="140" width="22" height="22" rx="3" fill="#22D3EE" />
          <rect className="anim-square anim-square-2" x="385" y="140" width="16" height="16" rx="3" fill="#1E6FEB" />
          <rect className="anim-square anim-square-3" x="350" y="175" width="16" height="16" rx="3" fill="#1E6FEB" />
          <rect className="anim-square anim-square-4" x="385" y="175" width="12" height="12" rx="3" fill="#4E97FF" />
        </g>

        {/* ═══════════ GROUP 3 — Wordmark ═══════════ */}
        <g className="anim-wordmark">
          <text
            x="250"
            y="445"
            textAnchor="middle"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="42"
            fontWeight="800"
            letterSpacing="-1.5"
            fill="#FFFFFF"
          >
            GTECH
            <tspan fill="url(#g-word)">GLOBAL</tspan>
          </text>
        </g>

        {/* ═══════════ GROUP 4 — Tagline ═══════════ */}
        <g className="anim-tagline">
          <text
            x="250"
            y="475"
            textAnchor="middle"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="9"
            fontWeight="500"
            letterSpacing="5"
            fill="#8a8f98"
          >
            INNOVATION · SOLUTIONS · GROWTH
          </text>
        </g>
      </svg>

      {/* ─── Shimmer bar across the whole block ─── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <div className="logo-shimmer-bar absolute -inset-y-10 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      </div>
    </div>
  );
}
