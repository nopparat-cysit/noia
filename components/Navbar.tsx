"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";

interface NavItem {
  id: string;
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", name: "หน้าแรก", href: "#hero" },
  { id: "products", name: "ร้านค้า", href: "#products" },
  { id: "wholesale", name: "ขายส่ง", href: "#wholesale" },
  { id: "promotions", name: "โปรโมชั่น", href: "#promotions" },
  { id: "preorder", name: "พรีออเดอร์", href: "#preorder" },
  { id: "compliance", name: "มาตรฐาน อย.", href: "#compliance" },
  { id: "partner", name: "พาร์ทเนอร์", href: "#partner" },
  { id: "contact", name: "ติดต่อเรา", href: "#contact" },
];

export default function Navbar({
  onOpenPartnerModal,
  onOpenPartnerDirectoryModal,
}: {
  onOpenPartnerModal: () => void;
  onOpenPartnerDirectoryModal?: () => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);

          const navSectionIds = [
            "hero",
            "products",
            "wholesale",
            "promotions",
            "preorder",
            "compliance",
            "partner",
            "contact",
          ];

          const scrollPosition = window.scrollY + 240;
          let currentSection = "hero";

          for (const id of navSectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              const elementAbsoluteTop = rect.top + window.scrollY;
              if (scrollPosition >= elementAbsoluteTop - 20) {
                currentSection = id;
              }
            }
          }

          setActiveSection((prev) => (prev !== currentSection ? currentSection : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === "#partner") {
      if (onOpenPartnerDirectoryModal) {
        onOpenPartnerDirectoryModal();
        return;
      }
    }
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-[#050507]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#hero"
            className="flex items-center gap-2 group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
          >
            <span className="font-display text-2xl font-bold tracking-[0.3em] text-white transition-all duration-300 group-hover:text-zinc-200">
              NOIRE
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 border-l border-zinc-700 pl-2 hidden sm:inline-block font-light">
              Cosmetics Hub
            </span>
          </a>

          {/* Desktop & iPad Landscape Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className={`hidden lg:flex items-center gap-1 rounded-full px-4 py-1.5 transition-all duration-300 ${
              isScrolled
                ? "bg-white/[0.04] border border-white/10 shadow-inner"
                : "bg-black/30 backdrop-blur-md border border-white/5"
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const targetId = item.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-normal tracking-wider transition-colors duration-200 rounded-full cursor-pointer ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/20 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: B2B Quote / Partner button (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2.5 lg:gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>อย. 100%</span>
            </div>

            <button
              onClick={onOpenPartnerModal}
              className="btn-chrome light-sweep px-3.5 sm:px-4 py-1.5 rounded-full text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>ขอใบเสนอราคาส่ง</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile & iPad Portrait Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 border border-white/10 ml-2 cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[60px] z-30 bg-black/80 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed inset-x-0 top-[60px] z-40 bg-[#070709]/98 backdrop-blur-2xl border-b border-white/15 p-5 lg:hidden shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto"
            >
              <div className="flex flex-col gap-1.5">
                {NAV_ITEMS.map((item) => {
                  const targetId = item.href.replace("#", "");
                  const isActive = activeSection === targetId;

                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={`text-left py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-white/15 text-white font-medium border border-white/20"
                          : "text-zinc-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="tracking-wide">{item.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                    </button>
                  );
                })}

                <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                  <div className="flex items-center gap-2 px-2 py-1 text-xs text-zinc-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>นำเข้าถูกต้องตาม พ.ร.บ. และ อย. 100%</span>
                  </div>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenPartnerModal();
                    }}
                    className="btn-chrome light-sweep w-full py-3.5 rounded-full text-xs font-semibold text-center shadow-chrome-glow cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>ขอใบเสนอราคาส่ง B2B</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
