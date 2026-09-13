"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ChromeRibbonOrnament from "./visuals/ChromeRibbonOrnament";

interface AboutCardItem {
  number: string;
  title: string;
  desc: string;
}

const ABOUT_CARDS: AboutCardItem[] = [
  {
    number: "01",
    title: "โปรโมชั่น",
    desc: "ราคาสินค้าราคาพิเศษ คืนกำไรให้ผู้บริโภค",
  },
  {
    number: "02",
    title: "ราคาขายส่ง",
    desc: "ราคาพิเศษและมีช่องสร้างกำไรที่คุ้มค่า สำหรับการสั่งซื้อจำนวนมากและตัวแทนจำหน่าย",
  },
  {
    number: "03",
    title: "พรีออเดอร์",
    desc: "ระบบรับสั่งซื้อและนำเข้าสินค้าที่ไม่มีในสต็อกอย่างถูกต้องตามกฎหมาย",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050507]">
      {/* Liquid ribbon accents */}
      <ChromeRibbonOrnament variant="horizontal" className="top-1/3 inset-x-0 h-96 opacity-25" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6 font-display">
            เกี่ยวกับ <span className="tracking-[0.15em] text-chrome">NOIRE</span>
          </h2>

          <div className="space-y-1 sm:space-y-2">
            <p className="text-sm sm:text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
              ศูนย์รวมเครื่องสำอางระดับพรีเมียมสำหรับการช็อปปิ้ง
            </p>
            <p className="text-sm sm:text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
              บริการจำหน่ายแบบขายส่งและพรีออเดอร์อย่างเป็นระบบ
            </p>
          </div>
        </div>

        {/* 3 Luxury Glass Cards from Slide Page 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {ABOUT_CARDS.map((card, index) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="card-glass rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center justify-between border border-white/20 hover:border-white/40 shadow-2xl relative overflow-hidden group min-h-[340px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(10, 10, 14, 0.85) 100%)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Radial spotlight on hover */}
              <div className="absolute inset-0 bg-radial-spotlight opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none" />

              <div className="relative z-10 w-full flex flex-col items-center">
                {/* Wireframe Outline Large Number: 01, 02, 03 */}
                <div className="font-display text-6xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/50 to-white/10 tracking-wider mb-6 select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                  {card.number}
                </div>

                {/* Card Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide mb-4">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-xs">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Subtle Metallic Accent Line */}
              <div className="relative z-10 w-12 h-1 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent mt-8 group-hover:w-24 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
