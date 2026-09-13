"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight, Sparkles, Building2, Store, Users } from "lucide-react";
import { WHOLESALE_TIERS, WholesaleTier } from "@/data/noireData";
import ChromeRibbonOrnament from "./visuals/ChromeRibbonOrnament";
import { FoundationArtwork, SerumArtwork, CushionArtwork } from "./visuals/ProductArtworks";

export default function WholesaleSection({
  onOpenQuoteModal,
}: {
  onOpenQuoteModal: (tierId?: string) => void;
}) {
  const [activeTierId, setActiveTierId] = useState<string>("wholesale");

  const activeTier =
    WHOLESALE_TIERS.find((t) => t.id === activeTierId) || WHOLESALE_TIERS[1];

  const getTierIcon = (id: string) => {
    switch (id) {
      case "small":
        return <Store className="w-5 h-5 text-zinc-300" />;
      case "wholesale":
        return <Users className="w-5 h-5 text-zinc-100" />;
      case "bulk":
        return <Building2 className="w-5 h-5 text-white" />;
      default:
        return <Store className="w-5 h-5" />;
    }
  };

  return (
    <section id="wholesale" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070709] overflow-hidden">
      {/* Background Liquid Chrome */}
      <ChromeRibbonOrnament variant="loop" className="bottom-12 inset-x-0 h-96 opacity-25" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-400 mb-4 tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>B2B Commercial Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
            โปรโมชั่นความงามราคาส่ง เพื่อธุรกิจที่เติบโต
          </h2>

          <p className="text-lg sm:text-xl text-zinc-300 font-light">
            ปริมาณที่คุ้มกว่า ในราคาที่ดีกว่า
          </p>
        </div>

        {/* Interactive Selector Pill Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="grid grid-cols-3 p-1.5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl">
            {WHOLESALE_TIERS.map((tier) => {
              const isActive = activeTierId === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setActiveTierId(tier.id)}
                  className={`relative py-3.5 px-3 rounded-xl text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 flex flex-col items-center gap-1 cursor-pointer ${
                    isActive
                      ? "text-black font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTierPill"
                      className="absolute inset-0 bg-white rounded-xl shadow-chrome-glow"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 font-display text-[11px] sm:text-xs">
                    {tier.tag}
                  </span>
                  <span className="relative z-10 text-[10px] sm:text-[11px] font-light opacity-90 hidden sm:inline">
                    {tier.id === "small"
                      ? "เริ่มต้นธุรกิจ"
                      : tier.id === "wholesale"
                      ? "ร้านค้า / ตัวแทน"
                      : "กระจายสินค้าใหญ่"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Tier Interactive Showcase Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTier.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="card-glass rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/20 shadow-2xl relative overflow-hidden"
          >
            {/* Background watermark */}
            <div
              aria-hidden="true"
              className="absolute -right-8 -bottom-8 font-display text-[10rem] font-bold text-white/[0.02] select-none pointer-events-none"
            >
              {activeTier.tag}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Column: Tier Specs & Benefits */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 shrink-0">
                      {getTierIcon(activeTier.id)}
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-400">
                        ระดับคำสั่งซื้อ B2B
                      </span>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide">
                        {activeTier.tag} — {activeTier.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm lg:text-base text-zinc-300 font-light leading-relaxed mb-5 sm:mb-6">
                    <strong className="text-white font-medium">เหมาะสำหรับ: </strong>
                    {activeTier.targetUser}
                  </p>

                  {/* MOQ & Discount Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/10">
                      <p className="text-[11px] sm:text-xs text-zinc-400 mb-1">ยอดสั่งซื้อขั้นต่ำ (MOQ)</p>
                      <p className="text-base sm:text-lg lg:text-xl font-semibold text-white">
                        {activeTier.moq}
                      </p>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/10">
                      <p className="text-[11px] sm:text-xs text-zinc-400 mb-1">ผลประโยชน์ราคาส่ง</p>
                      <p className="text-base sm:text-lg lg:text-xl font-semibold text-emerald-400">
                        {activeTier.discountRange}
                      </p>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                    <p className="text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500 font-medium">
                      สิทธิประโยชน์ในระดับนี้
                    </p>
                    {activeTier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
                        </div>
                        <span className="text-xs sm:text-sm text-zinc-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => onOpenQuoteModal(activeTier.id)}
                    className="btn-chrome light-sweep px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer shadow-chrome-glow"
                  >
                    <span>ขอใบเสนอราคาส่ง ({activeTier.tag})</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <span className="text-[11px] sm:text-xs text-zinc-400 text-center sm:text-left">
                    เจ้าหน้าที่ Key Account ให้บริการตอบกลับภายใน 24 ชม.
                  </span>
                </div>
              </div>

              {/* Right Column: Dynamic Architectural Box Tower Visual */}
              <div className="md:col-span-5 flex flex-col items-center justify-center mt-6 md:mt-0">
                <div className="relative w-full max-w-sm h-80 rounded-2xl p-6 bg-gradient-to-b from-white/[0.05] via-transparent to-black/60 border border-white/10 flex items-center justify-center">
                  <div className="absolute inset-0 bg-radial-spotlight opacity-50" />
                  
                  {/* Dynamic Artwork depending on active tier */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {activeTier.id === "small" && (
                      <div className="w-48 h-64">
                        <FoundationArtwork className="w-full h-full drop-shadow-2xl" />
                      </div>
                    )}
                    {activeTier.id === "wholesale" && (
                      <div className="relative w-64 h-64 flex items-center justify-center">
                        <div className="absolute -left-6 bottom-4 w-36 h-48 opacity-75">
                          <CushionArtwork className="w-full h-full drop-shadow-xl" />
                        </div>
                        <div className="relative z-10 w-40 h-56">
                          <FoundationArtwork className="w-full h-full drop-shadow-2xl" />
                        </div>
                        <div className="absolute -right-6 bottom-2 w-32 h-44 opacity-80">
                          <SerumArtwork className="w-full h-full drop-shadow-xl" />
                        </div>
                      </div>
                    )}
                    {activeTier.id === "bulk" && (
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <div className="text-center space-y-2 p-6 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md">
                          <span className="text-xs text-zinc-400 font-mono tracking-widest uppercase">Dedicated Logistics Service</span>
                          <h4 className="text-2xl font-bold text-white font-display">BULK CONTAINER</h4>
                          <p className="text-xs text-zinc-300">
                            บริการชิปเมนต์ตู้คอนเทนเนอร์ตรง พร้อมหนังสือตรวจปล่อยศุลกากรและ อย. แบบเบ็ดเสร็จ
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-3 inset-x-0 text-center">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">
                      NOIRE OFFICIAL B2B PIPELINE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
