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
  Building2,
} from "lucide-react";
import { PartnerItem, DEFAULT_PARTNERS } from "@/lib/googleSheets";

interface PartnerDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnerDirectoryModal({ isOpen, onClose }: PartnerDirectoryModalProps) {
  const [partners, setPartners] = useState<PartnerItem[]>(DEFAULT_PARTNERS);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sheetUrl, setSheetUrl] = useState("");
  const [connectedSource, setConnectedSource] = useState<"default" | "google_sheet">("default");

  const loadPartners = async (customUrl?: string) => {
    setIsLoading(true);
    try {
      const endpoint = customUrl
        ? `/api/partners?sheetUrl=${encodeURIComponent(customUrl)}`
        : `/api/partners`;
      const res = await fetch(endpoint);
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        setPartners(json.data);
        setConnectedSource(json.source === "google_sheet" ? "google_sheet" : "default");
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
      loadPartners(sheetUrl.trim());
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
          className="relative z-10 w-full max-w-3xl bg-[#09090c] border border-white/20 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/50 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                <Database className="w-3 h-3" />
                <span>
                  {connectedSource === "google_sheet"
                    ? "LIVE GOOGLE SHEET DB CONNECTED"
                    : "NOIRE OFFICIAL PARTNER DIRECTORY"}
                </span>
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              พันธมิตรธุรกิจและเว็บไซต์พาร์ทเนอร์
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
              เลือกดูข้อมูลและเข้าชมเว็บไซต์พาร์ทเนอร์อย่างเป็นทางการของ NOIRE Luxury Cosmetics Hub
            </p>
          </div>

          {/* Partner Cards (2 Main Websites) */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-6">
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center text-zinc-400">
                <RefreshCw className="w-6 h-6 animate-spin text-white mb-2" />
                <span className="text-xs">กำลังโหลดข้อมูลพาร์ทเนอร์จากฐานข้อมูล...</span>
              </div>
            ) : (
              partners.slice(0, 2).map((partner, idx) => (
                <div
                  key={partner.id}
                  className="card-glass rounded-2xl p-5 sm:p-6 border border-white/15 hover:border-white/30 transition-all group flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-radial-spotlight opacity-40 group-hover:opacity-70 transition-opacity pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white font-display text-xs font-bold">
                          {idx + 1}
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

                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1 font-mono">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{partner.statusBadge}</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-4">
                      {partner.description}
                    </p>
                  </div>

                  {/* Action Direct Button to Partner Website */}
                  <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-500 font-mono truncate max-w-[200px] sm:max-w-xs">
                      {partner.websiteUrl}
                    </span>

                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-chrome light-sweep px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-chrome-glow hover:scale-[1.02] transition-transform cursor-pointer shrink-0"
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
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>รองรับการเชื่อมต่อ Google Sheets เป็น Database</span>
              </div>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Settings className="w-3 h-3" />
                <span>{showSettings ? "ซ่อนการตั้งค่า" : "ตั้งค่า Google Sheets"}</span>
              </button>
            </div>

            {/* Collapsible Google Sheets Configuration Drawer */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl bg-black/70 border border-white/15 space-y-3"
                >
                  <p className="text-[11px] text-zinc-300 leading-relaxed font-light">
                    💡 <strong>วิธีใช้ Google Sheet เป็น Database:</strong> สร้าง Google Sheet แล้วกด
                    <em> ไฟล์ &gt; แชร์ &gt; เผยแพร่ไปยังเว็บ (Publish to web) เป็น CSV</em> หรือใส่ Link ของ Google Sheet แล้วกดอัปเดต
                  </p>

                  <form onSubmit={handleUpdateSheetUrl} className="flex gap-2">
                    <input
                      type="url"
                      placeholder="วาง URL ของ Google Sheet หรือ Google Sheet ID..."
                      value={sheetUrl}
                      onChange={(e) => setSheetUrl(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-black/80 border border-white/15 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-chrome px-4 py-2 rounded-lg text-xs font-medium shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? "กำลังดึงข้อมูล..." : "อัปเดตสด"}
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
