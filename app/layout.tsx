import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "Speed Express Forwarding | Global Logistics & Freight Services",
  description: "Worldwide logistics solutions — Air freight, ocean freight, road transport, warehousing, and real-time tracking.",
  keywords: ["Speed Express Forwarding", "freight forwarding", "logistics", "package tracking", "air freight", "sea freight", "express delivery"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-[#2D3448] antialiased selection:bg-[#9D8870] selection:text-white">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
