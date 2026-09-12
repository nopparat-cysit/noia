"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShoppingBag,
  FileSpreadsheet,
  FileCheck2,
  CreditCard,
  Plane,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { PREORDER_STEPS, PreorderStep } from "@/data/noireData";
import ChromeRibbonOrnament from "./visuals/ChromeRibbonOrnament";

export default function PreorderSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = PREORDER_STEPS[activeStepIndex];

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <ShoppingBag className="w-5 h-5" />;
      case 1:
        return <FileSpreadsheet className="w-5 h-5" />;
      case 2:
        return <FileCheck2 className="w-5 h-5" />;
      case 3:
        return <CreditCard className="w-5 h-5" />;
      case 4:
        return <Plane className="w-5 h-5" />;
      case 5:
        return <Truck className="w-5 h-5" />;
      default:
        return <ShoppingBag className="w-5 h-5" />;
    }
  };

  return (
    <section id="preorder" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050507] overflow-hidden">
      {/* Liquid Chrome Ribbons */}
      <ChromeRibbonOrnament variant="horizontal" className="top-1/4 inset-x-0 h-96 opacity-25" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-400 mb-4 tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>Preorder Logistics System</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            ระบบการสั่งซื้อ <span className="font-display tracking-[0.2em] text-chrome">พรีออเดอร์</span>
          </h2>

          <p className="text-lg sm:text-xl text-zinc-400 font-light">
            ความงามของคุณ คือหน้าที่ของเรา
          </p>
        </div>

        {/* Desktop & Tablet: Liquid Chrome Progressive Circuit Timeline */}
        <div className="hidden md:block mb-12">
          {/* Progress Node Bar */}
          <div className="relative mb-10 sm:mb-12">
            {/* Background connecting track */}
            <div className="absolute top-1/2 left-6 right-6 h-1 -translate-y-1/2 bg-white/10 rounded-full" />

            {/* Active liquid chrome fill track */}
            <motion.div
              className="absolute top-1/2 left-6 h-1 -translate-y-1/2 bg-gradient-to-r from-white via-zinc-200 to-zinc-500 rounded-full shadow-chrome-glow"
              animate={{
                width: `${(activeStepIndex / (PREORDER_STEPS.length - 1)) * 94}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            {/* Step Circular Nodes */}
            <div className="relative z-10 flex justify-between items-center px-2 sm:px-4">
              {PREORDER_STEPS.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                const isPassed = activeStepIndex > idx;

                return (
                  <button
                    key={step.stepNumber}
                    onClick={() => setActiveStepIndex(idx)}
                    className="group flex flex-col items-center cursor-pointer focus:outline-none"
                  >
                    {/* Circle Node */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 border relative ${
                        isActive
                          ? "bg-white text-black border-white shadow-chrome-glow-lg scale-110"
                          : isPassed
                          ? "bg-zinc-800 text-white border-zinc-500"
                          : "bg-black/80 text-zinc-500 border-white/10 hover:border-white/30 hover:text-zinc-300"
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                      ) : (
                        <span className="font-display text-[11px] sm:text-xs font-bold tracking-wider">
                          {step.stepNumber}
                        </span>
                      )}

                      {/* Glowing Pulse Ring for active node */}
                      {isActive && (
                        <span className="absolute inset-0 rounded-full border border-white animate-ping opacity-30" />
                      )}
                    </div>

                    {/* Step Title Label */}
                    <span
                      className={`mt-2.5 sm:mt-3 text-[11px] sm:text-xs tracking-wider transition-colors max-w-[85px] sm:max-w-[100px] text-center ${
                        isActive ? "text-white font-medium" : "text-zinc-500 group-hover:text-zinc-300"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Stage Card for Active Step */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.stepNumber}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="card-glass rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/20 shadow-2xl relative overflow-hidden"
            >
              <div className="grid grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Left: Step Big Number & Icon */}
                <div className="col-span-12 md:col-span-4 flex flex-col items-start md:border-r border-white/10 md:pr-6 lg:pr-8 border-b md:border-b-0 pb-4 md:pb-0">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      STEP {activeStep.stepNumber} OF 06
                    </span>
                    <span className="text-[11px] sm:text-xs text-emerald-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{activeStep.eta}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide mb-3">
                    {activeStep.title}
                  </h3>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white">
                    {getStepIcon(activeStepIndex)}
                  </div>
                </div>

                {/* Right: Detailed Process & Guarantees */}
                <div className="col-span-12 md:col-span-8 space-y-3.5">
                  <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-light">
                    {activeStep.description}
                  </p>

                  <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-0.5">
                        ข้อกำหนดและมาตรฐานการดำเนินงาน
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {activeStep.detail}
                      </p>
                    </div>
                  </div>

                  {/* Step Navigation Controls */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10">
                    <button
                      onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                      disabled={activeStepIndex === 0}
                      className="px-3.5 py-1.5 rounded-full text-xs text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 cursor-pointer"
                    >
                      ← ขั้นตอนก่อนหน้า
                    </button>

                    <button
                      onClick={() =>
                        setActiveStepIndex(
                          Math.min(PREORDER_STEPS.length - 1, activeStepIndex + 1)
                        )
                      }
                      disabled={activeStepIndex === PREORDER_STEPS.length - 1}
                      className="btn-chrome light-sweep px-4 sm:px-5 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>ขั้นตอนถัดไป</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Only: Clean Vertical Timeline */}
        <div className="md:hidden space-y-4">
          {PREORDER_STEPS.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="card-glass rounded-2xl p-6 border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-display text-xs font-bold text-white">
                    {step.stepNumber}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                </div>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{step.eta}</span>
                </span>
              </div>

              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                {step.description}
              </p>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-zinc-400">
                {step.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
