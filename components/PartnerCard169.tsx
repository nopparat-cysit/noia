"use client";

import React from "react";
import { ExternalLink, Edit3 } from "lucide-react";
import { PartnerItem } from "@/lib/googleSheets";

import {
  DEFAULT_GROW_ERA_16_9,
  DEFAULT_LANDSCAPE_16_9,
} from "@/data/defaultPartnerImages";

interface PartnerCard169Props {
  partner: PartnerItem;
  index: number;
  isActive?: boolean;
  onEdit?: () => void;
  showEditButton?: boolean;
}

export default function PartnerCard169({
  partner,
  index,
  isActive,
  onEdit,
  showEditButton = false,
}: PartnerCard169Props) {
  // If partner has "AC" or statusBadge, show badge pill
  const badgeText = partner.statusBadge || (index === 0 ? "AC" : "");
  const isRedBorder = isActive || index === 0;

  const defaultFallbackImage =
    index === 0 ? DEFAULT_GROW_ERA_16_9 : DEFAULT_LANDSCAPE_16_9;

  const [currentImg, setCurrentImg] = React.useState<string>(
    partner.imageUrl || partner.logoUrl || defaultFallbackImage
  );

  React.useEffect(() => {
    setCurrentImg(partner.imageUrl || partner.logoUrl || defaultFallbackImage);
  }, [partner.imageUrl, partner.logoUrl, defaultFallbackImage]);

  return (
    <div
      className={`relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group overflow-hidden h-full ${
        isRedBorder
          ? "border-2 border-red-500/80 shadow-[0_0_30px_rgba(239,68,68,0.18)]"
          : "border border-white/20 hover:border-white/40 shadow-2xl"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(10,10,14,0.92) 100%)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Ambient background glow on hover */}
      <div className="absolute inset-0 bg-radial-spotlight opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none" />

      <div className="relative z-10 flex flex-col flex-1">
        {/* 1. ภาพ (Image 16:9 at the top) */}
        <div className="relative w-full mb-4">
          <div
            className="w-full aspect-[16/9] relative overflow-hidden bg-black/60 border border-white/15 shadow-inner flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.015]"
            style={{
              clipPath:
                "polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)",
            }}
          >
            {currentImg ? (
              <img
                src={currentImg}
                alt={partner.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={() => {
                  if (currentImg !== defaultFallbackImage) {
                    setCurrentImg(defaultFallbackImage);
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 text-zinc-400">
                <span className="text-xs font-mono">ภาพอัตราส่วน 16:9</span>
              </div>
            )}
          </div>

          {/* Edit icon button positioned on top-right of image */}
          {showEditButton && onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-black/95 text-zinc-300 hover:text-white border border-white/20 transition-all cursor-pointer shadow-lg backdrop-blur-md opacity-75 group-hover:opacity-100"
              title="แก้ไขข้อมูลพาร์ทเนอร์นี้"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 2. ชื่อ (Title / Name below the image) */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h4 className="text-lg sm:text-xl font-bold text-white tracking-wide leading-snug break-words">
            {partner.name || (index === 0 ? "การเสริมสวยนอกสถานที่" : "ร้านทำเล็บ")}
          </h4>

          {badgeText && (
            <span
              className={`px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase shadow-md shrink-0 mt-0.5 ${
                badgeText === "AC" || isRedBorder
                  ? "bg-red-600 text-white"
                  : "bg-white/15 text-zinc-200 border border-white/20"
              }`}
            >
              {badgeText}
            </span>
          )}
        </div>

        {/* 3. อธิบาย (Description below the title - displays FULL text without truncation) */}
        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6 whitespace-pre-line break-words">
          {partner.description ||
            (index === 0
              ? "บริการเสริมความงาม ดูแลผิวพรรณ และแต่งหน้าระดับพรีเมียม ดูแลถึงที่โดยทีมช่างผู้เชี่ยวชาญ"
              : "ศูนย์บริการสปาเล็บและออกแบบเล็บระดับพรีเมียม ภายใต้มาตรฐานความสะอาดและความปลอดภัยสูงสุด")}
        </p>
      </div>

      {/* 4. ปุ่ม (Button at the bottom) */}
      <div className="relative z-10 pt-2 flex flex-col items-center gap-1.5">
        <a
          href={partner.websiteUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 hover:brightness-110 active:scale-[0.98] shadow-lg group/btn cursor-pointer relative overflow-hidden border border-white/60"
          style={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #e2e8f0 25%, #94a3b8 55%, #64748b 80%, #475569 100%)",
            boxShadow:
              "inset 0 1.5px 2px rgba(255,255,255,0.9), inset 0 -2px 3px rgba(0,0,0,0.35), 0 6px 16px -2px rgba(0,0,0,0.6)",
          }}
        >
          {/* Surface light reflection sheen */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs sm:text-sm tracking-wide">
            <span>คลิกเพื่อไปที่เว็บพาร์ทเนอร์ของเรา</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-800" />
          </div>
        </a>
      </div>
    </div>
  );
}
