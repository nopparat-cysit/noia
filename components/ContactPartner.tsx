"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import ChromeRibbonOrnament from "./visuals/ChromeRibbonOrnament";
import PartnerCard169 from "./PartnerCard169";
import { PartnerItem, DEFAULT_PARTNERS } from "@/lib/googleSheets";

export default function ContactPartner() {
  const [partners, setPartners] = useState<PartnerItem[]>(DEFAULT_PARTNERS);

  useEffect(() => {
    const loadData = () => {
      // 1. Initial fast display from cache if available (prevent layout flicker)
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

      // 2. Always fetch fresh live data from Google Sheets / API in background (cache-aside)
      fetch(`/api/partners?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      })
        .then((r) => r.json())
        .then((json) => {
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setPartners(json.data);
            if (typeof window !== "undefined") {
              localStorage.setItem("noire_custom_partners", JSON.stringify(json.data));
            }
          }
        })
        .catch(() => {});
    };

    loadData();

    if (typeof window !== "undefined") {
      window.addEventListener("noire_partners_updated", loadData);
      return () => window.removeEventListener("noire_partners_updated", loadData);
    }
  }, []);

  return (
    <section id="partner" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      {/* Background Ribbon */}
      <ChromeRibbonOrnament variant="horizontal" className="top-12 inset-x-0 h-96 opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Business Partners 16:9 Showcase Section */}
        <div id="partner-showcase" className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-white/10"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-zinc-400 mb-2 font-mono uppercase tracking-wider">
                <Globe className="w-3 h-3 text-zinc-300" />
                <span>Official Partner Websites</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                พาร์ทเนอร์ธุรกิจ
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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
        </div>
      </div>
    </section>
  );
}
