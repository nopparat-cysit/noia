"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Percent,
  Coins,
  ArrowUpRight,
  Sparkles,
  Gift,
  ShieldCheck,
  Package,
} from "lucide-react";
import ChromeRibbonOrnament from "./visuals/ChromeRibbonOrnament";

interface PromotionCalculatorProps {
  onOpenQuoteModal: (tierId?: string) => void;
}

export default function PromotionCalculator({ onOpenQuoteModal }: PromotionCalculatorProps) {
  const [quantity, setQuantity] = useState<number>(60);
  const [selectedProductType, setSelectedProductType] = useState<string>("mixed");

  // Product base retail price average based on selection
  const avgRetailPrice = useMemo(() => {
    switch (selectedProductType) {
      case "foundation":
        return 2500;
      case "lipstick":
        return 2500;
      case "serum":
        return 2900;
      case "eyeshadow":
        return 2500;
      case "mixed":
      default:
        return 2600;
    }
  }, [selectedProductType]);

  // Determine active tier and discount percentage based on quantity
  const tierInfo = useMemo(() => {
    if (quantity >= 200) {
      return {
        tierId: "bulk",
        tierName: "BULK ORDER TIER",
        discountPercent: 40,
        bonusGift: "ฟรีค่าธรรมเนียม LPI + ผู้จัดการบัญชีธุรกิจส่วนตัว + สิทธิชิปเมนต์ตรง",
        badgeColor: "text-white bg-white/15 border-white/30",
      };
    } else if (quantity >= 50) {
      return {
        tierId: "wholesale",
        tierName: "WHOLESALE TIER",
        discountPercent: 35,
        bonusGift: "ฟรีฉลากภาษาไทยกำกับ สคบ./อย. พร้อมขาย + สื่อส่งเสริมการขาย HD",
        badgeColor: "text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
      };
    } else {
      return {
        tierId: "small",
        tierName: "SMALL ORDER TIER",
        discountPercent: 28,
        bonusGift: "เอกสารรับรองมาตรฐาน อย. ตัวจริงครบทุกชิ้น",
        badgeColor: "text-zinc-300 bg-zinc-800 border-zinc-700",
      };
    }
  }, [quantity]);

  const grossRetailRevenue = quantity * avgRetailPrice;
  const wholesaleUnitCost = Math.round(avgRetailPrice * (1 - tierInfo.discountPercent / 100));
  const totalWholesaleCost = wholesaleUnitCost * quantity;
  const netEstimatedProfit = grossRetailRevenue - totalWholesaleCost;
  const profitMarginPercent = Math.round((netEstimatedProfit / totalWholesaleCost) * 100);

  return (
    <section id="promotions" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050507] overflow-hidden">
      {/* Chrome background ribbon */}
      <ChromeRibbonOrnament variant="diagonal" className="top-10 inset-x-0 h-96 opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-400 mb-4 tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>Interactive Profit Simulation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            คำนวณกำไรและ <span className="font-display tracking-[0.2em] text-chrome">โปรโมชั่นราคาส่ง</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            ทดลองปรับจำนวนสินค้าเพื่อดูโครงสร้างส่วนลด B2B ผลกำไรสุทธิ และสิทธิพิเศษที่คุณจะได้รับ
          </p>
        </div>

        {/* Main Interactive Calculator Stage */}
        <div className="max-w-5xl mx-auto card-glass rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/20 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Product Category Filter Switcher */}
              <div>
                <label className="text-xs uppercase tracking-widest text-zinc-400 font-mono block mb-3">
                  เลือกประเภทสินค้าสำหรับการประเมิน:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "mixed", label: "คละทุกหมวด" },
                    { id: "foundation", label: "รองพื้น Silk" },
                    { id: "lipstick", label: "ลิปสติก Velvet" },
                    { id: "serum", label: "เซรั่ม Elixir" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProductType(p.id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        selectedProductType === p.id
                          ? "bg-white text-black font-semibold shadow-chrome-glow"
                          : "bg-black/40 border border-white/10 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider Quantity Controller */}
              <div className="p-5 sm:p-6 rounded-2xl bg-black/50 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400">จำนวนคำสั่งซื้อ (ชิ้น):</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-bold text-white font-display">
                      {quantity}
                    </span>
                    <span className="text-xs text-zinc-500 font-light">ชิ้น</span>
                  </div>
                </div>

                {/* Range Slider */}
                <div className="relative py-2">
                  <input
                    type="range"
                    min={12}
                    max={500}
                    step={6}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-2">
                    <span>12 ชิ้น (Small)</span>
                    <span>50 ชิ้น (Wholesale)</span>
                    <span>200+ ชิ้น (Bulk)</span>
                  </div>
                </div>

                {/* Quick Selection Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-[11px] text-zinc-500">เลือกด่วน:</span>
                  {[24, 50, 100, 200, 350].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setQuantity(preset)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                        quantity === preset
                          ? "bg-white/20 text-white border border-white/30"
                          : "bg-white/5 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Unlocked Tier & Bonus Notification Card */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                      สิทธิประโยชน์ที่ปลดล็อค:
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${tierInfo.badgeColor}`}>
                      {tierInfo.tierName} (-{tierInfo.discountPercent}%)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200 font-light leading-relaxed">
                    {tierInfo.bonusGift}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Live Calculated Results Stage */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.06] via-black/40 to-black/80 border border-white/15 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <span className="text-xs text-zinc-400">ระดับส่วนลดที่ได้รับ:</span>
                  <span className="text-xl font-bold text-emerald-400 font-display">
                    ส่วนลด {tierInfo.discountPercent}%
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between text-zinc-400">
                    <span>มูลค่าขายปลีกประเมิน:</span>
                    <span className="font-mono text-zinc-200">฿{grossRetailRevenue.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-zinc-400">
                    <span>ต้นทุนราคาส่งเฉลี่ย/ชิ้น:</span>
                    <span className="font-mono text-zinc-200">฿{wholesaleUnitCost.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-zinc-400 pb-3 border-b border-white/10">
                    <span>ยอดลงทุนราคาส่งสุทธิ:</span>
                    <span className="font-mono text-white font-semibold">฿{totalWholesaleCost.toLocaleString()}</span>
                  </div>

                  {/* Net Profit Big Highlight */}
                  <div className="pt-2">
                    <span className="text-xs text-emerald-400 uppercase tracking-wider font-semibold block mb-1">
                      กำไรสุทธิที่คุณได้รับ (Net Profit):
                    </span>
                    <p className="text-3xl sm:text-4xl font-black text-white font-display text-chrome-bright">
                      +฿{netEstimatedProfit.toLocaleString()}
                    </p>
                    <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>ผลตอบแทนจากการลงทุน (ROI): +{profitMarginPercent}%</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenQuoteModal(tierInfo.tierId)}
                  className="btn-chrome light-sweep w-full py-4 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-chrome-glow cursor-pointer"
                >
                  <span>นำแผนกำไรนี้ไปขอใบเสนอราคา</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 mt-2.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>รับประกันนำเข้าถูกต้องตาม พ.ร.บ. เครื่องสำอาง 2558/2565</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
