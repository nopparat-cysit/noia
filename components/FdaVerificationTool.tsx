"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  FileCheck,
  Building,
  Award,
  Sparkles,
} from "lucide-react";

interface RegisteredRecord {
  fdaNumber: string;
  thaiName: string;
  engName: string;
  category: string;
  status: string;
  importer: string;
  manufacturerCountry: string;
  gmpStatus: string;
  lpiStatus: string;
  approvalYear: string;
}

const REGISTERED_RECORDS: Record<string, RegisteredRecord> = {
  "10-2-6600018492": {
    fdaNumber: "10-2-6600018492",
    thaiName: "นัวร์ ลูมินัส ซิลค์ ฟาวน์เดชั่น",
    engName: "NOIRE Luminous Silk Foundation",
    category: "เครื่องสำอางควบคุมสำหรับผิวหน้า (Liquid Foundation)",
    status: "อนุมัติแล้ว (Active / Approved)",
    importer: "บริษัท นัวร์ ลักชัวรี คอสเมติกส์ ฮับ จำกัด",
    manufacturerCountry: "สาธารณรัฐฝรั่งเศส (France)",
    gmpStatus: "ผ่านการรับรอง GMP Cosmetic (THFDA Data Catalog)",
    lpiStatus: "ออกใบอนุญาตรายชิปเมนต์ (LPI Approved)",
    approvalYear: "พ.ศ. 2566 (ต่ออายุตามระเบียบ พ.ศ. 2565)",
  },
  "10-2-6600021309": {
    fdaNumber: "10-2-6600021309",
    thaiName: "นัวร์ ลูมินัส ซิลค์ ลิป คัลเลอร์",
    engName: "NOIRE Luminous Silk Lip Color",
    category: "ผลิตภัณฑ์แต่งแต้มริมฝีปาก (Lipstick / Lip Satin)",
    status: "อนุมัติแล้ว (Active / Approved)",
    importer: "บริษัท นัวร์ ลักชัวรี คอสเมติกส์ ฮับ จำกัด",
    manufacturerCountry: "สาธารณรัฐอิตาลี (Italy)",
    gmpStatus: "ผ่านการรับรอง GMP Cosmetic สากล",
    lpiStatus: "ออกใบอนุญาตรายชิปเมนต์ (LPI Approved)",
    approvalYear: "พ.ศ. 2566",
  },
  "10-2-6600028741": {
    fdaNumber: "10-2-6600028741",
    thaiName: "นัวร์ ลูมินัส ซิลค์ อายแชโดว์ พาเลตต์",
    engName: "NOIRE Luminous Silk Eyeshadow Palette",
    category: "ผลิตภัณฑ์ตกแต่งรอบดวงตา (Eyeshadow Couture)",
    status: "อนุมัติแล้ว (Active / Approved)",
    importer: "บริษัท นัวร์ ลักชัวรี คอสเมติกส์ ฮับ จำกัด",
    manufacturerCountry: "ประเทศญี่ปุ่น (Japan)",
    gmpStatus: "ผ่านการรับรอง GMP Cosmetic สากล",
    lpiStatus: "ออกใบอนุญาตรายชิปเมนต์ (LPI Approved)",
    approvalYear: "พ.ศ. 2566",
  },
  "10-2-6600030514": {
    fdaNumber: "10-2-6600030514",
    thaiName: "นัวร์ ลูมินัส ซิลค์ คอมแพ็ค พาวเดอร์",
    engName: "NOIRE Luminous Silk Compact Powder",
    category: "แป้งอัดแข็งควบคุมความมัน (Face Powder)",
    status: "อนุมัติแล้ว (Active / Approved)",
    importer: "บริษัท นัวร์ ลักชัวรี คอสเมติกส์ ฮับ จำกัด",
    manufacturerCountry: "สาธารณรัฐเกาหลี (South Korea)",
    gmpStatus: "ผ่านการรับรอง GMP Cosmetic สากล",
    lpiStatus: "ออกใบอนุญาตรายชิปเมนต์ (LPI Approved)",
    approvalYear: "พ.ศ. 2566",
  },
  "10-2-6600041285": {
    fdaNumber: "10-2-6600041285",
    thaiName: "นัวร์ เซลลูลาร์ เรเดียนซ์ เซรั่ม อีลิกเซอร์",
    engName: "NOIRE Cellular Radiance Serum Elixir",
    category: "ผลิตภัณฑ์บำรุงผิวหน้าเข้มข้น (Skincare Serum)",
    status: "อนุมัติแล้ว (Active / Approved)",
    importer: "บริษัท นัวร์ ลักชัวรี คอสเมติกส์ ฮับ จำกัด",
    manufacturerCountry: "สมาพันธรัฐสวิส (Switzerland)",
    gmpStatus: "ผ่านการรับรอง GMP Cosmetic สากล",
    lpiStatus: "ออกใบอนุญาตรายชิปเมนต์ (LPI Approved)",
    approvalYear: "พ.ศ. 2566",
  },
};

export default function FdaVerificationTool() {
  const [searchQuery, setSearchQuery] = useState("10-2-6600018492");
  const [selectedRecord, setSelectedRecord] = useState<RegisteredRecord>(
    REGISTERED_RECORDS["10-2-6600018492"]
  );

  const handleSelectPreset = (fdaNo: string) => {
    setSearchQuery(fdaNo);
    if (REGISTERED_RECORDS[fdaNo]) {
      setSelectedRecord(REGISTERED_RECORDS[fdaNo]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = searchQuery.trim();
    if (REGISTERED_RECORDS[cleanQuery]) {
      setSelectedRecord(REGISTERED_RECORDS[cleanQuery]);
    } else {
      // Find matching item or default
      const found = Object.values(REGISTERED_RECORDS).find(
        (r) =>
          r.fdaNumber.includes(cleanQuery) ||
          r.engName.toLowerCase().includes(cleanQuery.toLowerCase()) ||
          r.thaiName.includes(cleanQuery)
      );
      if (found) {
        setSelectedRecord(found);
      }
    }
  };

  return (
    <div className="card-glass rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl relative overflow-hidden my-8">
      {/* Background radial spotlight */}
      <div className="absolute inset-0 bg-radial-spotlight opacity-40 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs mb-1 font-mono uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>Real-time Compliance Verification Engine</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              เครื่องมือจำลองตรวจสอบเลขจดแจ้ง อย. (อย. 100%)
            </h3>
          </div>

          <a
            href="https://pertento.fda.moph.go.th/FDA_SEARCH_CENTER/PRODUCT/FRM_SEARCH_CMT.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass px-4 py-2 rounded-full text-xs flex items-center gap-1.5 hover:bg-white/15 w-fit"
          >
            <span>ฐานข้อมูลทางการ อย. (CmtSearchFontendnew)</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>
        </div>

        {/* Interactive Search & Quick Preset Badges */}
        <div className="space-y-3 mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ระบุเลขที่จดแจ้ง เช่น 10-2-6600018492 หรือชื่อสินค้า..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <button
              type="submit"
              className="btn-chrome light-sweep px-5 py-2.5 rounded-xl text-xs font-medium shrink-0 cursor-pointer"
            >
              ตรวจสอบ
            </button>
          </form>

          {/* Quick Select Presets */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] text-zinc-400 shrink-0 font-light">ตัวอย่างสินค้า:</span>
            {Object.keys(REGISTERED_RECORDS).map((no) => (
              <button
                key={no}
                onClick={() => handleSelectPreset(no)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-colors cursor-pointer ${
                  searchQuery === no
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "bg-white/5 text-zinc-400 hover:text-white border border-white/5"
                }`}
              >
                {no}
              </button>
            ))}
          </div>
        </div>

        {/* Live Inspection Result Plaque */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRecord.fdaNumber}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-5 sm:p-7 rounded-2xl bg-black/70 border border-emerald-500/30 relative overflow-hidden"
          >
            {/* Status Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-emerald-300">
                  {selectedRecord.status}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-xs font-mono text-white">
                  เลขที่จดแจ้ง: {selectedRecord.fdaNumber}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ตรวจสอบข้อมูลถูกต้อง 100%</span>
              </div>
            </div>

            {/* Plaque Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-zinc-500 text-[11px] block">ชื่อเครื่องสำอาง (ภาษาไทย):</span>
                <p className="font-medium text-white">{selectedRecord.thaiName}</p>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-500 text-[11px] block">ชื่อเครื่องสำอาง (ภาษาอังกฤษ):</span>
                <p className="font-medium text-white font-serif tracking-wide">{selectedRecord.engName}</p>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-500 text-[11px] block">ประเภทการจดแจ้ง:</span>
                <p className="text-zinc-300">{selectedRecord.category}</p>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-500 text-[11px] block">ผู้รับอนุญาตนำเข้า:</span>
                <p className="text-zinc-300">{selectedRecord.importer}</p>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-500 text-[11px] block">แหล่งผลิตต้นทาง:</span>
                <p className="text-zinc-300">{selectedRecord.manufacturerCountry}</p>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-500 text-[11px] block">สถานะการตรวจปล่อยศุลกากร / LPI:</span>
                <p className="text-emerald-400 font-medium">{selectedRecord.lpiStatus}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
              <span>{selectedRecord.gmpStatus}</span>
              <span className="font-mono text-zinc-500">{selectedRecord.approvalYear}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
