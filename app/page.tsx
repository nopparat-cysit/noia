"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProductCollection from "@/components/ProductCollection";
import WholesaleSection from "@/components/WholesaleSection";
import PromotionCalculator from "@/components/PromotionCalculator";
import PreorderSection from "@/components/PreorderSection";
import ComplianceSection from "@/components/ComplianceSection";
import LogisticsArchitecture from "@/components/LogisticsArchitecture";
import StandardsComparison from "@/components/StandardsComparison";
import SocialContactSection from "@/components/SocialContactSection";
import ContactPartner from "@/components/ContactPartner";
import Footer from "@/components/Footer";
import PartnerDirectoryModal from "@/components/PartnerDirectoryModal";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import LiquidChromeBackground from "@/components/visuals/LiquidChromeBackground";
import { ProductItem } from "@/data/noireData";
import { ShoppingBag } from "lucide-react";

export default function HomePage() {
  const [isPartnerDirectoryOpen, setIsPartnerDirectoryOpen] = useState(false);
  const [partnerDirectoryTab, setPartnerDirectoryTab] = useState<"view" | "edit">("view");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleOpenPartnerDirectory = (tab: "view" | "edit" = "view") => {
    setPartnerDirectoryTab(tab);
    setIsPartnerDirectoryOpen(true);
  };

  const handleAddToCart = (product: ProductItem, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="relative min-h-screen bg-[#050507] text-[#ededed] overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Dynamic Ambient Liquid Chrome Canvas */}
      <LiquidChromeBackground />

      {/* Sticky Luxury Navbar */}
      <Navbar
        onOpenPartnerDirectoryModal={() => handleOpenPartnerDirectory("view")}
      />

      {/* 01 — HERO (Slide 1) */}
      <Hero />

      {/* 02 — ABOUT NOIRE (Slide 2) */}
      <AboutSection />

      {/* 03 — PRODUCT COLLECTION (Slide 3 & 5) */}
      <ProductCollection onAddToCart={handleAddToCart} />

      {/* 04 — WHOLESALE / BUSINESS (Slide 4) */}
      <WholesaleSection />

      {/* B2B PROMOTION & PROFIT CALCULATOR */}
      <PromotionCalculator />

      {/* 05 — PREORDER PROCESS (Slide 6) */}
      <PreorderSection />

      {/* 06 — OFFICIAL SOCIAL CHANNELS (Slide 7: ช่องทางติดต่อ*) */}
      <SocialContactSection />

      {/* 07 — NOIRE STANDARD (Slide 8: มาตรฐาน NOIRE*) */}
      <StandardsComparison />

      {/* 08 — TRUST / COMPLIANCE & LOGISTICS */}
      <ComplianceSection />
      <LogisticsArchitecture />

      {/* 09 — CONTACT / PARTNER DIRECTORY (Slide 9: พาร์ทเนอร์ธุรกิจ) */}
      <ContactPartner
        onOpenPartnerDirectoryModal={(tab) => handleOpenPartnerDirectory(tab || "view")}
      />

      {/* FOOTER */}
      <Footer />

      {/* Floating Cart / Quotation Trigger Button */}
      {cartItems.length > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 btn-chrome light-sweep px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 cursor-pointer animate-bounce sm:animate-none"
          aria-label="Open quotation list"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white/30">
              {cartItems.length}
            </span>
          </div>
          <span className="text-xs font-semibold hidden sm:inline">
            รายการขอใบเสนอราคา ({totalCartCount} ชิ้น)
          </span>
        </button>
      )}

      {/* Quotation Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          if (typeof window !== "undefined") {
            window.open("https://line.me/ti/p/lvo2Esqts9", "_blank");
          }
        }}
      />

      {/* B2B Partner Directory Modal (View Only) */}
      <PartnerDirectoryModal
        isOpen={isPartnerDirectoryOpen}
        onClose={() => setIsPartnerDirectoryOpen(false)}
        initialTab={partnerDirectoryTab}
      />
    </main>
  );
}
