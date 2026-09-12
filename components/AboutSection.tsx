"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, TrendingUp, Plane, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import ChromeRibbonOrnament from "./visuals/ChromeRibbonOrnament";
import { CushionArtwork, FoundationArtwork, LipstickArtwork } from "./visuals/ProductArtworks";

interface Pillar {
  number: string;
  title: string;
  shortDesc: string;
  detailedText: string;
  badge: string;
  metric: string;
  metricLabel: string;
  highlightPoints: string[];
}

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "คุณภาพ",
    shortDesc: "คัดสรรสินค้าที่มีคุณภาพระดับสากล ผ่านการตรวจสอบมาตรฐาน",
    detailedText:
      "เครื่องสำอางทุกชิ้นที่ NOIRE คัดสรรมาจัดจำหน่าย ได้รับการตรวจสอบสูตรและโรงงานผู้ผลิตมาตรฐานสากล (GMP Cosmetic) พร้อมเอกสาร Certificate of Analysis (COA) ผ่านการอนุมัติและทดสอบความปลอดภัยอย่างเคร่งครัด",
    badge: "GLOBAL STANDARD QUALITY",
    metric: "100%",
    metricLabel: "มาตรฐานสากลรับรอง",
    highlightPoints: [
      "คัดเฉพาะแบรนด์และโรงงานที่ผ่านเกณฑ์ GMP",
      "มีใบรับรอง COA ตรวจสอบสารประกอบละเอียด",
      "ทดสอบเนื้อสัมผัสและพิกเมนต์ระดับเคาน์เตอร์แบรนด์",
    ],
  },
  {
    number: "02",
    title: "ราคาขายส่ง",
    shortDesc: "ราคาพิเศษและโครงสร้างกำไรที่คุ้มค่า สำหรับการสั่งซื้อจำนวนมากและตัวแทนจำหน่าย",
    detailedText:
      "เราออกแบบโครงสร้างราคาขายส่งแบบขั้นบันไดที่เอื้อต่อการสร้างผลกำไรสูงสุดให้กับพาร์ทเนอร์ธุรกิจ ช่วยให้ร้านค้าและตัวแทนจำหน่ายสามารถตั้งราคาจำหน่ายปลีกที่สามารถแข่งขันได้ พร้อมรับมาร์จิ้นสูงถึง 25% - 40%",
    badge: "WHOLESALE PROFIT MARGIN",
    metric: "28-40%",
    metricLabel: "อัตราผลกำไรสำหรับคู่ค้า",
    highlightPoints: [
      "โครงสร้างราคาส่ง 3 ระดับรองรับทุกขนาดธุรกิจ",
      "ราคาโปร่งใส ไม่มีค่าใช้จ่ายแอบแฝงในการนำเข้า",
      "สิทธิพิเศษโควตาสต็อกสำหรับตัวแทนจำหน่ายรายใหญ่",
    ],
  },
  {
    number: "03",
    title: "พรีออเดอร์",
    shortDesc: "ระบบรับสั่งซื้อและนำเข้าสินค้าที่ไม่มีในสต็อกอย่างถูกต้องตามกฎหมาย",
    detailedText:
      "หมดปัญหาสินค้าติดค้างหรือถูกอายัดที่ด่านศุลกากร ด้วยระบบพรีออเดอร์ระดับองค์กรที่จัดการใบอนุญาต LPI (License per Invoice) และเคลียร์พิธีการศุลกากรพร้อมด่านอาหารและยาอย่างถูกต้องครบถ้วนก่อนส่งมอบ",
    badge: "LEGAL PREORDER PIPELINE",
    metric: "7-14 วัน",
    metricLabel: "รอบการจัดส่งจากต้นทาง",
    highlightPoints: [
      "ยื่นขอใบอนุญาต LPI ถูกต้องทุกชิปเมนต์",
      "ระบบติดตามสถานะสินค้าแบบ Real-time Logistics",
      "รับประกันความปลอดภัยของสินค้าตลอดการขนส่ง",
    ],
  },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activePillar = PILLARS[activeTab];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050507]">
      {/* Liquid ribbon accents */}
      <ChromeRibbonOrnament variant="diagonal" className="top-1/3 inset-x-0 h-96 opacity-25" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs text-zinc-400 mb-3 sm:mb-4 tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>Pillars of Excellence</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-3 sm:mb-6">
            เกี่ยวกับ <span className="font-display tracking-[0.2em] text-chrome">NOIRE</span>
          </h2>

          <p className="text-sm sm:text-lg text-zinc-300 font-light leading-relaxed">
            ศูนย์รวมเครื่องสำอางระดับพรีเมียมสำหรับการซื้อขาย
            บริการจำหน่ายแบบขายส่งและพรีออเดอร์อย่างเป็นระบบ
          </p>
        </div>

        {/* Mobile Pillar Switcher (Segmented Pill Bar) */}
        <div className="lg:hidden flex rounded-2xl bg-black/60 border border-white/10 p-1.5 mb-6">
          {PILLARS.map((pillar, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={pillar.number}
                onClick={() => setActiveTab(index)}
                className={`flex-1 py-2.5 px-2 rounded-xl text-center transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-chrome-glow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className="font-display text-xs font-bold mr-1">{pillar.number}</span>
                <span className="text-xs font-medium">{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Storytelling Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Interactive Pillar Navigator (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-4">
            {PILLARS.map((pillar, index) => {
              const isActive = activeTab === index;

              return (
                <button
                  key={pillar.number}
                  onClick={() => setActiveTab(index)}
                  className={`text-left p-6 rounded-2xl transition-all duration-400 relative overflow-hidden cursor-pointer ${
                    isActive
                      ? "card-glass border-white/30 bg-white/[0.06] shadow-chrome-glow"
                      : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/15"
                  }`}
                >
                  {/* Subtle active indicator stripe */}
                  {isActive && (
                    <motion.div
                      layoutId="pillarAccent"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-white via-zinc-300 to-zinc-600"
                    />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-display text-2xl sm:text-3xl font-bold transition-colors duration-300 ${
                          isActive ? "text-white" : "text-zinc-600"
                        }`}
                      >
                        {pillar.number}
                      </span>
                      <h3
                        className={`text-xl font-medium tracking-wide transition-colors duration-300 ${
                          isActive ? "text-white" : "text-zinc-400"
                        }`}
                      >
                        {pillar.title}
                      </h3>
                    </div>

                    <span
                      className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                        isActive
                          ? "border-white/20 bg-white/10 text-white"
                          : "border-white/5 text-zinc-600"
                      }`}
                    >
                      {pillar.metric}
                    </span>
                  </div>

                  <p
                    className={`mt-3 text-sm transition-colors duration-300 line-clamp-2 ${
                      isActive ? "text-zinc-300" : "text-zinc-500"
                    }`}
                  >
                    {pillar.shortDesc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Narrative Display & Reactive Artwork */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.number}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="card-glass rounded-3xl p-6 sm:p-12 relative overflow-hidden border border-white/20 shadow-2xl"
              >
                {/* Background oversized pillar number watermark */}
                <div
                  aria-hidden="true"
                  className="absolute -right-4 -bottom-6 sm:-right-6 sm:-bottom-10 font-display text-[8rem] sm:text-[14rem] font-bold text-white/[0.03] select-none pointer-events-none"
                >
                  {activePillar.number}
                </div>

                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-400 uppercase bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                      {activePillar.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span>NOIRE GUARANTEED</span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-wide mb-3 sm:mb-4">
                    {activePillar.title}
                  </h3>

                  <p className="text-sm sm:text-lg text-zinc-300 leading-relaxed font-light mb-6 sm:mb-8">
                    {activePillar.detailedText}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                    {activePillar.highlightPoints.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs sm:text-sm text-zinc-300">{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metric Display Card */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] sm:text-xs text-zinc-400">{activePillar.metricLabel}</p>
                      <p className="text-xl sm:text-3xl font-bold font-display text-white mt-0.5">
                        {activePillar.metric}
                      </p>
                    </div>
                    <a
                      href="#wholesale"
                      className="btn-glass px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 hover:bg-white/10"
                    >
                      <span>ข้อเสนอ B2B</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
