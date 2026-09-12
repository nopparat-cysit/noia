import React from "react";

interface RibbonProps {
  className?: string;
  variant?: "horizontal" | "loop" | "diagonal";
}

export default function ChromeRibbonOrnament({
  className = "w-full h-48",
  variant = "horizontal",
}: RibbonProps) {
  return (
    <div className={`pointer-events-none absolute overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover opacity-60 mix-blend-screen"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ribbon-chrome" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#27272a" stopOpacity="0" />
            <stop offset="15%" stopColor="#71717a" stopOpacity="0.4" />
            <stop offset="35%" stopColor="#e4e4e7" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="65%" stopColor="#a1a1aa" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#52525b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#18181b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ribbon-glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#71717a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
          <filter id="ribbon-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {variant === "horizontal" && (
          <>
            {/* Ambient liquid glow wave */}
            <path
              d="M0,150 Q300,50 600,160 T1200,140 L1200,200 Q900,100 600,210 T0,200 Z"
              fill="url(#ribbon-glow)"
              filter="url(#ribbon-blur)"
            />
            {/* Crisp Liquid Chrome Ribbon */}
            <path
              d="M0,140 C280,30 450,260 720,130 C900,45 1050,190 1200,140"
              stroke="url(#ribbon-chrome)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Secondary reflection hairline */}
            <path
              d="M30,145 C300,38 460,262 730,135 C910,52 1040,192 1170,145"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.2"
            />
          </>
        )}

        {variant === "loop" && (
          <>
            <path
              d="M100,220 C350,30 500,280 750,80 C950,-50 1100,180 1200,220"
              stroke="url(#ribbon-chrome)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M150,210 C380,45 490,265 740,90 C920,-20 1060,170 1150,210"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.5"
            />
          </>
        )}

        {variant === "diagonal" && (
          <>
            <path
              d="M-50,250 C200,200 400,50 800,90 C1000,120 1100,40 1250,20"
              stroke="url(#ribbon-chrome)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M-40,255 C210,205 410,55 810,95 C1010,125 1110,45 1260,25"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1"
            />
          </>
        )}
      </svg>
    </div>
  );
}
