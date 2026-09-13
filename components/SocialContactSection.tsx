"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ExternalLink, ArrowUpRight } from "lucide-react";
import ChromeRibbonOrnament from "./visuals/ChromeRibbonOrnament";
import {
  FacebookChromeOrb,
  InstagramChromeOrb,
  LineChromeOrb,
} from "./visuals/SocialChromeArtworks";

interface SocialChannel {
  id: string;
  name: string;
  thaiLabel: string;
  url: string;
  description: string;
  actionText: string;
  icon: React.ReactNode;
}

const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: "facebook",
    name: "Facebook",
    thaiLabel: "เฟซบุ๊กทางการ",
    url: "https://www.facebook.com/61594309081557/?http_ref=eyJ0cyI6MTc4OTI3MTY4MjAwMCwiciI6IiJ9",
    description: "อัปเดตข่าวสาร โปรโมชั่นพิเศษ และรีวิวสินค้า NOIRE แบบเรียลไทม์",
    actionText: "เปิด Facebook Page",
    icon: <FacebookChromeOrb className="w-40 h-40 sm:w-44 sm:h-44" />,
  },
  {
    id: "instagram",
    name: "Instagram",
    thaiLabel: "อินสตาแกรมทางการ",
    url: "https://www.instagram.com/wxthoutqey?stkn=NGdkNHh3cW0wNDFy&utm_source=qr",
    description: "รับชมภาพถ่ายคอลเลกชันระดับ Luxury Editorial และฟินิชงานผิวระดับกูตูร์",
    actionText: "ติดตาม @wxthoutqey",
    icon: <InstagramChromeOrb className="w-40 h-40 sm:w-44 sm:h-44" />,
  },
  {
    id: "line",
    name: "LINE",
    thaiLabel: "ไลน์ทางการ",
    url: "https://line.me/ti/p/lvo2Esqts9",
    description: "ปรึกษาข้อมูลสินค้า เช็คสต็อก ขอใบเสนอราคาส่ง และสั่งพรีออเดอร์กับแอดมินโดยตรง",
    actionText: "แอด LINE Official",
    icon: <LineChromeOrb className="w-40 h-40 sm:w-44 sm:h-44" />,
  },
];

export default function SocialContactSection() {
  return (
    <section
      id="social-channels"
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#050507] overflow-hidden"
    >
      {/* Background Liquid Chrome Accent */}
      <ChromeRibbonOrnament
        variant="horizontal"
        className="top-1/3 inset-x-0 h-96 opacity-25"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header matching Slide Page 7 */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-400 mb-4 tracking-[0.2em] uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>Official Gateways</span>
          </motion.div>

          {/* Main Title matching Page 7: ช่องทางติดต่อ* */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4"
          >
            ช่องทางติดต่อ<span className="text-white/60">*</span>
          </motion.h2>

          {/* Subtitle matching Page 7: ติดต่อเราได้ที่ (คลิกไอคอน) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-2xl text-zinc-300 font-light tracking-wide"
          >
            ติดต่อเราได้ที่{" "}
            <span className="text-white font-medium underline underline-offset-8 decoration-white/30">
              (คลิกไอคอน)
            </span>
          </motion.p>
        </div>

        {/* 3 Liquid Chrome Cards matching Page 7 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {SOCIAL_CHANNELS.map((channel, index) => (
            <motion.a
              key={channel.id}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group card-glass rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center justify-between border border-white/20 hover:border-white/50 shadow-2xl relative overflow-hidden transition-all duration-300 cursor-pointer min-h-[420px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(10, 10, 14, 0.85) 100%)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Radial spotlight on hover */}
              <div className="absolute inset-0 bg-radial-spotlight opacity-30 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

              {/* Specular light sweep border */}
              <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/30 transition-colors pointer-events-none" />

              {/* Top Liquid Chrome Orb Icon */}
              <div className="relative z-10 my-2 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                {channel.icon}
              </div>

              {/* Label & Description */}
              <div className="relative z-10 w-full flex flex-col items-center mt-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-display group-hover:text-zinc-100 transition-colors flex items-center gap-2">
                  <span>{channel.name}</span>
                  <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 font-light mt-2 leading-relaxed max-w-xs">
                  {channel.description}
                </p>
              </div>

              {/* Bottom Metallic Chrome Action Pill */}
              <div className="relative z-10 w-full mt-6 pt-4 border-t border-white/10">
                <div className="btn-chrome light-sweep w-full py-3 px-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 shadow-chrome-glow group-hover:bg-white group-hover:text-black transition-all">
                  <span>{channel.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
