"use client";

import React, { useState } from "react";
import { ArrowUp, ShieldCheck, Lock } from "lucide-react";

export default function Footer() {
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#030304] border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-zinc-400">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Brand & Subtitle */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-display text-2xl sm:text-3xl font-bold tracking-[0.3em] text-white">
              NOIRE
            </span>
            <p className="text-xs text-zinc-400 tracking-wider mt-1">
              LUXURY COSMETICS HUB · WHOLESALE & PREORDER
            </p>
            <p className="text-xs text-zinc-500 font-light mt-2 max-w-sm">
              ศูนย์รวมเครื่องสำอางระดับพรีเมียม นำเข้าและจัดจำหน่ายถูกต้องตามกฎหมาย 100%
            </p>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <a href="#hero" className="hover:text-white transition-colors">
              หน้าแรก
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              เกี่ยวกับเรา
            </a>
            <a href="#products" className="hover:text-white transition-colors">
              ร้านค้า
            </a>
            <a href="#wholesale" className="hover:text-white transition-colors">
              ขายส่ง
            </a>
            <a href="#preorder" className="hover:text-white transition-colors">
              พรีออเดอร์
            </a>
            <a href="#standards" className="hover:text-white transition-colors">
              มาตรฐาน NOIRE
            </a>
            <a href="#partner-showcase" className="hover:text-white transition-colors">
              พาร์ทเนอร์
            </a>
            <a href="#social-channels" className="hover:text-white transition-colors">
              ช่องทางติดต่อ
            </a>
          </div>

          {/* Social Channels & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/61594309081557/?http_ref=eyJ0cyI6MTc4OTI3MTY4MjAwMCwiciI6IiJ9"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/wxthoutqey?stkn=NGdkNHh3cW0wNDFy&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Instagram</span>
            </a>
            <a
              href="https://line.me/ti/p/lvo2Esqts9"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>LINE</span>
            </a>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright matching PDF Page 9 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p className="text-center sm:text-left">
            © Copyright NOIRE Luxury Cosmetics. สงวนลิขสิทธิ์ตามกฎหมาย
          </p>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center sm:justify-end">
            <button
              onClick={() => setModalType("privacy")}
              className="hover:text-zinc-300 transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              นโยบายความเป็นส่วนตัว
            </button>
            <span>·</span>
            <button
              onClick={() => setModalType("terms")}
              className="hover:text-zinc-300 transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              เงื่อนไขการค้า
            </button>
            <span>·</span>
            <a
              href="/admin"
              className="hover:text-white transition-colors flex items-center gap-1 text-zinc-500 hover:text-zinc-300 py-0.5 px-2 rounded-lg bg-white/[0.03] hover:bg-white/10 border border-white/5"
              title="เข้าสู่ระบบจัดการและตั้งค่าข้อมูล (รหัสผ่าน 12500)"
            >
              <Lock className="w-3 h-3 text-zinc-400" />
              <span>ผู้ดูแลระบบ (Admin)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modal for Privacy / Terms */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b0c0f] border border-white/20 rounded-2xl p-6 sm:p-8 max-w-lg w-full text-zinc-300 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-3">
              {modalType === "privacy" ? "นโยบายความเป็นส่วนตัว (Privacy Policy)" : "เงื่อนไขการค้า (Commercial Terms)"}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-light">
              {modalType === "privacy"
                ? "NOIRE Luxury Cosmetics Hub ให้ความสำคัญสูงสุดกับความปลอดภัยของข้อมูลพาร์ทเนอร์ธุรกิจ ข้อมูลการขอใบเสนอราคา ข้อมูลการสั่งซื้อ และเอกสารทางบัญชีจะได้รับการเก็บรักษาและเข้ารหัสตามมาตรฐานความปลอดภัย ไม่มีการเปิดเผยแก่บุคคลที่สามโดยไม่ได้รับความยินยอม"
                : "การสั่งซื้อแบบขายส่ง (Wholesale) และพรีออเดอร์ (Preorder) ทุกรายการอยู่ภายใต้ข้อกำหนดการนำเข้าตาม พ.ร.บ. เครื่องสำอาง พ.ศ. 2558 และฉบับปรับปรุง พ.ศ. 2565 โดยสินค้าทุกชิ้นจะผ่านพิธีการศุลกากรและตรวจสอบใบอนุญาต LPI อย่างถูกต้องครบถ้วน"}
            </p>
            <button
              onClick={() => setModalType(null)}
              className="btn-chrome light-sweep w-full py-2.5 rounded-xl text-xs font-medium"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
