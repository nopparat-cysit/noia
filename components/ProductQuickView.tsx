"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Check, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
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
  const [quantity, setQuantity] = useState(product ? product.specs.moq : 12);
  const [selectedShade, setSelectedShade] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const renderArtwork = (id: string) => {
    switch (id) {
      case "luminous-silk-foundation":
        return <FoundationArtwork className="w-full h-72" />;
      case "luminous-silk-lipstick":
        return <LipstickArtwork className="w-full h-72" />;
      case "luminous-eyeshadow-palette":
        return <EyeshadowArtwork className="w-full h-72" />;
      case "luminous-silk-compact-powder":
        return <CushionArtwork className="w-full h-72" />;
      case "liquid-chrome-cell-serum":
        return <SerumArtwork className="w-full h-72" />;
      case "sculpting-chrome-brush-set":
        return <BrushArtwork className="w-full h-72" />;
      default:
        return <FoundationArtwork className="w-full h-72" />;
    }
  };

  const profitPerUnit = product.retailPrice - product.wholesalePrice;
  const marginPercentage = Math.round((profitPerUnit / product.retailPrice) * 100);
  const totalWholesale = product.wholesalePrice * quantity;
  const totalRetailValue = product.retailPrice * quantity;
  const totalProjectedProfit = totalRetailValue - totalWholesale;

  const handleAdd = () => {
    setAdded(true);
    onAddToCart(product, quantity);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Dialog Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0 }}
          className="relative z-10 w-full max-w-4xl bg-[#0b0c0f] border border-white/20 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[92vh] flex flex-col md:flex-row my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 border border-white/15 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Artwork Visual Stage */}
          <div className="md:w-1/2 bg-gradient-to-b from-white/[0.04] to-black/60 p-6 sm:p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-white/10 shrink-0">
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-radial-spotlight opacity-70" />

            <div className="relative z-10 w-full max-w-[200px] sm:max-w-[280px] drop-shadow-2xl">
              {renderArtwork(product.id)}
            </div>

            <div className="mt-2 sm:mt-4 flex items-center gap-2 sm:gap-3">
              <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wider bg-white/10 text-white border border-white/15">
                {product.status}
              </span>
              {product.badge && (
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wider bg-zinc-800 text-zinc-200 border border-white/10">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right: Specifications, B2B Pricing & Quantity */}
          <div className="md:w-1/2 p-5 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  หมวดหมู่: {product.categoryLabel}
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>อย. {product.specs.fdaNumber || "100% Verified"}</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide mb-3">
                {product.name}
              </h3>

              <p className="text-sm text-zinc-300 font-light leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Interactive Shade Selector */}
              {product.shades && product.shades.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-400">เลือกเฉดสี / โทนที่ต้องการ:</span>
                    <span className="text-xs font-mono text-zinc-300">
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
                        className={`w-7 h-7 rounded-full border border-black/50 transition-all cursor-pointer ${
                          selectedShade === idx
                            ? "ring-2 ring-white scale-110 shadow-lg"
                            : "opacity-70 hover:opacity-100 hover:scale-105"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* B2B Margin Comparison Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-black/40 border border-white/10 mb-6">
                <div>
                  <p className="text-xs text-zinc-400">ราคาปลีกแนะนำ</p>
                  <p className="text-xl font-semibold text-zinc-400 line-through">
                    ฿{product.retailPrice.toLocaleString()}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs text-zinc-300">ราคาส่ง B2B</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      +{marginPercentage}% มาร์จิ้น
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white font-display">
                    ฿{product.wholesalePrice.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Specifications List */}
              <div className="space-y-2 text-xs text-zinc-300 border-t border-white/10 pt-4 mb-6">
                {product.specs.volume && (
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-zinc-500">ปริมาณ / ขนาด:</span>
                    <span className="font-medium text-zinc-200">{product.specs.volume}</span>
                  </div>
                )}
                {product.specs.finish && (
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-zinc-500">ฟินิชผิว / สัมผัส:</span>
                    <span className="font-medium text-zinc-200">{product.specs.finish}</span>
                  </div>
                )}
                {product.specs.origin && (
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-zinc-500">แหล่งกำเนิดและการนำเข้า:</span>
                    <span className="font-medium text-zinc-200">{product.specs.origin}</span>
                  </div>
                )}
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">สั่งซื้อขั้นต่ำ (MOQ):</span>
                  <span className="font-medium text-emerald-400">{product.specs.moq} ชิ้น</span>
                </div>
              </div>

              {/* Quantity Selector & Live Calculation */}
              <div className="space-y-2 mb-6">
                <label className="text-xs text-zinc-400 block">ระบุจำนวนที่ต้องการสั่ง (ชิ้น):</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-xl bg-black/60 border border-white/15 px-3 py-1.5">
                    <button
                      onClick={() => setQuantity(Math.max(product.specs.moq, quantity - 6))}
                      className="p-1 hover:text-white text-zinc-400 transition-colors"
                      disabled={quantity <= product.specs.moq}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-12 text-center text-sm font-semibold text-white font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 6)}
                      className="p-1 hover:text-white text-zinc-400 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right flex-1">
                    <p className="text-[11px] text-zinc-500">มูลค่ารวมราคาส่ง</p>
                    <p className="text-lg font-bold text-white font-display">
                      ฿{totalWholesale.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-emerald-400">
                      กำไรคาดการณ์ ฿{totalProjectedProfit.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  added
                    ? "bg-emerald-500 text-black font-semibold shadow-lg shadow-emerald-500/20"
                    : "btn-chrome light-sweep"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>เพิ่มในรายการแล้ว</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>เพิ่มในรายการสั่งซื้อ / ขอใบเสนอราคา</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
