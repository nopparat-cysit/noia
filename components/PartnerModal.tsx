"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Send, Building, Mail, Phone, User, FileText } from "lucide-react";

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTier?: string;
}

export default function PartnerModal({ isOpen, onClose, defaultTier = "wholesale" }: PartnerModalProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    tier: defaultTier,
    estimatedVolume: "50-100 ชิ้น/เดือน",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2500);
    }, 1000);
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

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl bg-[#09090c] border border-white/20 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/40 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                ส่งคำขอพาร์ทเนอร์สำเร็จ
              </h3>
              <p className="text-sm text-zinc-300 max-w-md font-light leading-relaxed">
                เจ้าหน้าที่ฝ่ายพัฒนาธุรกิจ B2B ของ NOIRE จะติดต่อกลับพร้อมใบเสนอราคาอย่างเป็นทางการภายใน 24 ชม.
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  NOIRE B2B PARTNERSHIP
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide mt-2">
                  ร่วมเป็นพาร์ทเนอร์กับ NOIRE
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
                  กรอกข้อมูลเบื้องต้นเพื่อรับแคตตาล็อกราคาส่งและใบเสนอราคาอย่างเป็นทางการ
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Business Name */}
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-zinc-400" />
                      <span>ชื่อร้านค้า / ธุรกิจ</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น Luxury Beauty Studio หรือ บริษัท บิวตี้ จำกัด"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  {/* Contact Name */}
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-zinc-400" />
                      <span>ชื่อผู้ติดต่อ</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น คุณกฤษดา หรือ ผู้จัดการฝ่ายจัดซื้อ"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-zinc-400" />
                      <span>อีเมลสำหรับรับใบเสนอราคา</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="business@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-zinc-400" />
                      <span>เบอร์โทรศัพท์ติดต่อ</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="08x-xxx-xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                {/* Tier Selection */}
                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium">ระดับคำสั่งซื้อที่สนใจ:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "small", label: "SMALL ORDER", desc: "12-49 ชิ้น" },
                      { id: "wholesale", label: "WHOLESALE", desc: "50-199 ชิ้น" },
                      { id: "bulk", label: "BULK ORDER", desc: "200+ ชิ้น" },
                    ].map((tier) => (
                      <button
                        type="button"
                        key={tier.id}
                        onClick={() => setFormData({ ...formData, tier: tier.id })}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          formData.tier === tier.id
                            ? "bg-white/15 border-white text-white"
                            : "bg-black/40 border-white/10 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <p className="font-display text-xs font-semibold">{tier.label}</p>
                        <p className="text-[10px] text-zinc-500">{tier.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-zinc-400" />
                    <span>รายการสินค้าหรือข้อซักถามเพิ่มเติม (ถ้ามี)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="ระบุหมวดหมู่ที่ต้องการ เช่น เมคอัพ, รองพื้น หรือสกินแคร์..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-chrome light-sweep w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-chrome-glow disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>กำลังส่งข้อมูล...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>ยืนยันการขอใบเสนอราคาส่ง B2B</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
