"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ShieldCheck,
  Factory,
  PackageX,
  Gavel,
  CheckCircle2,
  Scale,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { COMPARISON_DATA } from "@/data/noireData";
import ChromeRibbonOrnament from "./visuals/ChromeRibbonOrnament";

export default function StandardsComparison() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="standards" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      {/* Background Ribbon */}
      <ChromeRibbonOrnament variant="diagonal" className="top-10 inset-x-0 h-96 opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-400 mb-4 tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>Benchmark of Integrity</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            มาตรฐาน <span className="font-display tracking-[0.2em] text-chrome">NOIRE</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            อย่าเสี่ยงธุรกิจค้าปลีกของคุณกับซัพพลายเออร์ที่ไม่ผ่านการตรวจสอบ
          </p>
        </motion.div>

        {/* Desktop Side-by-Side Comparison Container */}
        <div className="hidden md:block max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black/40 backdrop-blur-xl">
          {/* Header Split Bar */}
          <div className="grid grid-cols-2 border-b border-white/15">
            {/* Gray Market Header */}
            <div className="p-6 bg-red-950/20 border-r border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-300 tracking-wide">
                    ตลาดหิ้วทั่วไป (Gray Market)
                  </h3>
                  <span className="text-[11px] text-red-400/80">ความเสี่ยงสูง ไร้การคุ้มครอง</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-mono">
                HIGH RISK
              </span>
            </div>

            {/* NOIRE Standard Header */}
            <div className="p-6 bg-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide font-display">
                    มาตรฐาน NOIRE
                  </h3>
                  <span className="text-[11px] text-emerald-400">ถูกต้อง 100% ไร้ความเสี่ยง</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                CERTIFIED 100%
              </span>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-white/10">
            {/* Row 1: มาตรฐานการจัดหา */}
            <div
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="grid grid-cols-2 transition-colors duration-200"
            >
              {/* Gray Market */}
              <div className="p-8 bg-black/30 border-r border-white/10 flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 shrink-0 mt-0.5">
                  <Factory className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                    มาตรฐานการจัดหา
                  </span>
                  <h4 className="text-base font-semibold text-zinc-300 mb-1">
                    โรงงานที่ไม่สามารถยืนยันได้
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    ไม่ทราบแหล่งผลิตจริง เสี่ยงสินค้าปลอม ปนเปื้อน หรือสูตรตกสเปก ไม่มีเอกสารรับรองมาตรฐาน
                  </p>
                </div>
              </div>

              {/* NOIRE */}
              <div className="p-8 bg-white/[0.02] flex items-start gap-4 group hover:bg-white/[0.04] transition-colors">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400/80 block mb-1">
                    มาตรฐานการจัดหา
                  </span>
                  <h4 className="text-base font-semibold text-white mb-1">
                    ยืนยันผ่านฐานข้อมูล อย.
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-2">
                    (THFDA Data Catalog: GMP Cosmetic) มีแหล่งกำเนิดโรงงานระดับสากลชัดเจน
                  </p>
                  <span className="text-[11px] text-zinc-400 bg-black/40 px-2 py-0.5 rounded border border-white/5 inline-block">
                    ตรวจสอบผ่านระบบ อย. ได้ทันที
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2: ความถูกต้องในการนำเข้า */}
            <div
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="grid grid-cols-2 transition-colors duration-200"
            >
              {/* Gray Market */}
              <div className="p-8 bg-black/30 border-r border-white/10 flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 shrink-0 mt-0.5">
                  <PackageX className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                    ความถูกต้องในการนำเข้า
                  </span>
                  <h4 className="text-base font-semibold text-zinc-300 mb-1">
                    ลักลอบนำเข้า / เสี่ยงต่อการถูกยึดสินค้า
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    สินค้าหลบเลี่ยงภาษีและด่านตรวจ เสี่ยงถูกอายัดหรือยึดทำลายโดยศุลกากรระหว่างการขนส่ง
                  </p>
                </div>
              </div>

              {/* NOIRE */}
              <div className="p-8 bg-white/[0.02] flex items-start gap-4 group hover:bg-white/[0.04] transition-colors">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400/80 block mb-1">
                    ความถูกต้องในการนำเข้า
                  </span>
                  <h4 className="text-base font-semibold text-white mb-1">
                    ถูกต้อง 100% ผ่านระบบ LPI และศุลกากร
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-2">
                    สำแดงใบอนุญาต License per Invoice (LPI) และผ่านด่านตรวจอย่างสมบูรณ์ทุกชิปเมนต์
                  </p>
                  <span className="text-[11px] text-zinc-400 bg-black/40 px-2 py-0.5 rounded border border-white/5 inline-block">
                    มีใบขนสินค้าและใบเสร็จภาษีถูกต้อง
                  </span>
                </div>
              </div>
            </div>

            {/* Row 3: ความเสี่ยงของร้านค้าปลีก */}
            <div
              onMouseEnter={() => setHoveredIndex(2)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="grid grid-cols-2 transition-colors duration-200"
            >
              {/* Gray Market */}
              <div className="p-8 bg-black/30 border-r border-white/10 flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 shrink-0 mt-0.5">
                  <Gavel className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                    ความเสี่ยงของร้านค้าปลีก
                  </span>
                  <h4 className="text-base font-semibold text-zinc-300 mb-1">
                    รับความรับผิดชอบทางกฎหมายระดับสูง
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    ผู้จำหน่ายต้องรับผิดชอบโทษทางอาญาและปรับ หากถูกตรวจพบว่าจำหน่ายเครื่องสำอางไม่จดแจ้ง
                  </p>
                </div>
              </div>

              {/* NOIRE */}
              <div className="p-8 bg-white/[0.02] flex items-start gap-4 group hover:bg-white/[0.04] transition-colors">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400/80 block mb-1">
                    ความเสี่ยงของร้านค้าปลีก
                  </span>
                  <h4 className="text-base font-semibold text-white mb-1">
                    ไร้ความเสี่ยง ได้รับความคุ้มครองตาม พ.ร.บ. ปี 2565
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-2">
                    ร้านค้าดำเนินธุรกิจได้อย่างสบายใจ มีเอกสารตัวแทนจำหน่ายและเลขจดแจ้งกำกับชัดเจน
                  </p>
                  <span className="text-[11px] text-zinc-400 bg-black/40 px-2 py-0.5 rounded border border-white/5 inline-block">
                    คุ้มครองทางกฎหมาย 100%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stacked Criteria View */}
        <div className="md:hidden space-y-5">
          {/* Criterion 1 */}
          <div className="card-glass rounded-2xl p-5 border border-white/10 space-y-4">
            <span className="text-[10px] text-zinc-400 font-medium bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
              เกณฑ์ 01: มาตรฐานการจัดหา
            </span>

            {/* NOIRE Card */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold">มาตรฐาน <span className="font-display tracking-wider">NOIRE</span></span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">ยืนยันผ่านฐานข้อมูล อย.</h4>
              <p className="text-xs text-zinc-300">THFDA Data Catalog: GMP Cosmetic มีแหล่งกำเนิดโรงงานระดับสากล</p>
            </div>

            {/* Gray Market Card */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/15">
              <div className="flex items-center gap-2 text-red-400 mb-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-semibold">ตลาดหิ้วทั่วไป (Gray Market)</span>
              </div>
              <h4 className="text-xs font-semibold text-red-300 mb-0.5">โรงงานที่ไม่สามารถยืนยันได้</h4>
              <p className="text-[11px] text-zinc-400">ไม่ทราบแหล่งผลิตจริง เสี่ยงสินค้าปลอมหรือตกสเปก</p>
            </div>
          </div>

          {/* Criterion 2 */}
          <div className="card-glass rounded-2xl p-5 border border-white/10 space-y-4">
            <span className="text-[10px] text-zinc-400 font-medium bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
              เกณฑ์ 02: ความถูกต้องในการนำเข้า
            </span>

            {/* NOIRE Card */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-bold">มาตรฐาน <span className="font-display tracking-wider">NOIRE</span></span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">ถูกต้อง 100% ผ่านระบบ LPI และศุลกากร</h4>
              <p className="text-xs text-zinc-300">มีใบขนสินค้าและใบเสร็จภาษีถูกต้องทุกชิปเมนต์</p>
            </div>

            {/* Gray Market Card */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/15">
              <div className="flex items-center gap-2 text-red-400 mb-1.5">
                <PackageX className="w-4 h-4" />
                <span className="text-xs font-semibold">ตลาดหิ้วทั่วไป (Gray Market)</span>
              </div>
              <h4 className="text-xs font-semibold text-red-300 mb-0.5">ลักลอบนำเข้า / เสี่ยงต่อการถูกยึดสินค้า</h4>
              <p className="text-[11px] text-zinc-400">หลบเลี่ยงภาษี เสี่ยงถูกอายัดหรือยึดทำลาย</p>
            </div>
          </div>

          {/* Criterion 3 */}
          <div className="card-glass rounded-2xl p-5 border border-white/10 space-y-4">
            <span className="text-[10px] text-zinc-400 font-medium bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
              เกณฑ์ 03: ความเสี่ยงของร้านค้าปลีก
            </span>

            {/* NOIRE Card */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
                <Scale className="w-4 h-4" />
                <span className="text-xs font-bold">มาตรฐาน <span className="font-display tracking-wider">NOIRE</span></span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">ไร้ความเสี่ยง ได้รับความคุ้มครองตาม พ.ร.บ. ปี 2565</h4>
              <p className="text-xs text-zinc-300">ดำเนินธุรกิจได้อย่างสบายใจ มีเอกสารตัวจริงคุ้มครอง 100%</p>
            </div>

            {/* Gray Market Card */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/15">
              <div className="flex items-center gap-2 text-red-400 mb-1.5">
                <Gavel className="w-4 h-4" />
                <span className="text-xs font-semibold">ตลาดหิ้วทั่วไป (Gray Market)</span>
              </div>
              <h4 className="text-xs font-semibold text-red-300 mb-0.5">รับความรับผิดชอบทางกฎหมายระดับสูง</h4>
              <p className="text-[11px] text-zinc-400">ผู้จำหน่ายต้องรับผิดชอบโทษทางอาญาและค่าปรับ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
