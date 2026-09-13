"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Check, Plus, Minus, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import { ProductItem } from "@/data/noireData";
import {
  FoundationArtwork,
  LipstickArtwork,
  EyeshadowArtwork,
  CushionArtwork,
  SerumArtwork,
  BrushArtwork,
} from "./visuals/ProductArtworks";

interface QuickViewProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem, quantity: number) => void;
}

export default function ProductQuickView({ product, onClose, onAddToCart }: QuickViewProps) {
  const [mounted, setMounted] = useState(false);
  const [quantity, setQuantity] = useState(12);
  const [selectedShade, setSelectedShade] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (product) {
      setQuantity(product.specs.moq || 12);
      setSelectedShade(0);
      setAdded(false);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  if (!mounted) return null;

  const renderArtwork = (id: string) => {
    switch (id) {
      case "luminous-silk-foundation":
        return <FoundationArtwork className="w-full h-48 sm:h-60 md:h-72 object-contain" />;
      case "luminous-silk-lipstick":
        return <LipstickArtwork className="w-full h-48 sm:h-60 md:h-72 object-contain" />;
      case "luminous-eyeshadow-palette":
        return <EyeshadowArtwork className="w-full h-48 sm:h-60 md:h-72 object-contain" />;
      case "luminous-silk-compact-powder":
        return <CushionArtwork className="w-full h-48 sm:h-60 md:h-72 object-contain" />;
      case "liquid-chrome-cell-serum":
        return <SerumArtwork className="w-full h-48 sm:h-60 md:h-72 object-contain" />;
      case "sculpting-chrome-brush-set":
        return <BrushArtwork className="w-full h-48 sm:h-60 md:h-72 object-contain" />;
      default:
        return <FoundationArtwork className="w-full h-48 sm:h-60 md:h-72 object-contain" />;
    }
  };

  const modalContent = (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          {/* Backdrop with dark blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-all"
          />

          {/* Dialog centering wrapper */}
          <div className="flex min-h-full items-center justify-center p-3 sm:p-6 text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 25 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0 }}
              className="relative z-10 w-full max-w-4xl bg-[#090a0d] border border-white/25 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.98)] max-h-[92vh] flex flex-col md:flex-row my-auto"
              style={{
                background: "linear-gradient(180deg, #111218 0%, #060608 100%)",
              }}
            >
              {/* Top Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg backdrop-blur-md"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left: Product Artwork Visual Stage with Illuminated Pedestal */}
              <div className="w-full md:w-1/2 bg-gradient-to-b from-white/[0.08] via-zinc-900/30 to-black/90 p-5 sm:p-8 md:p-10 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-white/10 shrink-0 overflow-hidden">
                {/* Radial spotlight behind model */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0%,transparent_70%)] pointer-events-none" />

                {/* Ambient Circular Glow Ring */}
                <div className="absolute w-56 sm:w-64 h-56 sm:h-64 rounded-full bg-white/[0.06] blur-2xl pointer-events-none" />

                {/* Main 3D Artwork / Visual Model */}
                <div className="relative z-10 w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] flex flex-col items-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
                  {renderArtwork(product.id)}

                  {/* Illuminated Metallic Chrome Pedestal (Solves 'Model จม') */}
                  <div className="w-44 sm:w-56 h-3 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[1px] mt-1 shadow-[0_0_25px_rgba(255,255,255,0.5)]" />
                  <div className="w-32 sm:w-44 h-1 rounded-full bg-white/90 blur-[0.5px] -mt-1.5" />
                </div>

                {/* Badges Under Stage */}
                <div className="mt-4 sm:mt-6 flex items-center gap-2 sm:gap-3 relative z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider bg-white text-black shadow-chrome-glow">
                    {product.status === "พร้อมส่ง" ? "พร้อมสั่งทันที" : product.status}
                  </span>
                  {product.badge && (
                    <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wider bg-zinc-800/80 text-zinc-300 border border-white/10 font-mono">
                      {product.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Specifications, B2B Pricing, Quantity & CTA */}
              <div className="w-full md:w-1/2 p-5 sm:p-7 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[55vh] md:max-h-[92vh]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-400">
                      หมวดหมู่: <span className="font-mono text-zinc-300 font-medium">{product.categoryLabel}</span>
                    </span>
                    <span className="text-xs text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>อย. ถูกต้อง 100%</span>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide mb-2 font-display">
                    {product.name}
                  </h3>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Shade Selector if available */}
                {product.shades && product.shades.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-zinc-300">เลือกเฉดสี / โทนที่ต้องการ:</span>
                      <span className="text-xs font-mono text-zinc-400">
                        เฉดที่ {selectedShade + 1} จาก {product.shades.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.shades.map((shade, idx) => (
                        <button
                          key={shade}
                          type="button"
                          onClick={() => setSelectedShade(idx)}
                          style={{ backgroundColor: shade }}
                          className={`w-7 h-7 rounded-full border border-black/60 transition-all cursor-pointer ${
                            selectedShade === idx
                              ? "ring-2 ring-white scale-110 shadow-lg"
                              : "opacity-70 hover:opacity-100 hover:scale-105"
                          }`}
                          title={`เฉดที่ ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Dual Pricing Grid */}
                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-black/50 border border-white/10 mb-5">
                  <div>
                    <p className="text-xs text-zinc-400 mb-0.5">ราคาปลีกแนะนำ</p>
                    <p className="text-lg font-semibold text-zinc-400 line-through">
                      ฿{product.retailPrice.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <p className="text-xs text-zinc-200 font-medium">ราคาส่ง B2B</p>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        ราคาส่งตรง
                      </span>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-white font-display">
                      ฿{product.wholesalePrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Specs List */}
                <div className="space-y-1.5 text-xs text-zinc-300 border-t border-white/10 pt-3.5 mb-5">
                  {product.specs.volume && (
                    <div className="flex justify-between py-0.5">
                      <span className="text-zinc-400">ปริมาณ / ขนาด:</span>
                      <span className="font-medium text-white">{product.specs.volume}</span>
                    </div>
                  )}
                  {product.specs.finish && (
                    <div className="flex justify-between py-0.5">
                      <span className="text-zinc-400">ฟินิชผิว / สัมผัส:</span>
                      <span className="font-medium text-white">{product.specs.finish}</span>
                    </div>
                  )}
                  {product.specs.origin && (
                    <div className="flex justify-between py-0.5">
                      <span className="text-zinc-400">แหล่งกำเนิดและการนำเข้า:</span>
                      <span className="font-medium text-white">{product.specs.origin}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-0.5">
                    <span className="text-zinc-400">สั่งซื้อขั้นต่ำ (MOQ):</span>
                    <span className="font-medium text-emerald-400">{product.specs.moq || 12} ชิ้น</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-2 mb-6">
                  <label className="text-xs text-zinc-300 block">ระบุจำนวนที่ต้องการสั่ง (ชิ้น):</label>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center rounded-2xl bg-black/70 border border-white/20 px-3 py-1.5">
                      <button
                        onClick={() => setQuantity(Math.max(product.specs.moq || 1, quantity - 6))}
                        className="p-1 hover:text-white text-zinc-400 transition-colors cursor-pointer"
                        disabled={quantity <= (product.specs.moq || 1)}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-12 text-center text-sm font-semibold text-white font-mono">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 6)}
                        className="p-1 hover:text-white text-zinc-400 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] text-zinc-400">ยอดรวมราคาส่ง</p>
                      <p className="text-xl font-bold text-white font-display">
                        ฿{(product.wholesalePrice * quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 sticky bottom-0 bg-[#060608]/90 backdrop-blur-md pb-1">
                <button
                  onClick={() => {
                    setAdded(true);
                    onAddToCart(product, quantity);
                    setTimeout(() => {
                      setAdded(false);
                      onClose();
                    }, 1000);
                  }}
                  className={`btn-chrome light-sweep w-full py-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-chrome-glow cursor-pointer ${
                    added ? "bg-emerald-500 text-black shadow-emerald-500/30" : ""
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>เพิ่มในรายการขอใบเสนอราคาแล้ว!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>เพิ่มลงตะกร้า / รายการขอใบเสนอราคา</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
