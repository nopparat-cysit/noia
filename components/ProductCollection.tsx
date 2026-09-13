"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, ShoppingCart, Check, Filter } from "lucide-react";
import { NOIRE_PRODUCTS, CATEGORIES, ProductItem } from "@/data/noireData";
import {
  FoundationArtwork,
  LipstickArtwork,
  EyeshadowArtwork,
  CushionArtwork,
  SerumArtwork,
  BrushArtwork,
} from "./visuals/ProductArtworks";
import ProductQuickView from "./ProductQuickView";
import ChromeRibbonOrnament from "./visuals/ChromeRibbonOrnament";

export default function ProductCollection({
  onAddToCart,
}: {
  onAddToCart: (product: ProductItem, quantity: number) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "พร้อมส่ง" | "พรีออเดอร์">("all");
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const filteredProducts = useMemo(() => {
    return NOIRE_PRODUCTS.filter((product) => {
      const matchCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchStatus =
        statusFilter === "all" || product.status === statusFilter;
      return matchCategory && matchStatus;
    });
  }, [selectedCategory, statusFilter]);

  const handleQuickAdd = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    onAddToCart(product, product.specs.moq || 1);
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const renderProductArtwork = (id: string) => {
    switch (id) {
      case "luminous-silk-foundation":
        return <FoundationArtwork className="w-full h-full object-contain drop-shadow-xl" />;
      case "luminous-silk-lipstick":
        return <LipstickArtwork className="w-full h-full object-contain drop-shadow-xl" />;
      case "luminous-eyeshadow-palette":
        return <EyeshadowArtwork className="w-full h-full object-contain drop-shadow-xl" />;
      case "luminous-silk-compact-powder":
        return <CushionArtwork className="w-full h-full object-contain drop-shadow-xl" />;
      case "liquid-chrome-cell-serum":
        return <SerumArtwork className="w-full h-full object-contain drop-shadow-xl" />;
      case "sculpting-chrome-brush-set":
        return <BrushArtwork className="w-full h-full object-contain drop-shadow-xl" />;
      default:
        return <FoundationArtwork className="w-full h-full object-contain drop-shadow-xl" />;
    }
  };

  return (
    <section id="products" className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      {/* Background Ribbon */}
      <ChromeRibbonOrnament variant="horizontal" className="top-10 inset-x-0 h-64 opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-400 mb-4 tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>Editorial Product Catalog</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            คอลเลกชันผลิตภัณฑ์ <span className="font-display tracking-[0.2em] text-chrome">NOIRE</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light">
            ผลิตภัณฑ์ความงามระดับลักชัวรีมาตรฐานสากล พร้อมโครงสร้างราคาส่ง B2B สำหรับพาร์ทเนอร์
          </p>
        </motion.div>

        {/* Mobile Category Horizontal Scroll Bar */}
        <div className="lg:hidden mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "text-black font-semibold bg-white shadow-chrome-glow"
                      : "text-zinc-400 hover:text-white bg-white/[0.04] border border-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Layout: Left Sidebar Categories + Right 2-Col Grid (Slide 3 & 5 Exact Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Glass Sidebar matching Slide 3 & 5 */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28">
            <div
              className="card-glass rounded-3xl p-6 border border-white/20 shadow-2xl backdrop-blur-xl flex flex-col gap-2"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(10, 10, 14, 0.85) 100%)",
              }}
            >
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest px-3 mb-2">
                หมวดหมู่สินค้า
              </div>

              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-medium tracking-wide transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-white text-black font-semibold shadow-chrome-glow"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                    )}
                  </button>
                );
              })}

              {/* Status Filter Sub-bar */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest px-3 mb-2 flex items-center gap-1.5">
                  <Filter className="w-3 h-3 text-zinc-400" />
                  <span>สถานะการสั่ง</span>
                </div>
                <div className="grid grid-cols-3 gap-1 p-1 bg-black/40 rounded-xl border border-white/10">
                  {(["all", "พร้อมส่ง", "พรีออเดอร์"] as const).map((status) => {
                    const isSelected = statusFilter === status;
                    return (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`py-1 text-[11px] rounded-lg transition-all text-center cursor-pointer ${
                          isSelected
                            ? "bg-white/20 text-white font-medium shadow-sm"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {status === "all" ? "ทั้งหมด" : status}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2-Column Product Cards Grid (Slide 3 & 5 Exact Layout) */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  const isAdded = addedItemIds[product.id];
                  return (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      onClick={() => setQuickViewProduct(product)}
                      className="group card-glass rounded-3xl p-5 border border-white/20 hover:border-white/45 shadow-2xl relative overflow-hidden transition-all duration-300 cursor-pointer flex flex-col sm:flex-row gap-5 items-center justify-between min-h-[220px]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(8, 8, 12, 0.9) 100%)",
                      }}
                    >
                      {/* Left: Product Artwork Container with Badge & Illuminated Pedestal */}
                      <div className="w-full sm:w-44 h-48 sm:h-44 rounded-2xl bg-gradient-to-b from-white/[0.05] via-black/40 to-black/80 border border-white/10 flex flex-col items-center justify-center relative shrink-0 overflow-hidden group-hover:border-white/30 transition-all shadow-inner">
                        {/* Ambient Spotlight */}
                        <div className="absolute inset-0 bg-radial-spotlight opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        {/* Status Badge in top-left */}
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span
                            className={`text-[10px] tracking-wider px-2.5 py-0.5 rounded-full font-medium ${
                              product.status === "พร้อมส่ง"
                                ? "bg-white text-black font-semibold shadow-sm"
                                : "bg-cyan-500/20 text-cyan-200 border border-cyan-500/30"
                            }`}
                          >
                            {product.status === "พร้อมส่ง" ? "พร้อมสั่ง" : product.status}
                          </span>
                        </div>

                        {/* Product Artwork Model with Pedestal Reflection */}
                        <div className="relative z-10 w-32 h-34 flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-500 pt-2">
                          <div className="w-full h-28 flex items-center justify-center drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)]">
                            {renderProductArtwork(product.id)}
                          </div>
                          {/* Illuminated Chrome Pedestal (Stops Model from Sinking) */}
                          <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1px] mt-0.5" />
                        </div>
                      </div>

                      {/* Right: Product Details & Dual Price */}
                      <div className="flex-1 w-full flex flex-col justify-between h-full py-1">
                        <div>
                          {/* Title & Badge */}
                          <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide group-hover:text-zinc-100 transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mt-0.5 block">
                            {product.badge || "NOIRE EXCLUSIVE"}
                          </span>

                          <p className="text-xs text-zinc-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Dual Price: ราคาปลีก / ราคาส่ง matching Slide 3 & 5 */}
                        <div className="mt-4 pt-3 border-t border-white/10 space-y-1">
                          <div className="flex items-center justify-between text-xs text-zinc-400">
                            <span>ราคาปลีก:</span>
                            <span className="font-mono">
                              ฿{product.retailPrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm font-semibold">
                            <span className="text-zinc-300">ราคาส่ง:</span>
                            <span className="text-base sm:text-lg text-white font-display font-bold">
                              ฿{product.wholesalePrice.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Action Pill: เพิ่มลงตะกร้า */}
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={(e) => handleQuickAdd(e, product)}
                            className={`flex-1 py-2 px-3 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              isAdded
                                ? "bg-emerald-500 text-black font-semibold shadow-sm"
                                : "btn-chrome light-sweep"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>เพิ่มแล้ว</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>เพิ่มลงตะกร้า</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuickViewProduct(product);
                            }}
                            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white border border-white/10 transition-colors shrink-0"
                            title="ดูรายละเอียดสินค้า"
                            aria-label="ดูรายละเอียดสินค้า"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={onAddToCart}
        />
      </div>
    </section>
  );
}
