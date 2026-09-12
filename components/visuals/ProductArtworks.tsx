"use strict";
import React from "react";

export function FoundationArtwork({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Chrome Gradients */}
        <linearGradient id="chrome-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#d4d4d8" />
          <stop offset="45%" stopColor="#71717a" />
          <stop offset="55%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="#3f3f46" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
        <linearGradient id="chrome-pump" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#71717a" />
          <stop offset="30%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#a1a1aa" />
          <stop offset="85%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="bottle-glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#18181b" stopOpacity="0.9" />
          <stop offset="20%" stopColor="#27272a" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#18181b" stopOpacity="0.4" />
          <stop offset="80%" stopColor="#3f3f46" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#09090b" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="foundation-liquid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c59f77" />
          <stop offset="35%" stopColor="#e2c19d" />
          <stop offset="60%" stopColor="#d6b18a" />
          <stop offset="90%" stopColor="#b58e65" />
          <stop offset="100%" stopColor="#8d6b47" />
        </linearGradient>
        <radialGradient id="soft-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <filter id="blur-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      {/* Ambient shadow */}
      <ellipse cx="160" cy="370" rx="90" ry="16" fill="#000000" opacity="0.8" filter="url(#blur-shadow)" />
      
      {/* Background Soft Glow */}
      <circle cx="160" cy="220" r="130" fill="url(#soft-glow)" />

      {/* Foundation Pump Top Nozzle */}
      <rect x="135" y="45" width="50" height="24" rx="4" fill="url(#chrome-pump)" stroke="#a1a1aa" strokeWidth="0.5" />
      <rect x="175" y="52" width="16" height="8" rx="2" fill="#52525b" />
      {/* Pump Stem */}
      <rect x="146" y="69" width="28" height="26" fill="url(#chrome-pump)" stroke="#e4e4e7" strokeWidth="0.5" />
      {/* Chrome Shoulder Collar */}
      <rect x="125" y="95" width="70" height="18" rx="3" fill="url(#chrome-grad-1)" />

      {/* Main Glass Bottle Body */}
      <rect x="105" y="113" width="110" height="240" rx="20" fill="url(#bottle-glass)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      
      {/* Inner Liquid Chamber */}
      <rect x="114" y="140" width="92" height="200" rx="14" fill="url(#foundation-liquid)" />
      
      {/* Glossy liquid inner bevel highlight */}
      <path d="M120 144 C135 142, 185 142, 200 144 C202 170, 202 320, 200 334 C185 336, 135 336, 120 334 Z" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

      {/* Vertical light reflection streak */}
      <rect x="122" y="125" width="10" height="215" rx="5" fill="rgba(255,255,255,0.35)" />
      <rect x="138" y="125" width="2" height="215" rx="1" fill="rgba(255,255,255,0.15)" />

      {/* NOIRE Luxury Label Branding on Bottle */}
      <rect x="132" y="210" width="56" height="42" rx="2" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <text x="160" y="228" textAnchor="middle" fill="#ffffff" fontFamily="var(--font-cinzel), serif" fontSize="9" letterSpacing="3" fontWeight="600">NOIRE</text>
      <text x="160" y="240" textAnchor="middle" fill="#a1a1aa" fontFamily="sans-serif" fontSize="5" letterSpacing="1.5">LUMINOUS SILK</text>

      {/* Heavy Glass Bottom Base */}
      <path d="M106 332 Q160 336 214 332 L214 340 Q160 348 106 340 Z" fill="rgba(255,255,255,0.4)" opacity="0.7" />
    </svg>
  );
}

export function LipstickArtwork({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="lip-bullet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9e2a2b" />
          <stop offset="40%" stopColor="#bd3a41" />
          <stop offset="70%" stopColor="#6e1a24" />
          <stop offset="100%" stopColor="#3d0c14" />
        </linearGradient>
        <linearGradient id="lip-case" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#09090b" />
          <stop offset="25%" stopColor="#27272a" />
          <stop offset="50%" stopColor="#18181b" />
          <stop offset="75%" stopColor="#3f3f46" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
        <linearGradient id="chrome-bezel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e4e4e7" />
          <stop offset="30%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#a1a1aa" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>
        <filter id="shadow-lip" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <ellipse cx="160" cy="370" rx="75" ry="14" fill="#000000" opacity="0.85" filter="url(#shadow-lip)" />

      {/* Lipstick Bullet Tip with signature diagonal slant */}
      <path d="M142 120 L160 60 Q178 75 178 120 Z" fill="url(#lip-bullet)" />
      {/* Specular sheen on bullet */}
      <path d="M152 75 L160 60 Q168 70 168 95 Q158 90 152 75 Z" fill="rgba(255,255,255,0.4)" />

      {/* Inner Chrome Swivel Sleeve */}
      <rect x="136" y="118" width="48" height="50" fill="url(#chrome-bezel)" stroke="#e4e4e7" strokeWidth="0.5" />
      <line x1="148" y1="118" x2="148" y2="168" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />

      {/* Polished Chrome Accent Ring */}
      <rect x="130" y="168" width="60" height="12" fill="url(#chrome-bezel)" rx="1" />

      {/* Lower Obsidian Lacquered Magnetic Case Body */}
      <rect x="130" y="180" width="60" height="175" rx="4" fill="url(#lip-case)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

      {/* Vertical light gloss reflection */}
      <rect x="136" y="183" width="6" height="168" fill="rgba(255,255,255,0.25)" />
      <rect x="146" y="183" width="1.5" height="168" fill="rgba(255,255,255,0.15)" />

      {/* NOIRE Vertical Laser Engraving */}
      <text x="160" y="270" textAnchor="middle" fill="#d4d4d8" fontFamily="var(--font-cinzel), serif" fontSize="9" letterSpacing="4" transform="rotate(-90 160 270)">NOIRE</text>

      {/* Bottom weighted base */}
      <rect x="130" y="348" width="60" height="7" rx="2" fill="url(#chrome-bezel)" />
    </svg>
  );
}

export function EyeshadowArtwork({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="compact-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#18181b" />
          <stop offset="50%" stopColor="#09090b" />
          <stop offset="100%" stopColor="#27272a" />
        </linearGradient>
        <linearGradient id="chrome-trim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#a1a1aa" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <filter id="shadow-palette" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      <ellipse cx="160" cy="370" rx="100" ry="18" fill="#000000" opacity="0.8" filter="url(#shadow-palette)" />

      {/* Open Upper Mirror Lid (Tilted back) */}
      <polygon points="80,140 240,140 225,60 95,60" fill="#18181b" stroke="url(#chrome-trim)" strokeWidth="1.5" />
      {/* Interior Mirror Glass */}
      <polygon points="90,132 230,132 218,68 102,68" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
      {/* Mirror Sheen diagonal streak */}
      <polygon points="120,132 145,132 175,68 150,68" fill="rgba(255,255,255,0.25)" />

      {/* Chrome Hinge Bar */}
      <rect x="75" y="137" width="170" height="7" rx="2" fill="url(#chrome-trim)" />

      {/* Main Base Compact Body */}
      <rect x="70" y="144" width="180" height="200" rx="12" fill="url(#compact-body)" stroke="url(#chrome-trim)" strokeWidth="1.5" />

      {/* 9 Eyeshadow Pans (3x3 grid) */}
      {/* Row 1 */}
      <rect x="85" y="160" width="44" height="44" rx="4" fill="#3f3f46" stroke="rgba(255,255,255,0.2)" />
      <rect x="138" y="160" width="44" height="44" rx="4" fill="#d4d4d8" stroke="rgba(255,255,255,0.4)" />
      <rect x="191" y="160" width="44" height="44" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.2)" />

      {/* Row 2 */}
      <rect x="85" y="214" width="44" height="44" rx="4" fill="#a1a1aa" stroke="rgba(255,255,255,0.3)" />
      <rect x="138" y="214" width="44" height="44" rx="4" fill="#71717a" stroke="rgba(255,255,255,0.2)" />
      <rect x="191" y="214" width="44" height="44" rx="4" fill="#e4e4e7" stroke="rgba(255,255,255,0.4)" />

      {/* Row 3 */}
      <rect x="85" y="268" width="44" height="44" rx="4" fill="#27272a" stroke="rgba(255,255,255,0.2)" />
      <rect x="138" y="268" width="44" height="44" rx="4" fill="#c59f77" stroke="rgba(255,255,255,0.3)" />
      <rect x="191" y="268" width="44" height="44" rx="4" fill="#52525b" stroke="rgba(255,255,255,0.2)" />

      {/* Metallic sparkle dust on pan 2, 6, 8 */}
      <circle cx="160" cy="182" r="1" fill="#ffffff" />
      <circle cx="213" cy="236" r="1.2" fill="#ffffff" />
      <circle cx="160" cy="290" r="1" fill="#ffffff" />

      {/* NOIRE Subtle Branding */}
      <text x="160" y="332" textAnchor="middle" fill="#71717a" fontFamily="var(--font-cinzel), serif" fontSize="8" letterSpacing="3">NOIRE COUTURE</text>
    </svg>
  );
}

export function CushionArtwork({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="chrome-round" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#e4e4e7" />
          <stop offset="40%" stopColor="#71717a" />
          <stop offset="60%" stopColor="#d4d4d8" />
          <stop offset="85%" stopColor="#27272a" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <radialGradient id="chrome-disk" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#cbd5e1" />
          <stop offset="70%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <filter id="shadow-cushion" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Soft floor shadow */}
      <ellipse cx="160" cy="365" rx="105" ry="20" fill="#000000" opacity="0.85" filter="url(#shadow-cushion)" />

      {/* Base Casing with bevel */}
      <ellipse cx="160" cy="235" rx="100" ry="85" fill="#18181b" stroke="url(#chrome-round)" strokeWidth="4" />
      <ellipse cx="160" cy="230" rx="94" ry="79" fill="url(#chrome-disk)" />

      {/* Mirror Sheen Reflection Arc */}
      <path d="M90 200 Q160 140 230 200" stroke="rgba(255,255,255,0.7)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M100 215 Q160 165 220 215" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Embossed NOIRE Monogram 'N' In Liquid Chrome */}
      <circle cx="160" cy="230" r="42" fill="#09090b" stroke="url(#chrome-round)" strokeWidth="1.5" />
      <text x="160" y="246" textAnchor="middle" fill="url(#chrome-round)" fontFamily="var(--font-cinzel), serif" fontSize="46" fontWeight="bold" letterSpacing="1">N</text>

      {/* Chrome clasp push-button */}
      <rect x="145" y="316" width="30" height="8" rx="3" fill="url(#chrome-round)" stroke="#52525b" strokeWidth="0.5" />
    </svg>
  );
}

export function SerumArtwork({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="chrome-mirror" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#e4e4e7" />
          <stop offset="50%" stopColor="#71717a" />
          <stop offset="70%" stopColor="#f4f4f5" />
          <stop offset="100%" stopColor="#27272a" />
        </linearGradient>
        <linearGradient id="dropper-glass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
        </linearGradient>
      </defs>

      {/* Ambient shadow */}
      <ellipse cx="160" cy="370" rx="80" ry="16" fill="#000000" opacity="0.8" />

      {/* Dropper Rubber Bulb */}
      <ellipse cx="160" cy="65" rx="20" ry="16" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
      
      {/* Dropper Chrome Collar Ring */}
      <rect x="134" y="80" width="52" height="32" rx="3" fill="url(#chrome-mirror)" stroke="#d4d4d8" strokeWidth="0.5" />
      <line x1="134" y1="96" x2="186" y2="96" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />

      {/* Square Mirrored Glass Luxury Serum Flask Body */}
      <rect x="110" y="112" width="100" height="235" rx="16" fill="url(#chrome-mirror)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />

      {/* Vertical Chrome Reflection Beam */}
      <rect x="122" y="118" width="12" height="223" rx="6" fill="rgba(255,255,255,0.6)" />
      <rect x="142" y="118" width="3" height="223" rx="1.5" fill="rgba(255,255,255,0.3)" />

      {/* Monogram / Title */}
      <rect x="128" y="200" width="64" height="54" rx="2" fill="rgba(0,0,0,0.65)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <text x="160" y="222" textAnchor="middle" fill="#ffffff" fontFamily="var(--font-cinzel), serif" fontSize="10" letterSpacing="3" fontWeight="bold">NOIRE</text>
      <text x="160" y="234" textAnchor="middle" fill="#a1a1aa" fontFamily="sans-serif" fontSize="5.5" letterSpacing="1.5">CELLULAR ELIXIR</text>
      <text x="160" y="244" textAnchor="middle" fill="#71717a" fontFamily="sans-serif" fontSize="4.5" letterSpacing="1">30 ML / 1.0 FL. OZ.</text>
    </svg>
  );
}

export function BrushArtwork({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="brush-bristle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#3f3f46" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
        <linearGradient id="chrome-handle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#27272a" />
          <stop offset="25%" stopColor="#d4d4d8" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#71717a" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
      </defs>

      <ellipse cx="160" cy="370" rx="50" ry="12" fill="#000000" opacity="0.8" />

      {/* Synthetic Bristles Fan */}
      <path d="M125 120 C120 70, 140 40, 160 40 C180 40, 200 70, 195 120 Z" fill="url(#brush-bristle)" />

      {/* Chrome Ferrule Ring */}
      <rect x="135" y="120" width="50" height="50" rx="3" fill="url(#chrome-handle)" stroke="#e4e4e7" strokeWidth="0.5" />
      <line x1="135" y1="135" x2="185" y2="135" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
      <line x1="135" y1="155" x2="185" y2="155" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />

      {/* Tapered Chrome Ergonomic Wand Handle */}
      <polygon points="140,170 180,170 166,355 154,355" fill="url(#chrome-handle)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

      {/* Light streak */}
      <line x1="156" y1="172" x2="158" y2="352" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  );
}

export function ChromeMedallion({ year = "๒๕๕๘", className = "w-28 h-28" }: { year?: string; className?: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={`med-chrome-${year}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#d4d4d8" />
          <stop offset="50%" stopColor="#71717a" />
          <stop offset="75%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#27272a" />
        </linearGradient>
        <radialGradient id={`med-disk-${year}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#3f3f46" />
          <stop offset="50%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#09090b" />
        </radialGradient>
        <filter id={`med-glow-${year}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Soft Glow */}
      <circle cx="80" cy="80" r="68" fill="rgba(255,255,255,0.15)" filter={`url(#med-glow-${year})`} />

      {/* Outer Fluted Gear Border */}
      <circle cx="80" cy="80" r="66" stroke={`url(#med-chrome-${year})`} strokeWidth="4" strokeDasharray="4 2" />

      {/* Raised Chrome Outer Bezel */}
      <circle cx="80" cy="80" r="58" fill={`url(#med-disk-${year})`} stroke={`url(#med-chrome-${year})`} strokeWidth="3" />

      {/* Inner Rim */}
      <circle cx="80" cy="80" r="48" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 2" />

      {/* Content */}
      {year === "100%" ? (
        <g transform="translate(80, 80)">
          <path d="M-18 -2 L-6 10 L18 -14" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="0" y="26" textAnchor="middle" fill="#ffffff" fontFamily="sans-serif" fontSize="13" fontWeight="bold" letterSpacing="1">100%</text>
        </g>
      ) : (
        <text x="80" y="90" textAnchor="middle" fill={`url(#med-chrome-${year})`} fontFamily="var(--font-prompt), sans-serif" fontSize="28" fontWeight="bold" letterSpacing="1">
          {year}
        </text>
      )}

      {/* Top Gloss Arc */}
      <path d="M40 55 Q80 35 120 55" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function CentralLogisticsShield({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#a1a1aa" />
          <stop offset="55%" stopColor="#52525b" />
          <stop offset="80%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
        <linearGradient id="shield-core" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
      </defs>

      {/* Outer Shield Shell */}
      <path d="M100 15 L175 45 C175 120 145 175 100 205 C55 175 25 120 25 45 Z" fill="url(#shield-core)" stroke="url(#shield-grad)" strokeWidth="4" />

      {/* Inner Highlighting Rim */}
      <path d="M100 28 L162 53 C162 115 137 162 100 188 C63 162 38 115 38 53 Z" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

      {/* Core Emblem Text & Icon */}
      <text x="100" y="98" textAnchor="middle" fill="#a1a1aa" fontFamily="var(--font-prompt), sans-serif" fontSize="9" letterSpacing="2">ศูนย์กลางโลจิสติกส์</text>
      <text x="100" y="125" textAnchor="middle" fill="#ffffff" fontFamily="var(--font-cinzel), serif" fontSize="20" fontWeight="bold" letterSpacing="4">NOIRE</text>

      {/* Pulse Dot */}
      <circle cx="100" cy="148" r="4" fill="#ffffff" />
      <circle cx="100" cy="148" r="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
  );
}
