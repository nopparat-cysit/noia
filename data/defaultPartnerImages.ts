// Default 16:9 SVG data URIs matching the user's reference screenshot

export const DEFAULT_GROW_ERA_16_9 = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="pinkBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffeef2" />
      <stop offset="50%" stop-color="#fed6df" />
      <stop offset="100%" stop-color="#f8b6c4" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef3c7" />
      <stop offset="50%" stop-color="#d97706" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#be185d" />
      <stop offset="50%" stop-color="#e11d48" />
      <stop offset="100%" stop-color="#9d174d" />
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="450" fill="url(#pinkBg)" />

  <!-- Elegant Gold Ring & Geometric Framing -->
  <circle cx="280" cy="225" r="140" fill="none" stroke="url(#gold)" stroke-width="3" opacity="0.6" />
  <circle cx="280" cy="225" r="160" fill="none" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.4" />
  <circle cx="580" cy="225" r="110" fill="none" stroke="url(#gold)" stroke-width="2" opacity="0.3" />

  <!-- Soft Petal Accents -->
  <path d="M120,120 Q160,80 180,130 Q140,160 120,120 Z" fill="#f43f5e" opacity="0.25" />
  <path d="M680,320 Q720,280 740,330 Q700,360 680,320 Z" fill="#f43f5e" opacity="0.25" />
  <path d="M650,110 Q680,80 700,120 Q660,140 650,110 Z" fill="#fb7185" opacity="0.3" />

  <!-- Small Crown Icon -->
  <path d="M375,130 L390,148 L400,122 L410,148 L425,130 L420,158 L380,158 Z" fill="url(#gold)" />
  <circle cx="400" cy="116" r="3" fill="#fbbf24" />
  <circle cx="375" cy="124" r="2.5" fill="#fbbf24" />
  <circle cx="425" cy="124" r="2.5" fill="#fbbf24" />

  <!-- Sparkles -->
  <text x="445" y="145" font-size="22" fill="#d97706" opacity="0.8">✦</text>
  <text x="350" y="160" font-size="16" fill="#f43f5e" opacity="0.6">✧</text>
  <text x="470" y="270" font-size="18" fill="#fb7185" opacity="0.7">✦</text>

  <!-- Main Logo Typography: Grow Era -->
  <g id="logoText" text-anchor="middle">
    <!-- Drop shadow -->
    <text x="403" y="245" font-family="'Brush Script MT', 'Dancing Script', 'Playfair Display', cursive, serif" font-size="108" font-weight="bold" fill="#f43f5e" opacity="0.3" font-style="italic">Grow</text>
    <text x="400" y="242" font-family="'Brush Script MT', 'Dancing Script', 'Playfair Display', cursive, serif" font-size="108" font-weight="bold" fill="url(#textGrad)" font-style="italic">Grow</text>
    <text x="400" y="305" font-family="'Playfair Display', 'Cinzel', 'Georgia', serif" font-size="44" font-weight="700" letter-spacing="12" fill="#be185d">ERA</text>
  </g>

  <!-- Tagline / Subtitle -->
  <text x="400" y="340" font-family="sans-serif" font-size="15" fill="#9f1239" letter-spacing="4" text-anchor="middle" font-weight="500">
    บ ริ ก า ร ค ว า ม ง า ม น อ ก ส ถ า น ที่
  </text>

  <!-- Bottom Mini Chips (Pin, Heart, Stars) -->
  <g transform="translate(325, 360)">
    <circle cx="20" cy="10" r="10" fill="#ffffff" opacity="0.7" />
    <text x="20" y="14" font-size="11" text-anchor="middle" fill="#e11d48">📍</text>

    <circle cx="75" cy="10" r="10" fill="#ffffff" opacity="0.7" />
    <text x="75" y="14" font-size="11" text-anchor="middle" fill="#e11d48">♥</text>

    <circle cx="130" cy="10" r="10" fill="#ffffff" opacity="0.7" />
    <text x="130" y="14" font-size="11" text-anchor="middle" fill="#d97706">✨</text>
  </g>
</svg>
`)}`;

export const DEFAULT_LANDSCAPE_16_9 = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#80c6f7" />
      <stop offset="60%" stop-color="#bce3fd" />
      <stop offset="100%" stop-color="#e8f5fe" />
    </linearGradient>
    <linearGradient id="hillBack" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8fd843" />
      <stop offset="100%" stop-color="#6bb828" />
    </linearGradient>
    <linearGradient id="hillFront" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9fe04e" />
      <stop offset="100%" stop-color="#73c429" />
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect width="800" height="450" fill="url(#skyGrad)" />

  <!-- Cloud 1 -->
  <g fill="#ffffff" opacity="0.95">
    <ellipse cx="400" cy="130" rx="75" ry="32" />
    <ellipse cx="430" cy="115" rx="55" ry="35" />
    <ellipse cx="370" cy="125" rx="45" ry="28" />
  </g>

  <!-- Distant Hill -->
  <path d="M-50,340 Q250,220 500,280 T850,260 L850,450 L-50,450 Z" fill="url(#hillBack)" />

  <!-- Foreground Green Hill -->
  <path d="M-50,380 Q200,290 420,330 Q650,370 850,300 L850,450 L-50,450 Z" fill="url(#hillFront)" />

  <!-- Subtle Nail Polish / Spa sparkle icon overlay -->
  <g transform="translate(680, 50)" opacity="0.6">
    <circle cx="20" cy="20" r="18" fill="#ffffff" />
    <text x="20" y="26" font-size="16" text-anchor="middle">💅</text>
  </g>
</svg>
`)}`;
