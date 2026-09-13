"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionInfo {
  id: string;
  num: string;
  name: string;
  short: string;
}

const SECTIONS: SectionInfo[] = [
  { id: "hero", num: "01", name: "หน้าแรก", short: "Hero" },
  { id: "about", num: "02", name: "เกี่ยวกับเรา", short: "About" },
  { id: "products", num: "03", name: "แคตตาล็อกสินค้า", short: "Products" },
  { id: "wholesale", num: "04", name: "สั่งซื้อขายส่ง", short: "Wholesale" },
  { id: "preorder", num: "05", name: "ระบบพรีออเดอร์", short: "Preorder" },
  { id: "social-channels", num: "06", name: "ช่องทางติดต่อ", short: "Social" },
  { id: "standards", num: "07", name: "มาตรฐาน NOIRE", short: "Standards" },
  { id: "logistics", num: "08", name: "ระบบการนำเข้า", short: "Logistics" },
  { id: "partner", num: "09", name: "พาร์ทเนอร์ธุรกิจ", short: "Partners" },
];

export default function FloatingSectionTracker() {
  const [activeSectionId, setActiveSectionId] = useState("hero");
  const [hoveredSectionId, setHoveredSectionId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY;
          // Show tracker after scrolling a little past initial top
          setIsVisible(scrollPos > 120);

          const midScreen = scrollPos + window.innerHeight * 0.38;

          for (let i = SECTIONS.length - 1; i >= 0; i--) {
            const sec = SECTIONS[i];
            const el = document.getElementById(sec.id);
            if (el) {
              const top = el.offsetTop;
              if (midScreen >= top) {
                setActiveSectionId(sec.id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSectionId);
  const activeSection = SECTIONS[activeIndex] || SECTIONS[0];

  return (
    <>
      {/* Desktop & Tablet Wide: Floating Right Minimal Nav Rail */}
      <AnimatePresence>
        {isVisible && (
          <motion.aside
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed right-5 sm:right-7 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-2.5 pointer-events-auto select-none"
            aria-label="Section Navigation"
          >
            {/* Active Section Current Capsule */}
            <motion.div
              layout
              className="mb-3 px-3 py-1.5 rounded-full card-glass border border-white/20 shadow-xl backdrop-blur-md flex items-center gap-2 text-right"
            >
              <span className="text-[10px] font-mono text-zinc-400">
                {activeSection.num} / 09
              </span>
              <span className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <span className="text-xs font-medium text-white tracking-wide">
                {activeSection.name}
              </span>
            </motion.div>

            {/* Dot Rail */}
            <div className="p-2 rounded-full card-glass border border-white/15 backdrop-blur-xl flex flex-col items-center gap-3 shadow-2xl">
              {SECTIONS.map((sec, idx) => {
                const isActive = sec.id === activeSectionId;
                const isHovered = sec.id === hoveredSectionId;

                return (
                  <div
                    key={sec.id}
                    className="relative flex items-center justify-end"
                    onMouseEnter={() => setHoveredSectionId(sec.id)}
                    onMouseLeave={() => setHoveredSectionId(null)}
                  >
                    {/* Hover Floating Tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: -8, scale: 0.92 }}
                          animate={{ opacity: 1, x: -14, scale: 1 }}
                          exit={{ opacity: 0, x: -8, scale: 0.92 }}
                          transition={{ duration: 0.18 }}
                          className="absolute right-full whitespace-nowrap px-3 py-1 rounded-xl bg-black/90 border border-white/25 text-white text-xs font-medium shadow-2xl backdrop-blur-md pointer-events-none flex items-center gap-1.5"
                        >
                          <span className="text-[10px] font-mono text-zinc-400">{sec.num}</span>
                          <span>{sec.name}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Interactive Nav Dot Button */}
                    <button
                      onClick={() => scrollToSection(sec.id)}
                      className="relative w-5 h-5 flex items-center justify-center cursor-pointer group"
                      aria-label={`Scroll to section ${sec.name}`}
                    >
                      {/* Active Outer Pulsing Aura Ring */}
                      {isActive && (
                        <motion.span
                          layoutId="activeSectionGlow"
                          className="absolute inset-0 rounded-full border border-white/50 bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}

                      {/* Inner Dot */}
                      <span
                        className={`transition-all duration-300 rounded-full ${
                          isActive
                            ? "w-2 h-2 bg-white shadow-[0_0_8px_#ffffff]"
                            : "w-1.5 h-1.5 bg-zinc-600 group-hover:bg-zinc-300 group-hover:scale-125"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile / Tablet: Floating Bottom-Left Minimal Indicator */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 left-4 z-40 xl:hidden px-3 py-1.5 rounded-full card-glass border border-white/20 shadow-xl backdrop-blur-md flex items-center gap-2 pointer-events-none"
          >
            <span className="text-[10px] font-mono text-zinc-400">
              {activeSection.num}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
            <span className="text-xs font-medium text-white truncate max-w-[130px]">
              {activeSection.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
