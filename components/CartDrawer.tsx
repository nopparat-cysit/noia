"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Plus, Minus } from "lucide-react";
import { ProductItem } from "@/data/noireData";

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const totalWholesale = items.reduce(
    (sum, item) => sum + item.product.wholesalePrice * item.quantity,
    0
  );
  const totalRetail = items.reduce(
    (sum, item) => sum + item.product.retailPrice * item.quantity,
    0
  );
  const projectedProfit = totalRetail - totalWholesale;
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#09090c] border-l border-white/15 flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wide">
                      รายการขอใบเสนอราคา
                    </h3>
                    <p className="text-xs text-zinc-400">
                      {totalUnits} ชิ้น ในรายการ B2B
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                    <ShoppingBag className="w-12 h-12 stroke-[1] mb-3 text-zinc-600" />
                    <p className="text-sm font-medium text-zinc-400 mb-1">ยังไม่มีสินค้าในรายการ</p>
                    <p className="text-xs text-zinc-500 max-w-xs">
                      เลือกสินค้าจากคอลเลกชันเพื่อคำนวณราคาส่งและขอใบเสนอราคาอย่างเป็นทางการ
                    </p>
                  </div>
                ) : (
                  items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="p-4 rounded-2xl bg-black/50 border border-white/10 flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-mono">
                            {product.status}
                          </span>
                          <h4 className="text-sm font-semibold text-white">
                            {product.name}
                          </h4>
                          <p className="text-xs text-zinc-400 mt-0.5">
                            ราคาส่ง: ฿{product.wholesalePrice.toLocaleString()} / ชิ้น
                          </p>
                        </div>

                        <button
                          onClick={() => onRemoveItem(product.id)}
                          className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                          title="ลบรายการ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <div className="flex items-center rounded-lg bg-white/5 border border-white/10 px-2 py-1">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                product.id,
                                Math.max(product.specs.moq, quantity - 6)
                              )
                            }
                            className="text-zinc-400 hover:text-white p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-white">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity + 6)}
                            className="text-zinc-400 hover:text-white p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-white font-display">
                          ฿{(product.wholesalePrice * quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout Action */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/60 space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>มูลค่าขายปลีกประเมิน:</span>
                      <span>฿{totalRetail.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span>กำไรโดยประมาณ:</span>
                      <span>+฿{projectedProfit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10 font-display">
                      <span>ยอดราคาส่งสุทธิ:</span>
                      <span>฿{totalWholesale.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>ราคารวมเอกสารนำเข้าและภาษีถูกต้องตามกฎหมาย 100%</span>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onCheckout();
                    }}
                    className="btn-chrome light-sweep w-full py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-chrome-glow cursor-pointer"
                  >
                    <span>ส่งคำขอใบเสนอราคาอย่างเป็นทางการ</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
