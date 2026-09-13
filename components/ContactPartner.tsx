"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Mail,
  ShieldCheck,
  Search,
  ArrowUpRight,
  Copy,
  Check,
  Sparkles,
  Globe,
  Edit3,
} from "lucide-react";
import ChromeRibbonOrnament from "./visuals/ChromeRibbonOrnament";

import FdaVerificationTool from "./FdaVerificationTool";
import PartnerCard169 from "./PartnerCard169";
import { PartnerItem, DEFAULT_PARTNERS } from "@/lib/googleSheets";

export default function ContactPartner({
  onOpenPartnerModal,
  onOpenPartnerDirectoryModal,
}: {
  onOpenPartnerModal: () => void;
  onOpenPartnerDirectoryModal?: (tab?: "view" | "edit") => void;
}) {
  const [copied, setCopied] = useState(false);
  const [partners, setPartners] = useState<PartnerItem[]>(DEFAULT_PARTNERS);
  const email = "wholesale@noire-cosmetics.com";

  useEffect(() => {
    const loadData = () => {
      const cached =
        typeof window !== "undefined"
          ? localStorage.getItem("noire_custom_partners")
          : null;
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPartners(parsed);
            return;
          }
        } catch {
          // ignore
        }
      }

      fetch("/api/partners")
        .then((r) => r.json())
        .then((json) => {
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setPartners(json.data);
          }
        })
        .catch(() => {});
    };

    loadData();

    if (typeof window !== "undefined") {
      window.addEventListener("noire_partners_updated", loadData);
      return () => window.removeEventListener("noire_partners_updated", loadData);
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050507] overflow-hidden">
      {/* Background Ribbon */}
      <ChromeRibbonOrnament variant="horizontal" className="top-12 inset-x-0 h-96 opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-400 mb-4 tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>Official Gateways</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            ตรวจสอบและเชื่อมต่อ
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            เชื่อมต่อกับ NOIRE โดยตรงเพื่อการตรวจสอบข้อมูลทางกฎหมาย หรือเริ่มต้นความร่วมมือทางธุรกิจ
          </p>
        </div>

        {/* Interactive Live FDA Inspection Tool */}
        <div className="max-w-5xl mx-auto mb-10">
          <FdaVerificationTool />
        </div>

        {/* 2 Main Portals from PDF */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Portal 1: THFDA Verification System */}
          <div className="card-glass rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-white/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-radial-spotlight opacity-40 group-hover:opacity-60 transition-opacity" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase bg-white/5 px-2.5 py-1 rounded border border-white/10">
                THFDA OFFICIAL DATABASE
              </span>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide mt-3 mb-3">
                ตรวจสอบความถูกต้องของผลิตภัณฑ์
              </h3>

              <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
                ตรวจสอบความถูกต้องของผลิตภัณฑ์ของเราโดยตรงกับสำนักงานคณะกรรมการอาหารและยา
                ผ่านระบบฐานข้อมูลสืบค้นสารบบเครื่องสำอางอย่างเป็นทางการ
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10">
              <a
                href="https://pertento.fda.moph.go.th/FDA_SEARCH_CENTER/PRODUCT/FRM_SEARCH_CMT.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass w-full py-3.5 px-4 rounded-full text-xs font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>ระบบค้นหาข้อมูลผลิตภัณฑ์ (CmtSearchFontendnew)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Portal 2: Business Partner Contact */}
          <div id="partner" className="card-glass rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-white/20 shadow-2xl relative overflow-hidden group scroll-mt-28">
            <div className="absolute inset-0 bg-radial-spotlight opacity-40 group-hover:opacity-60 transition-opacity" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6">
                <Mail className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase bg-white/5 px-2.5 py-1 rounded border border-white/10">
                B2B DIRECT INQUIRY
              </span>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide mt-3 mb-3">
                ติดต่อพาร์ทเนอร์ธุรกิจ
              </h3>

              <p className="text-sm text-zinc-300 font-light leading-relaxed mb-4">
                สำหรับร้านค้า คลินิกความงาม และตัวแทนจำหน่ายที่ต้องการสั่งซื้อราคาส่ง
                หรือเปิดสัญญานำเข้าพรีออเดอร์
              </p>

              {/* Email Chip with Copy Action */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-black/50 border border-white/10 mb-6">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-zinc-200 truncate">
                    {email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="คัดลอกอีเมล"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={onOpenPartnerModal}
                className="btn-chrome light-sweep w-full py-3.5 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-chrome-glow"
              >
                <span>ร่วมเป็นพาร์ทเนอร์กับ NOIRE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {onOpenPartnerDirectoryModal && (
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => onOpenPartnerDirectoryModal("view")}
                    className="btn-glass w-full py-2.5 px-4 rounded-full text-xs font-medium flex items-center justify-center gap-2 cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-zinc-300" />
                    <span>เข้าชมเว็บไซต์พันธมิตรทางการ (2 เว็บไซต์)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </button>

                  <button
                    onClick={() => onOpenPartnerDirectoryModal("edit")}
                    className="text-[11px] text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 py-1 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3 text-zinc-400" />
                    <span>ปรับแต่งข้อมูลพาร์ทเนอร์บนเว็บ (Custom Editor)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Business Partners 16:9 Showcase Section */}
        <div id="partner-showcase" className="mt-16 sm:mt-20 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-zinc-400 mb-2 font-mono uppercase tracking-wider">
                <Globe className="w-3 h-3 text-zinc-300" />
                <span>Official Partner Websites</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-display">
                พาร์ทเนอร์ธุรกิจ
              </h3>
            </div>

            {onOpenPartnerDirectoryModal && (
              <button
                onClick={() => onOpenPartnerDirectoryModal("edit")}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>ปรับแต่งข้อมูลพาร์ทเนอร์</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {partners.slice(0, 2).map((partner, idx) => (
              <PartnerCard169
                key={partner.id || idx}
                partner={partner}
                index={idx}
                isActive={idx === 0}
                onEdit={() => onOpenPartnerDirectoryModal?.("edit")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
