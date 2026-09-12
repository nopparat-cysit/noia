"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Shield, ShoppingBag, Truck } from "lucide-react";
import {
  FoundationArtwork,
  LipstickArtwork,
  CushionArtwork,
  SerumArtwork,
} from "./visuals/ProductArtworks";
import ChromeRibbonOrnament from "./visuals/ChromeRibbonOrnament";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalized coordinates from -1 to 1
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Liquid Chrome Ribbons */}
      <ChromeRibbonOrnament variant="horizontal" className="top-12 inset-x-0 h-96 opacity-40" />
      <ChromeRibbonOrnament variant="loop" className="bottom-0 inset-x-0 h-80 opacity-30" />

      {/* Volumetric Radial Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-white/10 via-zinc-400/5 to-transparent blur-3xl rounded-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Top Luxury Category Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-md shadow-inner mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-zinc-300 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-300 font-light">
            Luxury Cosmetics Wholesale & Preorder Hub
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </motion.div>

        {/* Brand Display Typography: NOIRE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-1 sm:my-2 select-none"
        >
          {/* Outer Chrome Drop Glow */}
          <h1 className="font-display text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-black tracking-[0.15em] sm:tracking-[0.18em] leading-none text-chrome-bright drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
            NOIRE
          </h1>
          <div
            aria-hidden="true"
            className="absolute inset-0 font-display text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-black tracking-[0.15em] sm:tracking-[0.18em] leading-none text-white/5 blur-lg pointer-events-none select-none"
          >
            NOIRE
          </div>
        </motion.div>

        {/* Floating Luxury Cosmetics Composition (Surrounding the typography) */}
        <div className="relative w-full max-w-5xl h-36 sm:h-56 my-1 sm:my-2 pointer-events-none">
          {/* Cushion Compact - Top Left */}
          <motion.div
            style={{
              x: mousePos.x * -14,
              y: mousePos.y * -10,
            }}
            transition={{ type: "spring", stiffness: 70, damping: 20 }}
            className="absolute left-2 sm:left-12 -top-12 sm:-top-20 w-20 sm:w-36 h-24 sm:h-40 drop-shadow-2xl"
          >
            <CushionArtwork />
          </motion.div>

          {/* Lipstick - Top Right */}
          <motion.div
            style={{
              x: mousePos.x * 16,
              y: mousePos.y * -14,
            }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            className="absolute right-2 sm:right-16 -top-16 sm:-top-28 w-18 sm:w-32 h-28 sm:h-48 drop-shadow-2xl"
          >
            <LipstickArtwork />
          </motion.div>

          {/* Foundation Bottle - Center Floating Accent */}
          <motion.div
            style={{
              x: mousePos.x * -10,
              y: mousePos.y * 12,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 25 }}
            className="absolute left-1/4 -bottom-6 w-24 sm:w-36 h-32 sm:h-52 drop-shadow-2xl hidden md:block"
          >
            <FoundationArtwork />
          </motion.div>

          {/* Serum Dropper - Bottom Right */}
          <motion.div
            style={{
              x: mousePos.x * 12,
              y: mousePos.y * 10,
            }}
            transition={{ type: "spring", stiffness: 65, damping: 20 }}
            className="absolute right-1/4 -bottom-6 w-24 sm:w-36 h-32 sm:h-52 drop-shadow-2xl hidden md:block"
          >
            <SerumArtwork />
          </motion.div>
        </div>

        {/* Main Headline from PDF */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-2 sm:mt-4 px-2 space-y-2 sm:space-y-3"
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl font-semibold tracking-normal sm:tracking-wide text-zinc-100 leading-snug">
            เครื่องสำอางระดับลักชัวรี <span className="hidden sm:inline">·</span>{" "}
            <span className="block sm:inline text-zinc-300 sm:text-zinc-100">
              ขายส่ง · พรีออเดอร์
            </span>
          </h2>
          <p className="text-sm sm:text-lg text-zinc-400 font-light tracking-wide sm:tracking-wider">
            ความงามที่ส่งมอบเหนือระดับ
          </p>
        </motion.div>

        {/* Dual Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-6 sm:mt-8 w-full max-w-xs sm:max-w-none"
        >
          <button
            onClick={() => scrollTo("products")}
            className="btn-chrome light-sweep px-8 py-3.5 rounded-full text-xs sm:text-sm font-medium w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-chrome-glow"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>เลือกซื้อสินค้า</span>
          </button>

          <button
            onClick={() => scrollTo("preorder")}
            className="btn-glass px-8 py-3.5 rounded-full text-xs sm:text-sm font-medium w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer hover:bg-white/10"
          >
            <Truck className="w-4 h-4 text-zinc-300" />
            <span>สั่งพรีออเดอร์</span>
          </button>
        </motion.div>

        {/* Trust Badges Minimal Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-3 gap-2 sm:gap-12 mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-white/10 text-center max-w-2xl w-full"
        >
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-base sm:text-xl font-semibold text-white font-display">100%</p>
            <p className="text-[10px] sm:text-xs text-zinc-400">จดแจ้ง อย. ทุกรายการ</p>
          </div>
          <div className="space-y-0.5 sm:space-y-1 border-x border-white/10 px-1 sm:px-6">
            <p className="text-base sm:text-xl font-semibold text-white font-display">LPI</p>
            <p className="text-[10px] sm:text-xs text-zinc-400">นำเข้าศุลกากรถูกต้อง</p>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-base sm:text-xl font-semibold text-white font-display">B2B</p>
            <p className="text-[10px] sm:text-xs text-zinc-400">ราคาส่งเพื่อธุรกิจ</p>
          </div>
        </motion.div>

        {/* Scroll down indicator */}
        <button
          onClick={() => scrollTo("about")}
          className="mt-12 text-zinc-500 hover:text-zinc-300 transition-colors flex flex-col items-center gap-1.5 cursor-pointer"
          aria-label="เลื่อนลงเพื่อดูข้อมูลเพิ่มเติม"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-light">Explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
