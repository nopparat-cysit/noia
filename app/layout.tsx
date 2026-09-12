import type { Metadata, Viewport } from "next";
import { Anuphan, Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const anuphan = Anuphan({
  subsets: ["latin", "thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-anuphan",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "NOIRE — ศูนย์รวมเครื่องสำอางระดับลักชัวรี · ขายส่ง · พรีออเดอร์",
  description:
    "NOIRE Luxury Cosmetics Hub ศูนย์รวมเครื่องสำอางระดับพรีเมียมสำหรับการซื้อขาย บริการจำหน่ายแบบขายส่งและพรีออเดอร์อย่างเป็นระบบ ถูกต้องตามกฎหมาย 100% ตามมาตรฐาน อย.",
  keywords: [
    "NOIRE",
    "เครื่องสำอางลักชัวรี",
    "ขายส่งเครื่องสำอาง",
    "พรีออเดอร์เครื่องสำอาง",
    "อย. 100%",
    "LPI",
    "พ.ร.บ. เครื่องสำอาง",
  ],
  authors: [{ name: "NOIRE Luxury Cosmetics Hub" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${anuphan.variable} ${cinzel.variable} ${cormorant.variable} scroll-smooth dark`}
    >
      <body className="min-h-screen bg-[#050507] text-[#ededed] font-sans antialiased selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
