"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  KeyRound,
  ShieldCheck,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Database,
  ExternalLink,
  Settings,
  Eye,
  LogOut,
  Sparkles,
  Link2,
  FileSpreadsheet,
  Copy,
  Check,
  Undo2,
  Image as ImageIcon,
  Clipboard,
} from "lucide-react";
import {
  PartnerItem,
  DEFAULT_PARTNERS,
  DEFAULT_GOOGLE_SHEET_URL,
  DEFAULT_APPS_SCRIPT_URL,
  formatGoogleDriveUrl,
} from "@/lib/googleSheets";
import {
  DEFAULT_GROW_ERA_16_9,
  DEFAULT_LANDSCAPE_16_9,
} from "@/data/defaultPartnerImages";
import PartnerCard169 from "@/components/PartnerCard169";
import LiquidChromeBackground from "@/components/visuals/LiquidChromeBackground";

const ADMIN_PASSWORD = "12500";
const AUTH_STORAGE_KEY = "noire_admin_session";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<"partners" | "settings" | "preview">("partners");

  // Partner Data
  const [partners, setPartners] = useState<PartnerItem[]>(DEFAULT_PARTNERS);
  const [selectedPartnerIndex, setSelectedPartnerIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings
  const [sheetUrl, setSheetUrl] = useState(DEFAULT_GOOGLE_SHEET_URL);
  const [activeSheetUrl, setActiveSheetUrl] = useState(DEFAULT_GOOGLE_SHEET_URL);
  const [appsScriptUrl, setAppsScriptUrl] = useState(DEFAULT_APPS_SCRIPT_URL);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [sheetSyncStatus, setSheetSyncStatus] = useState<string | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedScriptCode, setCopiedScriptCode] = useState(false);

  // Check existing session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Load current partners
  useEffect(() => {
    if (!isAuthenticated) return;

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
          }
        } catch {
          // ignore
        }
      }

      fetch(`/api/partners?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      })
        .then((r) => r.json())
        .then((json) => {
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setPartners(json.data);
            if (json.sheetUrl) {
              setSheetUrl(json.sheetUrl);
              setActiveSheetUrl(json.sheetUrl);
            }
          }
        })
        .catch(() => {});
    };

    loadData();
  }, [isAuthenticated]);

  const handleSyncFromSheet = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const res = await fetch(
        `/api/partners?source=sheet&sheetUrl=${encodeURIComponent(sheetUrl)}&t=${Date.now()}`,
        {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        }
      );
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setPartners(json.data);
        setSelectedPartnerIndex(0);
        if (typeof window !== "undefined") {
          localStorage.setItem("noire_custom_partners", JSON.stringify(json.data));
          window.dispatchEvent(new Event("noire_partners_updated"));
        }
        setSyncMessage(`ดึงข้อมูลจาก Google Sheet สำเร็จ (${json.data.length} แถว)!`);
        setTimeout(() => setSyncMessage(null), 4000);
      } else {
        setSyncMessage(json.message || "ไม่พบข้อมูลใน Google Sheet");
      }
    } catch (err: any) {
      setSyncMessage("เกิดข้อผิดพลาดในการเชื่อมต่อกับ Google Sheet");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(AUTH_STORAGE_KEY, ADMIN_PASSWORD);
      }
    } else {
      setAuthError(true);
      setPasswordInput("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput("");
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const handleUpdateCurrentPartner = (field: keyof PartnerItem, value: any) => {
    setPartners((prev) => {
      const next = [...prev];
      if (!next[selectedPartnerIndex]) return prev;
      next[selectedPartnerIndex] = {
        ...next[selectedPartnerIndex],
        [field]: value,
      };
      return next;
    });
  };

  const handleAddNewPartner = () => {
    const newPartner: PartnerItem = {
      id: `partner-${Date.now()}`,
      name: "พาร์ทเนอร์ธุรกิจใหม่",
      category: "บริการความงาม",
      description: "บริการความงามระดับมืออาชีพ พร้อมสิทธิประโยชน์สำหรับลูกค้า NOIRE",
      websiteUrl: "https://",
      statusBadge: "AC",
      partnerType: "Authorized Partner",
    };
    setPartners((prev) => [...prev, newPartner]);
    setSelectedPartnerIndex(partners.length);
  };

  const handleDeletePartner = (index: number) => {
    if (partners.length <= 1) {
      alert("ต้องมีพาร์ทเนอร์อย่างน้อย 1 รายการในระบบ");
      return;
    }
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบพาร์ทเนอร์รายการนี้?")) return;

    setPartners((prev) => prev.filter((_, idx) => idx !== index));
    setSelectedPartnerIndex(Math.max(0, index - 1));
  };

  const handleResetDefaults = () => {
    if (confirm("คุณต้องการรีเซ็ตข้อมูลพาร์ทเนอร์ทั้งหมดกลับเป็นค่าเริ่มต้นใช่หรือไม่?")) {
      setPartners(JSON.parse(JSON.stringify(DEFAULT_PARTNERS)));
      setSelectedPartnerIndex(0);
      if (typeof window !== "undefined") {
        localStorage.removeItem("noire_custom_partners");
        window.dispatchEvent(new Event("noire_partners_updated"));
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("noire_custom_partners", JSON.stringify(partners));
        window.dispatchEvent(new Event("noire_partners_updated"));
      }

      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partners,
          appsScriptUrl,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert("เกิดข้อผิดพลาดในการบันทึกลงเซิร์ฟเวอร์: " + (json.error || ""));
      }
    } catch (err: any) {
      alert("บันทึกลงแคชเบราว์เซอร์สำเร็จ แต่เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ");
    } finally {
      setIsSaving(false);
    }
  };

  const currentPartner = partners[selectedPartnerIndex] || partners[0];

  // 1. Password Gate View (if not authenticated)
  if (!isAuthenticated) {
    return (
      <main className="relative min-h-screen bg-[#050507] text-[#ededed] flex items-center justify-center p-4">
        <LiquidChromeBackground />

        <div className="relative z-10 w-full max-w-md">
          {/* Back to main site link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับสู่หน้าหลัก (NOIRE Website)</span>
            </Link>
          </div>

          <div
            className="card-glass rounded-3xl p-8 sm:p-10 border border-white/20 shadow-2xl relative overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(10, 10, 14, 0.94) 100%)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Header Icon & Title */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 text-white shadow-chrome-glow">
                <Lock className="w-8 h-8" />
              </div>

              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase bg-white/5 px-2.5 py-1 rounded border border-white/10">
                ADMIN AUTHENTICATION
              </span>

              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide mt-3">
                ระบบจัดการผู้ดูแล
              </h1>
              <p className="text-xs text-zinc-400 font-light mt-1">
                กรุณากรอกรหัสผ่านผู้ดูแลระบบเพื่อเข้าถึงหน้าตั้งค่าและแก้ไขข้อมูล
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">
                  รหัสผ่าน (Password)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (authError) setAuthError(false);
                    }}
                    placeholder="กรอกรหัสผ่าน 5 หลัก..."
                    autoFocus
                    required
                    className="w-full bg-black/60 border border-white/15 focus:border-white/50 rounded-2xl py-3.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/50 transition-all font-mono"
                  />
                </div>

                {authError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-400 mt-2 flex items-center gap-1.5"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง</span>
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                className="btn-chrome light-sweep w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-chrome-glow"
              >
                <span>เข้าสู่ระบบผู้ดูแล</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 pt-4 border-t border-white/10 text-center">
              <span className="text-[11px] text-zinc-500 font-mono">
                NOIRE LUXURY PORTAL · PROTECTED AREA
              </span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 2. Authenticated Admin Dashboard View
  return (
    <main className="relative min-h-screen bg-[#050507] text-[#ededed] p-4 sm:p-6 lg:p-8">
      <LiquidChromeBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Navbar for Admin */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-400 hover:text-white transition-colors"
              title="กลับสู่หน้าหลัก"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  AUTHENTICATED · ADMIN
                </span>
                <span className="text-xs text-zinc-400">NOIRE Control Panel</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-display">
                ระบบจัดการและตั้งค่าข้อมูล (Admin Portal)
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
            {/* Direct Sync from Google Sheet Button */}
            <button
              onClick={handleSyncFromSheet}
              disabled={isSyncing}
              className="px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 cursor-pointer bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all shadow-sm"
              title="ดึงข้อมูลแถวและรูปภาพล่าสุดจาก Google Sheet ทันที"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-emerald-400" : ""}`} />
              <span>{isSyncing ? "กำลังดึงข้อมูล Sheet..." : "ดึงข้อมูลจาก Google Sheet"}</span>
            </button>

            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className={`btn-chrome light-sweep px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-chrome-glow ${
                saveSuccess ? "bg-emerald-500 text-black" : ""
              }`}
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>บันทึกสำเร็จแล้ว!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}</span>
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-full bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-300 border border-white/10 transition-colors cursor-pointer"
              title="ออกจากระบบ"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sync message banner if active */}
        {syncMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{syncMessage}</span>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 border-b border-white/10">
          <button
            onClick={() => setActiveTab("partners")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "partners"
                ? "bg-white text-black shadow-chrome-glow"
                : "text-zinc-400 hover:text-white bg-white/[0.04]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>แก้ไขพาร์ทเนอร์ธุรกิจ ({partners.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-white text-black shadow-chrome-glow"
                : "text-zinc-400 hover:text-white bg-white/[0.04]"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>ตั้งค่า Google Sheets & ระบบ</span>
          </button>

          <button
            onClick={() => setActiveTab("preview")}
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "preview"
                ? "bg-white text-black shadow-chrome-glow"
                : "text-zinc-400 hover:text-white bg-white/[0.04]"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>พรีวิวบนหน้าเว็บจริง</span>
          </button>
        </div>

        {/* Tab 1: Partners Editor */}
        {activeTab === "partners" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Partner Selector List */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-zinc-300">
                  รายการพาร์ทเนอร์ทั้งหมด
                </h3>
                <button
                  onClick={handleAddNewPartner}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>เพิ่มพาร์ทเนอร์</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {partners.map((item, idx) => {
                  const isSelected = selectedPartnerIndex === idx;
                  return (
                    <div
                      key={item.id || idx}
                      onClick={() => setSelectedPartnerIndex(idx)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-white/15 border-white/50 shadow-lg text-white"
                          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.07] text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="w-6 h-6 rounded-lg bg-black/50 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <div className="truncate">
                          <p className="text-xs font-semibold truncate text-white">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-zinc-400 truncate">
                            {item.category}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {item.statusBadge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-zinc-300">
                            {item.statusBadge}
                          </span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePartner(idx);
                          }}
                          className="p-1 rounded-lg hover:bg-red-500/20 text-zinc-500 hover:text-red-300 transition-colors"
                          title="ลบพาร์ทเนอร์"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={handleResetDefaults}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs text-zinc-400 hover:text-zinc-200 border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  <span>รีเซ็ตกลับเป็นค่าเริ่มต้น (2 พาร์ทเนอร์ทางการ)</span>
                </button>
              </div>
            </div>

            {/* Right: Partner Detail Editor */}
            <div className="lg:col-span-8">
              {currentPartner ? (
                <div
                  className="card-glass rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(10, 10, 14, 0.9) 100%)",
                  }}
                >
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                        EDITING PARTNER #{selectedPartnerIndex + 1}
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        {currentPartner.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveAll}
                        disabled={isSaving}
                        className="btn-chrome light-sweep px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{isSaving ? "บันทึก..." : "บันทึก"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Edit Form */}
                  <div className="space-y-5">
                    {/* Name & Badge */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                          ชื่อพาร์ทเนอร์ (Title)
                        </label>
                        <input
                          type="text"
                          value={currentPartner.name || ""}
                          onChange={(e) =>
                            handleUpdateCurrentPartner("name", e.target.value)
                          }
                          placeholder="เช่น บริการเสริมสวยนอกสถานที่ หรือ ร้านทำเล็บ"
                          className="w-full bg-black/60 border border-white/15 focus:border-white/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                          ป้ายกำกับสถานะ (Badge เช่น AC หรือ ร้านทำเล็บ)
                        </label>
                        <input
                          type="text"
                          value={currentPartner.statusBadge || ""}
                          onChange={(e) =>
                            handleUpdateCurrentPartner("statusBadge", e.target.value)
                          }
                          placeholder="เช่น AC, Verified, Official"
                          className="w-full bg-black/60 border border-white/15 focus:border-white/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Category & URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                          หมวดหมู่ธุรกิจ (Category)
                        </label>
                        <input
                          type="text"
                          value={currentPartner.category || ""}
                          onChange={(e) =>
                            handleUpdateCurrentPartner("category", e.target.value)
                          }
                          placeholder="เช่น บริการเสริมสวยนอกสถานที่, ร้านทำเล็บ"
                          className="w-full bg-black/60 border border-white/15 focus:border-white/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                          ลิงก์เว็บไซต์พาร์ทเนอร์ (Website URL)
                        </label>
                        <div className="relative">
                          <Link2 className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={currentPartner.websiteUrl || ""}
                            onChange={(e) =>
                              handleUpdateCurrentPartner("websiteUrl", e.target.value)
                            }
                            placeholder="https://partner-website.com"
                            className="w-full bg-black/60 border border-white/15 focus:border-white/50 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-zinc-500 focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-medium text-zinc-300">
                          คำอธิบายพาร์ทเนอร์ (Description - แสดงผลเต็มทุกบรรทัด)
                        </label>
                        <span className="text-[11px] text-zinc-400 font-mono">
                          {currentPartner.description?.length || 0} ตัวอักษร
                        </span>
                      </div>
                      <textarea
                        rows={6}
                        value={currentPartner.description || ""}
                        onChange={(e) =>
                          handleUpdateCurrentPartner("description", e.target.value)
                        }
                        placeholder="กรอกรายละเอียด จุดเด่น หรือบริการของพาร์ทเนอร์ได้เต็มที่ สามารถกด Enter ขึ้นบรรทัดใหม่ได้ ระบบจะแสดงผลครบถ้วนไม่ตัดทอน..."
                        className="w-full bg-black/60 border border-white/15 focus:border-white/50 rounded-xl p-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none leading-relaxed"
                      />
                    </div>

                    {/* 16:9 Image Link Input */}
                    <div>
                      {(() => {
                        const rawUrl = currentPartner.imageUrl || currentPartner.logoUrl || "";
                        const isSvgFallback = rawUrl.startsWith("data:image/svg+xml");
                        const cleanImageUrl = isSvgFallback ? "" : rawUrl;
                        const isGoogleDriveUrl =
                          cleanImageUrl.includes("drive.google.com") ||
                          cleanImageUrl.includes("lh3.googleusercontent.com/d/");
                        const formattedPreviewUrl = cleanImageUrl
                          ? formatGoogleDriveUrl(cleanImageUrl)
                          : "";
                        const fallbackImage =
                          selectedPartnerIndex === 0
                            ? DEFAULT_GROW_ERA_16_9
                            : DEFAULT_LANDSCAPE_16_9;
                        const activePreviewImage = formattedPreviewUrl || fallbackImage;

                        const handlePasteFromClipboard = async () => {
                          try {
                            const text = await navigator.clipboard.readText();
                            if (text) {
                              const trimmed = text.trim().replace(/^["']|["']$/g, "");
                              handleUpdateCurrentPartner("imageUrl", trimmed);
                              handleUpdateCurrentPartner("logoUrl", trimmed);
                            }
                          } catch {
                            alert("เบราว์เซอร์ยังไม่ได้เปิดสิทธิ์อ่านคลิปบอร์ดอัตโนมัติ กรุณากดคลิกในช่องข้อความแล้วกด Ctrl+V หรือคลิกขวาแล้วเลือก 'วาง' ได้เลยครับ");
                          }
                        };

                        return (
                          <div>
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                                <Link2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>ลิงก์รูปภาพพาร์ทเนอร์ (Image Link / URL 16:9)</span>
                              </label>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={handlePasteFromClipboard}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                                  title="กดเพื่อวางลิงก์จากคลิปบอร์ดทันที"
                                >
                                  <Clipboard className="w-3 h-3" />
                                  <span>กดวางจากคลิปบอร์ด</span>
                                </button>

                                {cleanImageUrl && (
                                  <>
                                    <a
                                      href={formattedPreviewUrl || cleanImageUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white text-[11px] flex items-center gap-1 transition-colors"
                                      title="เปิดดูรูปภาพในแท็บใหม่"
                                    >
                                      <span>เปิดดูรูป</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleUpdateCurrentPartner("imageUrl", "");
                                        handleUpdateCurrentPartner("logoUrl", "");
                                      }}
                                      className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                                      title="ล้างลิงก์และกลับไปใช้ภาพมาตรฐาน"
                                    >
                                      <Undo2 className="w-3 h-3" />
                                      <span>ล้างลิงก์</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                              <div className="md:col-span-8 space-y-2">
                                <div className="relative">
                                  <textarea
                                    rows={3}
                                    value={cleanImageUrl}
                                    onChange={(e) => {
                                      const val = e.target.value.trim().replace(/^["']|["']$/g, "");
                                      handleUpdateCurrentPartner("imageUrl", val);
                                      handleUpdateCurrentPartner("logoUrl", val);
                                    }}
                                    placeholder="วางลิงก์รูปภาพที่นี่ (สามารถวางลิงก์ยาวได้ไม่จำกัด เช่น https://... หรือ ลิงก์ Google Drive)..."
                                    className="w-full bg-black/60 border border-white/15 focus:border-white/50 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none font-mono break-all leading-relaxed resize-y"
                                  />
                                </div>

                                <div className="flex flex-col gap-1 text-[11px]">
                                  {cleanImageUrl ? (
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-emerald-400 flex items-center gap-1 font-medium">
                                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                        <span>กำหนดลิงก์รูปภาพแล้ว ({cleanImageUrl.length} ตัวอักษร)</span>
                                      </span>
                                      {isGoogleDriveUrl && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1 font-sans">
                                          <Sparkles className="w-2.5 h-2.5 shrink-0 text-amber-300" />
                                          <span>Google Drive: แปลงเป็น Direct Image แสดงผลอัตโนมัติ</span>
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-amber-400/90 flex items-center gap-1">
                                      <span>★ กำลังใช้ภาพมาตรฐาน 16:9 ของระบบ (วางลิงก์ใหม่ได้ทันที)</span>
                                    </span>
                                  )}
                                </div>

                                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 text-[11px] text-zinc-400 leading-relaxed">
                                  <p className="flex items-center gap-1.5 text-zinc-300 font-medium">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                    <span>วิธีใส่ลิงก์รูปภาพ (วางได้ไม่จำกัดความยาว):</span>
                                  </p>
                                  <p>
                                    • <strong>ลิงก์จากเว็บ / Canva / Imgur:</strong> คัดลอก URL รูปภาพแล้วกดปุ่ม &quot;กดวางจากคลิปบอร์ด&quot; หรือ Ctrl+V
                                  </p>
                                  <p>
                                    • <strong>Google Drive:</strong> วางลิงก์แชร์ของไฟล์รูป (ตั้งสิทธิ์เป็น &apos;ทุกคนที่มีลิงก์&apos;) ระบบจะแปลงเป็น Direct Image ให้อัตโนมัติ
                                  </p>
                                  <p>
                                    • <strong>ใน Google Sheet:</strong> เพื่อนร่วมงานสามารถใส่ลิงก์ในคอลัมน์ชื่อ <span className="text-zinc-200 font-mono font-semibold">&quot;รูปภาพ&quot;</span> ในชีตได้โดยตรง
                                  </p>
                                </div>
                              </div>

                              {/* Image Preview Box (16:9) */}
                              <div className="md:col-span-4">
                                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-black/60 border border-white/15 flex items-center justify-center relative shadow-inner">
                                  <img
                                    src={activePreviewImage}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      if (e.currentTarget.src !== fallbackImage) {
                                        e.currentTarget.src = fallbackImage;
                                      }
                                    }}
                                  />
                                </div>
                                <span className="text-[10px] text-zinc-400 text-center block mt-1.5 font-mono">
                                  {cleanImageUrl ? "พรีวิวจากลิงก์ที่คุณใส่" : "พรีวิวภาพมาตรฐาน 16:9"}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-12 text-zinc-500">
                  เลือกพาร์ทเนอร์เพื่อแก้ไขข้อมูล
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Settings & Google Sheets */}
        {activeTab === "settings" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div
              className="card-glass rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(10, 10, 14, 0.9) 100%)",
              }}
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    การเชื่อมต่อ Google Sheets & Cloud Sync
                  </h3>
                  <p className="text-xs text-zinc-400">
                    ซิงค์ข้อมูลพาร์ทเนอร์ 2 ทิศทางระหว่างฐานข้อมูลเว็บไซต์กับ Google Sheet
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Google Sheet View URL (URL หน้าเว็บ Google Sheet ของคุณ)
                  </label>
                  <input
                    type="text"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="w-full bg-black/60 border border-white/15 focus:border-white/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Google Apps Script Web App URL (สำหรับรับคำสั่งเขียนข้อมูลกลับลง Sheet)
                  </label>
                  <input
                    type="text"
                    value={appsScriptUrl}
                    onChange={(e) => setAppsScriptUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="w-full bg-black/60 border border-white/15 focus:border-white/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none font-mono"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">
                    กำหนดสิทธิ์ของ Apps Script Deployment ให้เป็น "Anyone (ทุกคน)" เพื่อให้เว็บส่งข้อมูลอัปเดตกลับได้
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-zinc-400">
                    สถานะปัจจุบัน: พร้อมใช้งานและซิงค์กับฐานข้อมูล
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSyncFromSheet}
                      disabled={isSyncing}
                      className="px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-emerald-400" : ""}`} />
                      <span>{isSyncing ? "กำลังดึงข้อมูล..." : "ดึงข้อมูลจาก Google Sheet เดี๋ยวนี้"}</span>
                    </button>

                    <button
                      onClick={handleSaveAll}
                      disabled={isSaving}
                      className="btn-chrome light-sweep px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>บันทึกการตั้งค่า</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Live 16:9 Website Preview */}
        {activeTab === "preview" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  ตัวอย่างการ์ดพาร์ทเนอร์บนหน้าแรก (Live Preview)
                </h3>
                <p className="text-xs text-zinc-400">
                  สัดส่วน 16:9 ตามมาตรฐานสไลด์หน้า 9 พร้อมปุ่มลิงก์และป้ายกำกับ
                </p>
              </div>

              <Link
                href="/#partner-showcase"
                target="_blank"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
              >
                <span>เปิดดูบนหน้าแรก</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {partners.slice(0, 2).map((partner, idx) => (
                <PartnerCard169
                  key={partner.id || idx}
                  partner={partner}
                  index={idx}
                  isActive={idx === 0}
                  showEditButton={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
