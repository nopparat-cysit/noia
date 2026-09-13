"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton({ hasCartItems = false }: { hasCartItems?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setProgress(latest);
      setIsVisible(latest > 0.08); // Show after scrolling 8% of page
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          className={`fixed right-6 z-40 w-12 h-12 rounded-full card-glass border border-white/20 shadow-2xl flex items-center justify-center cursor-pointer group backdrop-blur-xl overflow-hidden transition-all duration-300 ${
            hasCartItems ? "bottom-24" : "bottom-6"
          }`}
          style={{
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(10, 10, 14, 0.9) 100%)",
          }}
          aria-label="Scroll back to top"
          title="เลื่อนกลับสู่ด้านบน"
        >
          {/* Circular SVG Scroll Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2.5"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="url(#progress-gradient)"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#a1a1aa" />
              </linearGradient>
            </defs>
          </svg>

          {/* Arrow Up Icon with glow on hover */}
          <ArrowUp className="w-4 h-4 text-zinc-300 group-hover:text-white transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
