"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Factory,
  ShieldCheck,
  Store,
  FileText,
  FileCheck,
  ClipboardCheck,
  Building,
  ArrowRight,
  Info,
  Sparkles,
} from "lucide-react";
import { CentralLogisticsShield } from "./visuals/ProductArtworks";
import ChromeRibbonOrnament from "./visuals/ChromeRibbonOrnament";

interface NodeDetail {
  title: string;
  desc: string;
  fullDetail: string;
  tag: string;
}

export default function LogisticsArchitecture() {
  const [activeNode, setActiveNode] = useState<string | null>("hub");

  const nodes: Record<string, NodeDetail> = {
    producer: {
      title: "ผู้ผลิตต่างประเทศ",
      desc: "โรงงานผู้ผลิตเครื่องสำอางชั้นนำระดับสากล",
      fullDetail:
        "คัดสรรโรงงานต้นทางที่ผ่านเกณฑ์รับรองสากล GMP Cosmetic พร้อมเอกสาร Certificate of Analysis (COA) รับรองความบริสุทธิ์ของสูตรและส่วนผสมระดับพรีเมียม",
      tag: "ORIGIN & SOURCING",
    },
    hub: {
      title: "ศูนย์กลางโลจิสติกส์ NOIRE",
      desc: "ระบบบริหารจัดการศุลกากร ด่าน อย. และห่วงโซ่อุปทานครบวงจร",
      fullDetail:
        "NOIRE ทำหน้าที่เป็นศูนย์กลางขับเคลื่อนการนำเข้าอย่างถูกต้องตามกฎหมาย 100% จัดการยื่นคำขอ LPI, เอกสาร F-I10-1, ตรวจสอบสูตรกับกลุ่มควบคุมเครื่องสำอาง และเคลียร์สินค้าผ่านด่านอย่างราบรื่น",
      tag: "CENTRAL ECOSYSTEM",
    },
    retailer: {
      title: "ร้านค้าปลีกในไทย",
      desc: "ส่งมอบสินค้าถึงหน้าร้าน คลินิก หรือคลังสินค้าของคุณ",
      fullDetail:
        "สินค้าพร้อมจำหน่ายทันที มีฉลากภาษาไทยกำกับถูกต้องตามกฎหมาย พร้อมเอกสารสำแดงภาษีและเลขที่จดแจ้ง อย. ลดความเสี่ยงทางกฎหมายของร้านค้าปลีกให้เป็นศูนย์",
      tag: "DESTINATION PARTNERS",
    },
    fdaCheck: {
      title: "การจดแจ้งกับกลุ่มควบคุมเครื่องสำอาง",
      desc: "(ตรวจสอบส่วนผสม)",
      fullDetail:
        "ยื่นขอตรวจสอบรายละเอียดส่วนผสม สัดส่วนทางเคมี และสารต้องห้ามตามประกาศกระทรวงสาธารณสุข ก่อนเริ่มรอบการสั่งผลิตหรือนำเข้า",
      tag: "COMPLIANCE STEP 1",
    },
    lpi: {
      title: "การยื่นขอ LPI (License per Invoice)",
      desc: "สำหรับทุกชิปเมนต์",
      fullDetail:
        "ยื่นขออนุญาตผ่านระบบ National Single Window (NSW) รายใบแจ้งหนี้ เพื่อความถูกต้องโปร่งใสตามข้อกำหนดของด่านอาหารและยา",
      tag: "CUSTOMS LICENSE",
    },
    f101: {
      title: "ยื่นแบบฟอร์ม F-I10-1",
      desc: "สำหรับวัตถุดิบ Cosmetic Grade",
      fullDetail:
        "เอกสารรับรองมาตรฐานสำหรับเครื่องสำอางและวัตถุดิบระดับ Cosmetic Grade เพื่อผ่านการพิจารณาอนุญาตนำเข้าของเจ้าหน้าที่ด่าน",
      tag: "RAW MATERIAL CLEARANCE",
    },
    customsClearance: {
      title: "เคลียร์พิธีการด่านศุลกากร และด่านอาหารและยา",
      desc: "(พร้อมหนังสือมอบอำนาจ)",
      fullDetail:
        "ทีมงานผู้เชี่ยวชาญดำเนินการตรวจปล่อยสินค้าที่ด่านศุลกากรทางเรือ/ทางอากาศ พร้อมหนังสือมอบอำนาจและเอกสารกำกับอย่างรัดกุม",
      tag: "PORT CLEARANCE",
    },
  };

  return (
    <section id="logistics" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050507] overflow-hidden">
      {/* Background Ribbon */}
      <ChromeRibbonOrnament variant="horizontal" className="top-1/3 inset-x-0 h-96 opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-400 mb-4 tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>End-to-End Import Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            สถาปัตยกรรมการนำเข้าแบบไร้รอยต่อ
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            เราจัดการกองด่านอาหารและยา และกรมศุลกากร เพื่อให้คุณโฟกัสกับยอดขาย
          </p>
        </motion.div>

        {/* Interactive Architecture Stage */}
        <div className="relative card-glass rounded-3xl p-6 sm:p-10 lg:p-14 border border-white/20 shadow-2xl overflow-hidden mb-10">
          {/* Subtle connecting circuit background lines on desktop */}
          <div aria-hidden="true" className="hidden lg:block absolute inset-0 pointer-events-none opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none">
              {/* Horizontal primary flow line */}
              <line x1="160" y1="300" x2="840" y2="300" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 6" />
              {/* Connections to 4 compliance nodes */}
              <line x1="280" y1="160" x2="440" y2="250" stroke="#a1a1aa" strokeWidth="1.5" />
              <line x1="720" y1="160" x2="560" y2="250" stroke="#a1a1aa" strokeWidth="1.5" />
              <line x1="280" y1="440" x2="440" y2="350" stroke="#a1a1aa" strokeWidth="1.5" />
              <line x1="720" y1="440" x2="560" y2="350" stroke="#a1a1aa" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Flow Layout */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-center">
            {/* 1. Left Node: ผู้ผลิตต่างประเทศ */}
            <div className="md:col-span-3 flex flex-col items-center text-center">
              <button
                onClick={() => setActiveNode("producer")}
                className={`w-full p-4 sm:p-5 lg:p-6 rounded-2xl transition-all cursor-pointer ${
                  activeNode === "producer"
                    ? "bg-white/15 border-2 border-white shadow-chrome-glow"
                    : "bg-black/50 border border-white/10 hover:border-white/30"
                }`}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-white/10 mx-auto flex items-center justify-center mb-2">
                  <Factory className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-0.5">
                  ผู้ผลิตต่างประเทศ
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400">GMP Cosmetic Certified</p>
              </button>

              {/* Sub-node 1 (Top Left in PDF): การจดแจ้งกับกลุ่มควบคุมเครื่องสำอาง */}
              <button
                onClick={() => setActiveNode("fdaCheck")}
                className={`w-full mt-2.5 sm:mt-3 lg:mt-4 p-3 sm:p-3.5 lg:p-4 rounded-xl text-left transition-all cursor-pointer ${
                  activeNode === "fdaCheck"
                    ? "bg-white/15 border-white border"
                    : "bg-black/40 border border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                  <ClipboardCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-semibold text-white line-clamp-1">
                    การจดแจ้ง อย.
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-zinc-400 pl-5 sm:pl-6">(ตรวจสอบส่วนผสม)</p>
              </button>

              {/* Sub-node 2 (Bottom Left in PDF): ยื่นแบบฟอร์ม F-I10-1 */}
              <button
                onClick={() => setActiveNode("f101")}
                className={`w-full mt-2 sm:mt-2.5 lg:mt-3 p-3 sm:p-3.5 lg:p-4 rounded-xl text-left transition-all cursor-pointer ${
                  activeNode === "f101"
                    ? "bg-white/15 border-white border"
                    : "bg-black/40 border border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-300 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-semibold text-white line-clamp-1">
                    ยื่นแบบฟอร์ม F-I10-1
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-zinc-400 pl-5 sm:pl-6">Cosmetic Grade</p>
              </button>
            </div>

            {/* 2. Center Node: ศูนย์กลางโลจิสติกส์ NOIRE (Shield) */}
            <div className="md:col-span-6 flex flex-col items-center justify-center text-center my-4 md:my-0">
              <button
                onClick={() => setActiveNode("hub")}
                className={`relative w-full sm:w-auto p-5 sm:p-6 lg:p-8 rounded-3xl transition-all cursor-pointer group flex flex-col items-center ${
                  activeNode === "hub"
                    ? "bg-white/[0.08] border-2 border-white shadow-chrome-glow-lg"
                    : "bg-black/60 border border-white/20 hover:border-white/40"
                }`}
              >
                {/* Glowing Aura */}
                <div className="absolute inset-0 bg-radial-spotlight opacity-75 pointer-events-none" />

                <div className="relative z-10 transform transition-transform duration-500 group-hover:scale-105">
                  <CentralLogisticsShield className="w-24 h-28 sm:w-28 sm:h-32 lg:w-36 lg:h-40" />
                </div>

                <div className="relative z-10 mt-2 sm:mt-3 lg:mt-4">
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    CENTRAL COMPLIANCE GATEWAY
                  </span>
                  <p className="text-[11px] sm:text-xs text-zinc-300 mt-1.5 max-w-xs mx-auto">
                    ประสานงานด่านอาหารและยา และศุลกากรแบบเบ็ดเสร็จ
                  </p>
                </div>
              </button>
            </div>

            {/* 3. Right Node: ร้านค้าปลีกในไทย */}
            <div className="md:col-span-3 flex flex-col items-center text-center">
              <button
                onClick={() => setActiveNode("retailer")}
                className={`w-full p-4 sm:p-5 lg:p-6 rounded-2xl transition-all cursor-pointer ${
                  activeNode === "retailer"
                    ? "bg-white/15 border-2 border-white shadow-chrome-glow"
                    : "bg-black/50 border border-white/10 hover:border-white/30"
                }`}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-white/10 mx-auto flex items-center justify-center mb-2">
                  <Store className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-0.5">
                  ร้านค้าปลีกในไทย
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400">พร้อมจำหน่าย ถูกต้องตามกฎหมาย</p>
              </button>

              {/* Sub-node 3 (Top Right in PDF): การยื่นขอ LPI */}
              <button
                onClick={() => setActiveNode("lpi")}
                className={`w-full mt-2.5 sm:mt-3 lg:mt-4 p-3 sm:p-3.5 lg:p-4 rounded-xl text-left transition-all cursor-pointer ${
                  activeNode === "lpi"
                    ? "bg-white/15 border-white border"
                    : "bg-black/40 border border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                  <FileCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-semibold text-white line-clamp-1">
                    การยื่นขอ LPI
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-zinc-400 pl-5 sm:pl-6">ทุกชิปเมนต์</p>
              </button>

              {/* Sub-node 4 (Bottom Right in PDF): เคลียร์พิธีการด่านศุลกากร */}
              <button
                onClick={() => setActiveNode("customsClearance")}
                className={`w-full mt-2 sm:mt-2.5 lg:mt-3 p-3 sm:p-3.5 lg:p-4 rounded-xl text-left transition-all cursor-pointer ${
                  activeNode === "customsClearance"
                    ? "bg-white/15 border-white border"
                    : "bg-black/40 border border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                  <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-300 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-semibold text-white line-clamp-1">
                    เคลียร์พิธีการด่านศุลกากร
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-zinc-400 pl-5 sm:pl-6">
                  และด่านอาหารและยา
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Selected Node Details Drawer */}
        {activeNode && (
          <motion.div
            key={activeNode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-black/60 border border-white/15 max-w-4xl mx-auto flex items-start gap-4"
          >
            <div className="p-2.5 rounded-xl bg-white/10 text-white shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  {nodes[activeNode].tag}
                </span>
                <h4 className="text-base font-bold text-white">
                  {nodes[activeNode].title}
                </h4>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {nodes[activeNode].fullDetail}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
