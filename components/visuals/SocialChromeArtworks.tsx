"use client";

import React from "react";

export function FacebookChromeOrb({ className = "w-36 h-36" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Chrome Orb Gradients */}
        <radialGradient id="fb-orb-specular" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#e4e4e7" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#71717a" stopOpacity="0.6" />
          <stop offset="75%" stopColor="#18181b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#09090b" stopOpacity="1" />
        </radialGradient>

        <linearGradient id="fb-rim-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#a1a1aa" />
          <stop offset="50%" stopColor="#27272a" />
          <stop offset="70%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#3f3f46" />
        </linearGradient>

        <linearGradient id="fb-inner-glyph" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#f4f4f5" />
          <stop offset="70%" stopColor="#a1a1aa" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>

        <filter id="fb-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <radialGradient id="smoke-flow-1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="60%" stopColor="rgba(200,200,220,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Ambient Liquid Smoke Backing */}
      <circle cx="100" cy="100" r="95" fill="url(#smoke-flow-1)" />

      {/* Outer Mercury Liquid Wave Rings */}
      <path
        d="M30 100 C28 60, 60 28, 100 28 C140 28, 172 60, 170 100 C168 140, 140 172, 100 172 C60 172, 32 140, 30 100 Z"
        stroke="url(#fb-rim-metal)"
        strokeWidth="2"
        strokeOpacity="0.6"
      />
      <path
        d="M22 92 C20 48, 55 20, 104 22 C150 24, 180 55, 178 98 C176 142, 146 178, 98 178 C48 178, 24 136, 22 92 Z"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />

      {/* Main Chrome Sphere */}
      <circle cx="100" cy="100" r="68" fill="url(#fb-orb-specular)" stroke="url(#fb-rim-metal)" strokeWidth="1.5" />

      {/* Top Specular Glare Crescent */}
      <path
        d="M48 80 C55 52, 80 40, 115 40 C145 40, 158 54, 154 62 C135 48, 90 48, 56 75 C52 78, 50 79, 48 80 Z"
        fill="#ffffff"
        opacity="0.8"
      />

      {/* Facebook 'f' Glyph Embossed in Solid Chrome */}
      <g filter="url(#fb-glow)">
        <path
          d="M108 142 V108 H120 L122 94 H108 V85 C108 81 110 78 116 78 H123 V66 C120 65.5 115 65 110 65 C97 65 89 73 89 87 V94 H78 V108 H89 V142 H108 Z"
          fill="url(#fb-inner-glyph)"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </g>

      {/* Bottom Specular Refraction Highlight */}
      <ellipse cx="100" cy="158" rx="32" ry="6" fill="#ffffff" opacity="0.3" />
    </svg>
  );
}

export function InstagramChromeOrb({ className = "w-36 h-36" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="ig-orb-specular" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#e4e4e7" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#71717a" stopOpacity="0.6" />
          <stop offset="75%" stopColor="#18181b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#09090b" stopOpacity="1" />
        </radialGradient>

        <linearGradient id="ig-rim-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#a1a1aa" />
          <stop offset="50%" stopColor="#27272a" />
          <stop offset="70%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#3f3f46" />
        </linearGradient>

        <linearGradient id="ig-inner-glyph" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#f4f4f5" />
          <stop offset="70%" stopColor="#a1a1aa" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>

        <filter id="ig-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <radialGradient id="ig-smoke-flow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="60%" stopColor="rgba(200,200,220,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Ambient Liquid Smoke Backing */}
      <circle cx="100" cy="100" r="95" fill="url(#ig-smoke-flow)" />

      {/* Swirling Liquid Droplet Stream */}
      <path
        d="M28 100 C28 58, 62 26, 102 26 C144 26, 174 58, 172 100 C170 142, 138 174, 98 174 C58 174, 28 142, 28 100 Z"
        stroke="url(#ig-rim-metal)"
        strokeWidth="2"
        strokeOpacity="0.6"
      />
      <path
        d="M20 95 C18 50, 52 18, 105 20 C154 22, 182 52, 180 98 C178 146, 144 182, 95 182 C46 182, 22 140, 20 95 Z"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        strokeDasharray="5 7"
      />

      {/* Main Chrome Sphere */}
      <circle cx="100" cy="100" r="68" fill="url(#ig-orb-specular)" stroke="url(#ig-rim-metal)" strokeWidth="1.5" />

      {/* Top Specular Glare Crescent */}
      <path
        d="M48 80 C55 52, 80 40, 115 40 C145 40, 158 54, 154 62 C135 48, 90 48, 56 75 C52 78, 50 79, 48 80 Z"
        fill="#ffffff"
        opacity="0.8"
      />

      {/* Instagram Camera Glyph Embossed in Solid Chrome */}
      <g filter="url(#ig-glow)">
        {/* Outer squircle */}
        <rect
          x="68"
          y="68"
          width="64"
          height="64"
          rx="18"
          fill="none"
          stroke="url(#ig-inner-glyph)"
          strokeWidth="6"
        />
        {/* Center lens */}
        <circle
          cx="100"
          cy="100"
          r="16"
          fill="none"
          stroke="url(#ig-inner-glyph)"
          strokeWidth="6"
        />
        {/* Flash dot */}
        <circle cx="120" cy="80" r="3.5" fill="url(#ig-inner-glyph)" />
      </g>

      {/* Bottom Specular Refraction Highlight */}
      <ellipse cx="100" cy="158" rx="32" ry="6" fill="#ffffff" opacity="0.3" />
    </svg>
  );
}

export function LineChromeOrb({ className = "w-36 h-36" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="line-orb-specular" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#e4e4e7" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#71717a" stopOpacity="0.6" />
          <stop offset="75%" stopColor="#18181b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#09090b" stopOpacity="1" />
        </radialGradient>

        <linearGradient id="line-rim-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#a1a1aa" />
          <stop offset="50%" stopColor="#27272a" />
          <stop offset="70%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#3f3f46" />
        </linearGradient>

        <linearGradient id="line-inner-glyph" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#f4f4f5" />
          <stop offset="70%" stopColor="#a1a1aa" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>

        <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <radialGradient id="line-smoke-flow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="60%" stopColor="rgba(200,200,220,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Ambient Liquid Smoke Backing */}
      <circle cx="100" cy="100" r="95" fill="url(#line-smoke-flow)" />

      {/* Swirling Fluid Rings */}
      <path
        d="M28 100 C28 58, 62 26, 102 26 C144 26, 174 58, 172 100 C170 142, 138 174, 98 174 C58 174, 28 142, 28 100 Z"
        stroke="url(#line-rim-metal)"
        strokeWidth="2"
        strokeOpacity="0.6"
      />
      <path
        d="M20 95 C18 50, 52 18, 105 20 C154 22, 182 52, 180 98 C178 146, 144 182, 95 182 C46 182, 22 140, 20 95 Z"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        strokeDasharray="5 7"
      />

      {/* Main Chrome Sphere */}
      <circle cx="100" cy="100" r="68" fill="url(#line-orb-specular)" stroke="url(#line-rim-metal)" strokeWidth="1.5" />

      {/* Top Specular Glare Crescent */}
      <path
        d="M48 80 C55 52, 80 40, 115 40 C145 40, 158 54, 154 62 C135 48, 90 48, 56 75 C52 78, 50 79, 48 80 Z"
        fill="#ffffff"
        opacity="0.8"
      />

      {/* LINE Speech Bubble & Letters Embossed in Solid Chrome */}
      <g filter="url(#line-glow)">
        {/* LINE Speech Bubble Shape */}
        <path
          d="M62 96 C62 76 79 62 100 62 C121 62 138 76 138 96 C138 114 122 128 102 129 C96 130 92 133 87 138 C84 141 82 140 83 136 L84 127 C71 122 62 110 62 96 Z"
          fill="none"
          stroke="url(#line-inner-glyph)"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        {/* Lettering: LINE */}
        <text
          x="100"
          y="102"
          textAnchor="middle"
          dominantBaseline="central"
          fill="url(#line-inner-glyph)"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="22"
          letterSpacing="1.5"
        >
          LINE
        </text>
      </g>

      {/* Bottom Specular Refraction Highlight */}
      <ellipse cx="100" cy="158" rx="32" ry="6" fill="#ffffff" opacity="0.3" />
    </svg>
  );
}
