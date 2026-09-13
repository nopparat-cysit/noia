"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] pointer-events-none bg-transparent"
    >
      {/* Background Track Subtle Shimmer */}
      <div className="absolute inset-0 bg-white/[0.03]" />

      {/* Liquid Chrome Animated Progress Line */}
      <motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="h-full w-full bg-gradient-to-r from-zinc-600 via-zinc-200 to-white relative shadow-[0_0_12px_rgba(255,255,255,0.7)]"
      >
        {/* Glowing comet head at leading edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white blur-[2px] opacity-80" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
      </motion.div>
    </div>
  );
}
