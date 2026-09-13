"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  ShieldCheck,
  Globe,
  Database,
  RefreshCw,
  Sparkles,
  Settings,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Copy,
  Check,
} from "lucide-react";
import {
  PartnerItem,
  DEFAULT_PARTNERS,
  DEFAULT_GOOGLE_SHEET_URL,
} from "@/lib/googleSheets";

interface PartnerDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnerDirectoryModal({ isOpen, onClose }: PartnerDirectoryModalProps) {
  const [partners, setPartners] = useState<PartnerItem[]>(DEFAULT_PARTNERS);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sheetUrl, setSheetUrl] = useState(DEFAULT_GOOGLE_SHEET_URL);
  const [activeSheetUrl, setActiveSheetUrl] = useState(DEFAULT_GOOGLE_SHEET_URL);
  const [hasCustomRows, setHasCustomRows] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const loadPartners = async (customUrl?: string) => {
    setIsLoading(true);
    try {
      const urlToUse = customUrl || activeSheetUrl;
      const endpoint = `/api/partners?sheetUrl=${encodeURIComponent(urlToUse)}`;
      const res = await fetch(endpoint);
      const json = await res.json();

      if (json.success && json.data && json.data.length > 0) {
        setPartners(json.data);
        setHasCustomRows(Boolean(json.hasCustomRows));
        setStatusMessage(json.message || "");
        if (json.sheetUrl) {
          setActiveSheetUrl(json.sheetUrl);
        }
      }
    } catch (err) {
      console.error("Failed to load partners:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadPartners();
    }
  }, [isOpen]);

  const handleUpdateSheetUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (sheetUrl.trim()) {
      setActiveSheetUrl(sheetUrl.trim());
      loadPartners(sheetUrl.trim());
    }
  };

  const handleCopyTemplate = () => {
    const template =
      "ชื่อ\tเว็บไซต์\tหมวดหมู่\tรายละเอียด\tสถานะ\tประเภท\nNOIRE Global Logistics\thttps://porta.fda.moph.go.th/\tLogistics & Import Gateway\tเครือข่ายโลจิสติกส์และการนำเข้าเครื่องสำอางระดับสากล\tVerified Official Partner\tLogistics & Compliance\nCouture Cosmetics Retail Alliance\thttps://pertento.fda.moph.go.th/FDA_SEARCH_CENTER/PRODUCT/FRM_SEARCH_CMT.aspx\tPremier Retail & Clinic Distribution\tศูนย์รวมร้านค้าปลีก เคาน์เตอร์แบรนด์ และคลินิกความงามชั้นนำ\tAuthorized Distributor\tB2B Retail Platform";
    navigator.clipboard.writeText(template);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-3xl bg-[#09090c] border border-white/20 rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-black/50 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-5 pr-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                <Database className="w-3 h-3" />
                <span>GOOGLE SHEETS DB CONNECTED</span>
              </span>

              {hasCustomRows ? (
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-700/40 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>ข้อมูลสดจาก Google Sheet ของคุณ</span>
                </span>
              ) : (
                <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-700/40 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-amber-400" />
                  <span>กำลังรอข้อมูลจาก Sheet (แสดงตัวอย่าง 2 เว็บไซต์)</span>
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              พันธมิตรธุรกิจและเว็บไซต์พาร์ทเนอร์
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
              เชื่อมต่อกับฐานข้อมูล Google Sheets ของคุณแบบเรียลไทม์ สามารถคลิกเพื่อเข้าชมเว็บไซต์พาร์ทเนอร์ได้ทันที
            </p>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-white/10">
              <a
                href={activeSheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>เปิดแก้ไขใน Google Sheet</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => loadPartners()}
                disabled={isLoading}
                className="text-[11px] font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                <span>{isLoading ? "กำลังดึงข้อมูล..." : "รีเฟรชข้อมูลล่าสุด"}</span>
              </button>
            </div>
          </div>

          {/* Partner Cards Container */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center text-zinc-400">
                <RefreshCw className="w-7 h-7 animate-spin text-white mb-3" />
                <span className="text-xs font-mono">กำลังเชื่อมต่อและดึงข้อมูลจาก Google Sheets...</span>
              </div>
            ) : (
              partners.map((partner, idx) => (
                <div
                  key={partner.id || idx}
                  className="card-glass rounded-2xl p-4 sm:p-6 border border-white/15 hover:border-white/30 transition-all group flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-radial-spotlight opacity-40 group-hover:opacity-70 transition-opacity pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white font-display text-xs font-bold shrink-0">
                          0{idx + 1}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                            {partner.category}
                          </span>
                          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-zinc-100 transition-colors">
                            {partner.name}
                          </h4>
                        </div>
                      </div>

                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1 font-mono shrink-0">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{partner.statusBadge}</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-4">
                      {partner.description}
                    </p>
                  </div>

                  {/* Action Direct Button to Partner Website */}
                  <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[11px] text-zinc-500 font-mono truncate max-w-full sm:max-w-xs">
                      {partner.websiteUrl}
                    </span>

                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-chrome light-sweep px-4 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 shadow-chrome-glow hover:scale-[1.02] transition-transform cursor-pointer shrink-0"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>ไปยังเว็บไซต์พาร์ทเนอร์ที่ {idx + 1}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Google Sheets Database Config Toggle */}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">
                  Sheet ID: <strong className="text-zinc-200">1Ovfyx_npnC3COwX7TkLpBJ2OPc56kTqPUH9Bipn2qDY</strong>
                </span>
              </div>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors shrink-0 ml-2"
              >
                <Settings className="w-3 h-3" />
                <span>{showSettings ? "ซ่อนการตั้งค่า" : "จัดการ Google Sheet"}</span>
              </button>
            </div>

            {/* Collapsible Google Sheets Configuration Drawer */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-2xl bg-black/80 border border-white/15 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                      <span>วิธีนำเข้าข้อมูลพาร์ทเนอร์ใน Google Sheet</span>
                    </span>

                    <button
                      onClick={handleCopyTemplate}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md flex items-center gap-1 cursor-pointer"
                    >
                      {copiedTemplate ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>คัดลอกตัวอย่างแล้ว!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>คัดลอกตารางตัวอย่าง</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-300 leading-relaxed font-light">
                    เพียงเปิด Google Sheet แล้วพิมพ์หัวตารางในแถวที่ 1 (รองรับภาษาไทยหรืออังกฤษ):
                    <br />
                    <code className="text-emerald-300 bg-black px-1.5 py-0.5 rounded text-[10px] font-mono mt-1 inline-block">
                      ชื่อ | เว็บไซต์ | หมวดหมู่ | รายละเอียด | สถานะ | ประเภท
                    </code>
                  </p>

                  <form onSubmit={handleUpdateSheetUrl} className="flex gap-2 pt-1">
                    <input
                      type="url"
                      placeholder="URL ของ Google Sheet หรือ Google Sheet ID..."
                      value={sheetUrl}
                      onChange={(e) => setSheetUrl(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-black/90 border border-white/15 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-chrome px-4 py-2 rounded-lg text-xs font-medium shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? "กำลังโหลด..." : "บันทึกและซิงค์"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
