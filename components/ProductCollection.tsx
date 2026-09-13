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
  const [activeShades, setActiveShades] = useState<Record<string, number>>({});

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
    onAddToCart(product, product.specs.moq);
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const renderProductArtwork = (id: string) => {
    switch (id) {
      case "luminous-silk-foundation":
        return <FoundationArtwork className="w-full h-56 transition-transform duration-500 group-hover:scale-105" />;
      case "luminous-silk-lipstick":
        return <LipstickArtwork className="w-full h-56 transition-transform duration-500 group-hover:scale-105" />;
      case "luminous-eyeshadow-palette":
        return <EyeshadowArtwork className="w-full h-56 transition-transform duration-500 group-hover:scale-105" />;
      case "luminous-silk-compact-powder":
        return <CushionArtwork className="w-full h-56 transition-transform duration-500 group-hover:scale-105" />;
      case "liquid-chrome-cell-serum":
        return <SerumArtwork className="w-full h-56 transition-transform duration-500 group-hover:scale-105" />;
      case "sculpting-chrome-brush-set":
        return <BrushArtwork className="w-full h-56 transition-transform duration-500 group-hover:scale-105" />;
      default:
        return <FoundationArtwork className="w-full h-56 transition-transform duration-500 group-hover:scale-105" />;
    }
  };

  return (
    <section id="products" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050507]">
      {/* Background Ribbon */}
      <ChromeRibbonOrnament variant="horizontal" className="top-10 inset-x-0 h-64 opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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
        </div>

        {/* Category & Status Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Categories Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "text-black font-semibold bg-white shadow-chrome-glow"
                      : "text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Status Switcher (All / In Stock / Preorder) */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-zinc-500" />
            <div className="inline-flex rounded-full p-1 bg-black/60 border border-white/10 text-xs">
              {(["all", "พร้อมส่ง", "พรีออเดอร์"] as const).map((status) => {
                const isSelected = statusFilter === status;
                return (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white/15 text-white font-medium shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {status === "all" ? "ทั้งหมด" : status}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isAdded = addedItemIds[product.id];
              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => setQuickViewProduct(product)}
                  className="card-glass card-glass-hover rounded-3xl p-5 sm:p-6 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                >
                  {/* Top Tags Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                    <span
                      className={`text-[10px] tracking-wider px-2.5 py-0.5 rounded-full font-medium ${
                        product.status === "พร้อมส่ง"
                          ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                          : "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                      }`}
                    >
                      {product.status}
                    </span>

                    {product.badge && (
                      <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Product Artwork Container */}
                  <div className="relative w-full h-56 flex items-center justify-center my-2">
                    {/* Hover light highlight circle */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] rounded-2xl transition-colors duration-500 pointer-events-none" />
                    {renderProductArtwork(product.id)}
                  </div>

                  {/* Product Details */}
                  <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
                    <h3 className="text-base font-semibold text-white group-hover:text-zinc-100 transition-colors line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-light mb-2.5 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Interactive Shade Swatches */}
                    {product.shades && product.shades.length > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] text-zinc-500 font-mono">เฉดสี:</span>
                        <div className="flex items-center gap-1.5">
                          {product.shades.map((shade, sIdx) => {
                            const isShadeActive = (activeShades[product.id] || 0) === sIdx;
                            return (
                              <button
                                key={shade}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveShades((prev) => ({ ...prev, [product.id]: sIdx }));
                                }}
                                style={{ backgroundColor: shade }}
                                className={`w-3.5 h-3.5 rounded-full border border-black/40 transition-all cursor-pointer ${
                                  isShadeActive
                                    ? "ring-2 ring-white scale-125 shadow-sm"
                                    : "opacity-70 hover:opacity-100"
                                }`}
                                title={`เฉดสีที่ ${sIdx + 1}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Dual Pricing Grid from PDF */}
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-[11px] text-zinc-500 block">ราคาปลีก:</span>
                        <span className="text-xs text-zinc-400 line-through">
                          ฿{product.retailPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-zinc-400 block font-medium">ราคาส่ง:</span>
                        <span className="text-lg font-bold text-white font-display">
                          ฿{product.wholesalePrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Action Button: เพิ่มลงตะกร้า / Quick View */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`flex-1 py-2.5 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isAdded
                            ? "bg-emerald-500 text-black font-semibold"
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
                        className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white border border-white/10 transition-colors"
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
