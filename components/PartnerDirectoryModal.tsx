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
  AlertTriangle,
  FileSpreadsheet,
  Copy,
  Check,
  Edit3,
  Save,
  Plus,
  Trash2,
  Eye,
  Undo2,
  Link2,
  Upload,
  Image as ImageIcon,
  Lock,
} from "lucide-react";
import {
  PartnerItem,
  DEFAULT_PARTNERS,
  DEFAULT_GOOGLE_SHEET_URL,
  DEFAULT_APPS_SCRIPT_URL,
} from "@/lib/googleSheets";
import PartnerCard169 from "@/components/PartnerCard169";

interface PartnerDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "view" | "edit";
}

export default function PartnerDirectoryModal({
  isOpen,
  onClose,
  initialTab = "view",
}: PartnerDirectoryModalProps) {
  const [activeTab, setActiveTab] = useState<"view" | "edit">(initialTab);
  const [partners, setPartners] = useState<PartnerItem[]>(DEFAULT_PARTNERS);
  const [editingPartners, setEditingPartners] = useState<PartnerItem[]>(
    JSON.parse(JSON.stringify(DEFAULT_PARTNERS))
  );
  const [selectedPartnerIndex, setSelectedPartnerIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [dataSource, setDataSource] = useState<"web_custom" | "google_sheet" | "default_database">("web_custom");

  const [showSettings, setShowSettings] = useState(false);
  const [sheetUrl, setSheetUrl] = useState(DEFAULT_GOOGLE_SHEET_URL);
  const [activeSheetUrl, setActiveSheetUrl] = useState(DEFAULT_GOOGLE_SHEET_URL);
  const [appsScriptUrl, setAppsScriptUrl] = useState(DEFAULT_APPS_SCRIPT_URL);
  const [sheetSyncStatus, setSheetSyncStatus] = useState<string | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedScriptCode, setCopiedScriptCode] = useState(false);
  const [hasCustomRows, setHasCustomRows] = useState(false);

  // Load partners from API (handles custom file, Google Sheet, or defaults)
  const loadPartners = async (customSheetUrl?: string, forceSource?: "sheet" | "custom") => {
    setIsLoading(true);
    try {
      const urlToUse = customSheetUrl || activeSheetUrl;
      const params = new URLSearchParams();
      if (urlToUse) params.set("sheetUrl", urlToUse);
      if (forceSource) params.set("source", forceSource);

      const res = await fetch(`/api/partners?${params.toString()}`);
      const json = await res.json();

      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        // If forceSource is NOT explicitly "sheet", protect locally saved custom edits
        const cached = typeof window !== "undefined" ? localStorage.getItem("noire_custom_partners") : null;
        if (cached && forceSource !== "sheet") {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setPartners(parsed);
              setEditingPartners(JSON.parse(JSON.stringify(parsed)));
              setDataSource("web_custom");
              setHasCustomRows(true);
              if (json.sheetUrl) setActiveSheetUrl(json.sheetUrl);
              return;
            }
          } catch {
            // ignore parse error
          }
        }

        // If forceSource === "sheet", user deliberately refreshed from Google Sheet
        if (forceSource === "sheet") {
          localStorage.setItem("noire_custom_partners", JSON.stringify(json.data));
        }

        setPartners(json.data);
        setEditingPartners(JSON.parse(JSON.stringify(json.data)));
        setDataSource(json.source || "web_custom");
        setHasCustomRows(Boolean(json.hasCustomRows));
        if (json.sheetUrl) setActiveSheetUrl(json.sheetUrl);
      }
    } catch (err) {
      console.error("Failed to load partners:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Check localStorage first for instant client cache
      const cached = localStorage.getItem("noire_custom_partners");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPartners(parsed);
            setEditingPartners(JSON.parse(JSON.stringify(parsed)));
            setDataSource("web_custom");
          }
        } catch {
          // ignore
        }
      }

      const storedScriptUrl = localStorage.getItem("noire_apps_script_url") || "";
      if (storedScriptUrl) {
        setAppsScriptUrl(storedScriptUrl);
      }

      loadPartners();
    }
  }, [isOpen]);

  // Handle editing single partner field
  const handleFieldChange = (field: keyof PartnerItem, value: string) => {
    setEditingPartners((prev) => {
      const updated = [...prev];
      if (updated[selectedPartnerIndex]) {
        updated[selectedPartnerIndex] = {
          ...updated[selectedPartnerIndex],
          [field]: value,
        };
      }
      return updated;
    });
  };

  // Compress image client-side to ensure it works on Vercel & serverless without EROFS
  const compressClientImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_SIZE = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL("image/webp", 0.85);
          resolve(dataUrl);
        };
        img.onerror = reject;
        img.src = readerEvent.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Upload image: processes client-side first, then syncs to server
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // 1. Instant client-side compression (guarantees zero EROFS error on Vercel)
      try {
        const dataUrl = await compressClientImage(file);
        handleFieldChange("imageUrl", dataUrl);
        handleFieldChange("logoUrl", dataUrl);
      } catch (cErr) {
        console.warn("Client-side compression fallback:", cErr);
      }

      // 2. Also attempt upload to API
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      if (json.success && json.url) {
        handleFieldChange("imageUrl", json.url);
        handleFieldChange("logoUrl", json.url);
      }
    } catch (err) {
      console.error("Upload handler caught error:", err);
      // Client image is already active, so do not block the user with alerts
    } finally {
      setIsUploading(false);
    }
  };

  // Save changes to Server and LocalStorage
  const handleSaveCustom = async () => {
    setIsSaving(true);
    setSheetSyncStatus(null);
    try {
      // 1. Save to LocalStorage for instant browser persistence
      localStorage.setItem("noire_custom_partners", JSON.stringify(editingPartners));
      localStorage.setItem("noire_custom_partners_time", Date.now().toString());
      if (appsScriptUrl.trim()) {
        localStorage.setItem("noire_apps_script_url", appsScriptUrl.trim());
      }

      // 2. Persist to Server via API (and forward to Google Apps Script if URL provided)
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partners: editingPartners,
          appsScriptUrl: appsScriptUrl.trim() || undefined,
        }),
      });
      const json = await res.json();

      if (json.success) {
        setPartners(editingPartners);
        setDataSource("web_custom");
        setSaveSuccess(true);
        if (json.sheetSync === "synced_to_google_sheet") {
          setSheetSyncStatus("synced");
        } else if (json.sheetSync === "unauthorized") {
          setSheetSyncStatus("unauthorized");
        } else {
          setSheetSyncStatus("saved_local_only");
        }
        setTimeout(() => setSaveSuccess(false), 5000);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("noire_partners_updated"));
        }
      }
    } catch (err) {
      console.error("Error saving custom partners:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to original defaults
  const handleResetDefaults = () => {
    if (confirm("ต้องการรีเซ็ตข้อมูลพาร์ทเนอร์กลับเป็นค่าเริ่มต้นหรือไม่?")) {
      localStorage.removeItem("noire_custom_partners");
      localStorage.removeItem("noire_custom_partners_time");
      setEditingPartners(JSON.parse(JSON.stringify(DEFAULT_PARTNERS)));
      setPartners(DEFAULT_PARTNERS);
      setSelectedPartnerIndex(0);
      setDataSource("default_database");
    }
  };

  // Add a new partner card
  const handleAddPartner = () => {
    const newIdx = editingPartners.length + 1;
    const newPartner: PartnerItem = {
      id: `partner-${Date.now()}`,
      name: `พาร์ทเนอร์ใหม่ที่ ${newIdx}`,
      category: "Official Partner",
      description: "รายละเอียดพาร์ทเนอร์และช่องทางการจัดจำหน่ายอย่างเป็นทางการ",
      websiteUrl: "https://",
      statusBadge: "Verified Partner",
      partnerType: "Business Partner",
    };
    setEditingPartners([...editingPartners, newPartner]);
    setSelectedPartnerIndex(editingPartners.length);
  };

  // Remove a partner
  const handleRemovePartner = (index: number) => {
    if (editingPartners.length <= 1) {
      alert("ต้องมีพาร์ทเนอร์อย่างน้อย 1 เว็บไซต์ครับ");
      return;
    }
    const updated = editingPartners.filter((_, idx) => idx !== index);
    setEditingPartners(updated);
    if (selectedPartnerIndex >= updated.length) {
      setSelectedPartnerIndex(updated.length - 1);
    }
  };

  const handleCopyTemplate = () => {
    const template =
      "ชื่อ\tเว็บไซต์\tหมวดหมู่\tรายละเอียด\tสถานะ\tประเภท\tรูปภาพ\nNOIRE Global Logistics\thttps://porta.fda.moph.go.th/\tLogistics & Import Gateway\tเครือข่ายโลจิสติกส์และการนำเข้าเครื่องสำอางระดับสากล\tVerified Official Partner\tLogistics & Compliance\t\nCouture Cosmetics Retail Alliance\thttps://pertento.fda.moph.go.th/FDA_SEARCH_CENTER/PRODUCT/FRM_SEARCH_CMT.aspx\tPremier Retail & Clinic Distribution\tศูนย์รวมร้านค้าปลีก เคาน์เตอร์แบรนด์ และคลินิกความงามชั้นนำ\tAuthorized Distributor\tB2B Retail Platform\t";
    navigator.clipboard.writeText(template);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const handleCopyScriptCode = () => {
    const code = `function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById("1Ovfyx_npnC3COwX7TkLpBJ2OPc56kTqPUH9Bipn2qDY");
    var sheet = ss.getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var partners = data.partners || [];

    // ล้างข้อมูลเดิมแถวที่ 2 เป็นต้นไป (คงหัวตารางไว้)
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
    }

    // ถ้ายังไม่มีแถวหัวข้อ ให้สร้างแถวหัวข้อ
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["ชื่อ", "เว็บไซต์", "หมวดหมู่", "รายละเอียด", "สถานะ", "ประเภท", "รูปภาพ"]);
    }

    // เขียนข้อมูลพาร์ทเนอร์ใหม่ทั้งหมด
    partners.forEach(function(p) {
      sheet.appendRow([
        p.name || "",
        p.websiteUrl || "",
        p.category || "",
        p.description || "",
        p.statusBadge || "",
        p.partnerType || "",
        p.imageUrl || p.logoUrl || ""
      ]);
    });

    return ContentService.createTextOutput(JSON.stringify({ status: "success", count: partners.length }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "ok", message: "NOIRE Google Apps Script is active" }))
    .setMimeType(ContentService.MimeType.JSON);
}`;
    navigator.clipboard.writeText(code);
    setCopiedScriptCode(true);
    setTimeout(() => setCopiedScriptCode(false), 2000);
  };

  const currentEdit = editingPartners[selectedPartnerIndex] || editingPartners[0];

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
          className="relative z-10 w-full max-w-4xl bg-[#09090c] border border-white/20 rounded-3xl p-5 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden max-h-[94vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-black/50 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer z-20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Top Header & Navigation Tabs */}
          <div className="mb-4 pr-10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  <Database className="w-3 h-3" />
                  <span>
                    {dataSource === "web_custom"
                      ? "WEB CUSTOM DATABASE ACTIVE"
                      : "GOOGLE SHEETS DB CONNECTED"}
                  </span>
                </span>

                {dataSource === "web_custom" && (
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-700/40">
                    ปรับแต่งโดยคุณบนเว็บ
                  </span>
                )}
              </div>

              {/* Admin Portal Link */}
              <div className="flex items-center gap-1 bg-white/[0.05] p-1 rounded-full border border-white/10 text-xs">
                <a
                  href="/admin"
                  className="px-3 py-1 rounded-full flex items-center gap-1.5 transition-all text-xs text-zinc-400 hover:text-white hover:bg-white/10"
                  title="เข้าสู่ระบบผู้ดูแลเพื่อตั้งค่าและแก้ไขข้อมูล (รหัสผ่าน 12500)"
                >
                  <Lock className="w-3 h-3 text-zinc-400" />
                  <span>ผู้ดูแลระบบ (Admin)</span>
                </a>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              พันธมิตรธุรกิจและเว็บไซต์พาร์ทเนอร์
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light mt-0.5">
              เลือกเข้าชมเว็บไซต์ทางการของพาร์ทเนอร์ NOIRE
            </p>
          </div>

          {/* ======================================================== */}
          {/* TAB 1: VIEW PARTNERS DIRECTORY */}
          {/* ======================================================== */}
          {activeTab === "view" && (
            <div className="flex-1 overflow-y-auto pr-1 mb-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-display">
                  พาร์ทเนอร์ธุรกิจ
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-1">
                  เข้าชมเว็บไซต์พันธมิตรทางการของ NOIRE
                </p>
              </div>

              {isLoading ? (
                <div className="py-16 flex flex-col items-center justify-center text-zinc-400">
                  <RefreshCw className="w-7 h-7 animate-spin text-white mb-3" />
                  <span className="text-xs font-mono">กำลังโหลดข้อมูลพาร์ทเนอร์...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
                  {partners.map((partner, idx) => (
                    <PartnerCard169
                      key={partner.id || idx}
                      partner={partner}
                      index={idx}
                      isActive={idx === 0}
                      showEditButton={false}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: IN-APP CUSTOM PARTNER EDITOR */}
          {/* ======================================================== */}
          {activeTab === "edit" && currentEdit && (
            <div className="flex-1 overflow-y-auto pr-1 mb-4 space-y-4">
              {/* Partner Selectors (Tabs for Partner 1, 2, + Add) */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div className="flex flex-wrap items-center gap-2">
                  {editingPartners.map((item, idx) => (
                    <button
                      key={item.id || idx}
                      onClick={() => setSelectedPartnerIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                        selectedPartnerIndex === idx
                          ? "bg-white text-black font-semibold shadow-md"
                          : "bg-white/5 text-zinc-400 hover:text-white border border-white/10"
                      }`}
                    >
                      <span>พาร์ทเนอร์ {idx + 1}</span>
                      <span className="text-[10px] opacity-75 truncate max-w-[90px]">
                        ({item.name || "ยังไม่มีชื่อ"})
                      </span>
                    </button>
                  ))}

                  <button
                    onClick={handleAddPartner}
                    className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-dashed border-white/20 text-zinc-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>เพิ่มพาร์ทเนอร์</span>
                  </button>
                </div>

                {editingPartners.length > 1 && (
                  <button
                    onClick={() => handleRemovePartner(selectedPartnerIndex)}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>ลบพาร์ทเนอร์ที่ {selectedPartnerIndex + 1}</span>
                  </button>
                )}
              </div>

              {/* Form Grid & Live Card Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Inputs Form */}
                <div className="space-y-3 bg-black/40 p-4 sm:p-5 rounded-2xl border border-white/10">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      ชื่อพาร์ทเนอร์ / บริษัท (Partner Name)
                    </label>
                    <input
                      type="text"
                      value={currentEdit.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      placeholder="เช่น NOIRE Global Logistics หรือ ชื่อร้านค้า"
                      className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/15 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>ลิงก์เว็บไซต์ปลายทาง (Website URL)</span>
                      {currentEdit.websiteUrl && currentEdit.websiteUrl !== "#" && (
                        <a
                          href={currentEdit.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5"
                        >
                          <span>ทดสอบเปิดลิงก์</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </label>
                    <div className="relative">
                      <Link2 className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        type="url"
                        value={currentEdit.websiteUrl}
                        onChange={(e) => handleFieldChange("websiteUrl", e.target.value)}
                        placeholder="https://example.com"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/70 border border-white/15 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                        หมวดหมู่ (Category)
                      </label>
                      <input
                        type="text"
                        value={currentEdit.category}
                        onChange={(e) => handleFieldChange("category", e.target.value)}
                        placeholder="เช่น Official Logistics Gateway"
                        className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/15 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                        ป้ายสถานะ (Status Badge)
                      </label>
                      <input
                        type="text"
                        value={currentEdit.statusBadge}
                        onChange={(e) => handleFieldChange("statusBadge", e.target.value)}
                        placeholder="เช่น Verified Official Partner"
                        className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/15 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      คำอธิบาย / รายละเอียด (Description)
                    </label>
                    <textarea
                      rows={2}
                      value={currentEdit.description}
                      onChange={(e) => handleFieldChange("description", e.target.value)}
                      placeholder="อธิบายข้อมูลของพาร์ทเนอร์เพื่อแสดงบนหน้าเว็บ..."
                      className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/15 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors resize-none"
                    />
                  </div>

                  {/* Image / Logo Upload Section */}
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-zinc-300" />
                        <span>รูปภาพพาร์ทเนอร์ (สัดส่วน 16:9 แนวนอน)</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">16:9 Ratio</span>
                    </label>

                    {currentEdit.imageUrl || currentEdit.logoUrl ? (
                      <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/70 border border-white/15">
                        <div className="relative w-16 h-9 rounded-lg overflow-hidden border border-white/20 bg-black/50 shrink-0 flex items-center justify-center aspect-[16/9]">
                          <img
                            src={currentEdit.imageUrl || currentEdit.logoUrl}
                            alt={currentEdit.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] text-zinc-200 font-mono truncate block">
                            {currentEdit.imageUrl || currentEdit.logoUrl}
                          </span>
                          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>บันทึกรูป 16:9 เรียบร้อย</span>
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            handleFieldChange("imageUrl", "");
                            handleFieldChange("logoUrl", "");
                          }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                          title="ลบรูปภาพ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-dashed border-white/20 hover:border-white/40 bg-black/50 hover:bg-black/80 transition-all cursor-pointer group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                          className="hidden"
                        />
                        {isUploading ? (
                          <div className="flex items-center gap-2 text-xs text-zinc-300">
                            <RefreshCw className="w-4 h-4 animate-spin text-white" />
                            <span>กำลังประมวลผลรูป 16:9...</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1 text-center">
                            <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Upload className="w-3.5 h-3.5 text-zinc-300 group-hover:text-emerald-400 transition-colors" />
                            </div>
                            <span className="text-xs text-zinc-300 font-medium group-hover:text-white">
                              คลิกเพื่อเลือกไฟล์รูปภาพ 16:9
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono">
                              PNG, JPG, WEBP, SVG (แนะนำ 1280x720 หรือ 800x450)
                            </span>
                          </div>
                        )}
                      </label>
                    )}
                  </div>
                </div>

                {/* Live Card Preview */}
                <div className="flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-zinc-300" />
                        <span>ตัวอย่างการแสดงผลสด (Live Preview)</span>
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">Real-time</span>
                    </div>
                    <PartnerCard169
                      partner={currentEdit}
                      index={selectedPartnerIndex}
                      isActive={selectedPartnerIndex === 0}
                      showEditButton={false}
                    />
                  </div>

                  {/* Actions to Save & Reset */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveCustom}
                        disabled={isSaving}
                        className="btn-chrome light-sweep flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-chrome-glow disabled:opacity-50"
                      >
                        {isSaving ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>กำลังบันทึก...</span>
                          </>
                        ) : saveSuccess ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">
                              {sheetSyncStatus === "synced"
                                ? "บันทึกบนเว็บและอัปเดตลง Google Sheet สำเร็จ!"
                                : sheetSyncStatus === "unauthorized"
                                ? "บันทึกบนเว็บแล้ว (รอปรับสิทธิ์ Google Sheet)"
                                : "บันทึกข้อมูลสำเร็จแล้ว!"}
                            </span>
                          </>
                        ) : (
                          <>
                            <Save className="w-3.5 h-3.5" />
                            <span>บันทึกข้อมูลลงบนเว็บ</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleResetDefaults}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        title="รีเซ็ตเป็นค่าเริ่มต้น"
                      >
                        <Undo2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Alert when Google Apps Script is 401 Unauthorized */}
                    {sheetSyncStatus === "unauthorized" && (
                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
                        <div className="font-semibold flex items-center gap-2 text-amber-300">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>บันทึกบนเว็บสำเร็จแล้ว แต่ Google Sheet ปฏิเสธ (401 Unauthorized)</span>
                        </div>
                        <p className="text-[11px] text-zinc-300 leading-relaxed font-light">
                          <strong>สาเหตุ:</strong> สิทธิ์การเข้าถึง Web App ใน Google Apps Script ตั้งไว้เป็น <em>&quot;ฉันเท่านั้น (Only myself)&quot;</em> ทำให้ระบบไม่สามารถส่งข้อมูลไปเขียนใน Sheet ได้
                        </p>
                        <div className="p-2.5 rounded-lg bg-black/60 border border-amber-500/20 text-[11px] text-zinc-300 leading-relaxed space-y-1">
                          <strong className="text-amber-300">วิธีแก้ไขใน 30 วินาที:</strong>
                          <ol className="list-decimal list-inside space-y-0.5 text-[10.5px]">
                            <li>เปิด Google Sheet &gt; เมนู <strong>ส่วนขยาย (Extensions)</strong> &gt; <strong>Apps Script</strong></li>
                            <li>กดปุ่มสีน้ำเงิน <strong>การปรับใช้ (Deploy)</strong> &gt; เลือก <strong>จัดการการปรับใช้ (Manage deployments)</strong></li>
                            <li>กดไอคอน <strong>ดินสอ ✏️</strong> (แก้ไข)</li>
                            <li>ตรง <strong>ผู้มีสิทธิ์เข้าถึง (Who has access)</strong> ให้เปลี่ยนเป็น <span className="text-amber-300 font-semibold">&quot;ทุกคน (Anyone)&quot;</span></li>
                            <li>กด <strong>การปรับใช้ (Deploy)</strong> แล้วกลับมากดบันทึกบนเว็บอีกครั้งได้เลยครับ!</li>
                          </ol>
                        </div>
                      </div>
                    )}

                    <p className="text-[10px] text-zinc-400 font-light leading-normal">
                      💡 เมื่อกด <strong>&quot;บันทึกข้อมูล&quot;</strong> ข้อมูลจะถูกเซฟลงในระบบและเบราว์เซอร์ของคุณทันที
                      พร้อมเปิดดูผลลัพธ์ในแท็บ <em>&quot;ดูหน้าพาร์ทเนอร์&quot;</em> ได้ทันทีครับ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* MODAL FOOTER: Google Sheet Sync Option */}
          {/* ======================================================== */}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2 text-[11px] truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">
                  Google Sheet:{" "}
                  <a
                    href={activeSheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white underline"
                  >
                    1Ovfyx_npnC3COwX7TkLpBJ2OPc56kTqPUH9Bipn2qDY
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => loadPartners(undefined, "sheet")}
                  disabled={isLoading}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
                  <span>ดึงจาก Google Sheet</span>
                </button>

                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors ml-2"
                >
                  <Settings className="w-3 h-3" />
                  <span>{showSettings ? "ปิดวิธีใช้งาน" : "วิธีตั้งค่า Google Sheet & Apps Script"}</span>
                </button>
              </div>
            </div>

            {/* Collapsible Google Sheets Helper Drawer */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-2xl bg-black/90 border border-white/15 space-y-3.5 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                      <span>เครื่องมือช่วยตั้งค่า Google Sheet & Two-Way Sync</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyTemplate}
                        className="text-[10px] text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedTemplate ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>คัดลอกตารางแล้ว!</span>
                          </>
                        ) : (
                          <>
                            <FileSpreadsheet className="w-3 h-3" />
                            <span>คัดลอกตารางตัวอย่าง</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleCopyScriptCode}
                        className="text-[10px] text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-2.5 py-1 rounded-md flex items-center gap-1 cursor-pointer transition-colors font-medium"
                      >
                        {copiedScriptCode ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>คัดลอกโค้ด Apps Script แล้ว!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>คัดลอกโค้ด Apps Script (Code.gs)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Step by Step Setup */}
                  <div className="space-y-2 text-[11px] text-zinc-300 font-light leading-relaxed">
                    <p>
                      <strong>💡 การทำงานร่วมกัน 2 ระบบ:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400 pl-1">
                      <li>
                        <strong>แก้ไขบนเว็บ:</strong> พิมพ์แก้ชื่อ รูป หรือลิงก์ในแท็บ <em>&quot;แก้ไขบนเว็บ&quot;</em> แล้วกดปุ่ม <strong>&quot;บันทึกข้อมูลลงบนเว็บ&quot;</strong> ข้อมูลจะแสดงผลทันทีและส่งไปอัปเดตลง Google Sheet อัตโนมัติ
                      </li>
                      <li>
                        <strong>แก้ไขใน Google Sheet:</strong> แก้ข้อมูลในตาราง Google Sheet แล้วกดปุ่ม <strong>&quot;ดึงจาก Google Sheet&quot;</strong> เพื่อดึงข้อมูลล่าสุดมาแสดง
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-[10.5px] font-mono text-zinc-400 uppercase tracking-wider">
                        Google Apps Script Web App URL (สำหรับเซฟกลับลง Sheet)
                      </label>
                      <span className="text-[10px] text-amber-300/90 font-mono">
                        สิทธิ์ต้องเป็น: Anyone (ทุกคน)
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://script.google.com/macros/s/.../exec"
                        value={appsScriptUrl}
                        onChange={(e) => {
                          setAppsScriptUrl(e.target.value);
                          localStorage.setItem("noire_apps_script_url", e.target.value.trim());
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-white/15 text-[11px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                      />
                      {appsScriptUrl.trim() && (
                        <span className="text-[10px] text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1 shrink-0 font-mono">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>เชื่อมต่อพร้อมซิงค์</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-zinc-500">
                      เมื่อใส่ Web App URL เว็บไซต์จะส่งข้อมูลไปบันทึกทับใน Google Sheet ทันทีที่กดปุ่มบันทึก
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
