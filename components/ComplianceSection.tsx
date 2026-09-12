"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Scale, ExternalLink, CheckCircle2 } from "lucide-react";
import { COMPLIANCE_DATA, ComplianceItem } from "@/data/noireData";
import { ChromeMedallion } from "./visuals/ProductArtworks";
import ChromeRibbonOrnament from "./visuals/ChromeRibbonOrnament";

export default function ComplianceSection() {
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);

  return (
    <section id="compliance" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070709] overflow-hidden">
      {/* Chrome ribbon behind medals */}
      <ChromeRibbonOrnament variant="horizontal" className="top-1/2 inset-x-0 h-80 opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-400 mb-4 tracking-[0.2em] uppercase">
            <Scale className="w-3.5 h-3.5 text-zinc-300" />
            <span>Legal & Regulatory Assurance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            การรับประกันจาก <span className="font-display tracking-[0.2em] text-chrome">NOIRE</span>:{" "}
            <span className="text-chrome-bright block sm:inline">ถูกต้องตามกฎหมายอย่างสมบูรณ์</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            ปกป้องธุรกิจของคุณด้วยความมั่นใจทางกฎหมายสูงสุดตามมาตรฐาน อย.
          </p>
        </div>

        {/* 3 Pillars Editorial Glass Plaques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
          {COMPLIANCE_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => setSelectedItem(item)}
              className="card-glass card-glass-hover rounded-3xl p-6 md:p-5 lg:p-8 flex flex-col items-center text-center relative overflow-hidden group cursor-pointer"
            >
              {/* Background ambient lighting */}
              <div className="absolute inset-0 bg-radial-spotlight opacity-40 group-hover:opacity-70 transition-opacity" />

              {/* Chrome Medallion */}
              <div className="relative z-10 my-3 sm:my-4 transform transition-transform duration-500 group-hover:scale-105">
                <ChromeMedallion year={item.badgeYear} className="w-24 h-24 lg:w-28 lg:h-28 drop-shadow-2xl" />
              </div>

              {/* Content */}
              <div className="relative z-10 mt-4 sm:mt-6 flex-1 flex flex-col justify-between w-full">
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white tracking-wide mb-2 sm:mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed mb-3 sm:mb-4">
                    {item.subtitle}
                  </p>

                  <p className="text-[11px] sm:text-xs text-zinc-400 font-light leading-relaxed mb-4 sm:mb-6">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-left">
                  <div>
                    <span className="text-[9px] sm:text-[10px] text-zinc-500 block uppercase tracking-wider">หน่วยงานกำกับดูแล</span>
                    <span className="text-[11px] sm:text-xs font-medium text-zinc-300">{item.authority}</span>
                  </div>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimal Legal Framework Summary Bar */}
        <div className="mt-14 p-6 rounded-2xl bg-black/50 border border-white/10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-white">
                การปฏิบัติตามกฎหมายระดับสูงสุดในทุกขั้นตอน
              </h4>
              <p className="text-xs text-zinc-400">
                หมดปัญหาความเสี่ยงทางกฎหมาย สินค้าทุกชิ้นมีฉลากภาษาไทยและเอกสารจดแจ้งครบถ้วน
              </p>
            </div>
          </div>

          <a
            href="#standards"
            className="btn-glass px-4 py-2 rounded-xl text-xs whitespace-nowrap hover:bg-white/10 flex items-center gap-1.5"
          >
            <span>ดูตารางเปรียบเทียบมาตรฐาน</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
